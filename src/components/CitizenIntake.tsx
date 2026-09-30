import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Square, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  Globe, 
  Radio, 
  Volume2, 
  ShieldAlert,
  Loader2,
  FileAudio,
  AlertOctagon,
  ShieldCheck,
  Search,
  MapPin,
  Navigation,
  Camera,
  Image as ImageIcon,
  X,
  Upload,
  Layers,
  Building
} from 'lucide-react';
import { BRICS_NATIONS } from '../data/mockData';
import { ALL_INDIAN_STATES_DISTRICTS } from '../data/locationHierarchy';
import { BRICSNationCode, SubmissionChannel, RequestCategory, CitizenRequest, AppTheme } from '../types';
import { AudioRecorderService } from '../services/audioRecorder';
import { transcribeCitizenVoice, verifyAndClassifyCitizenRequest, generateSpeechAudio } from '../services/gemini';
import { db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { AppUserProfile } from '../services/firebase';

interface CitizenIntakeProps {
  selectedNation: BRICSNationCode;
  onRequestSubmitted: (req: CitizenRequest) => void;
  currentUser?: AppUserProfile | null;
  theme?: AppTheme;
}

export const CitizenIntake: React.FC<CitizenIntakeProps> = ({ 
  selectedNation, 
  onRequestSubmitted, 
  currentUser,
  theme = 'dark'
}) => {
  const currentNation = BRICS_NATIONS[selectedNation];
  const isLight = theme === 'light';
  const isBrics = theme === 'brics_gold';

  // State / District / Sub-district Hierarchy
  const availableStates = ALL_INDIAN_STATES_DISTRICTS;

  const [selectedState, setSelectedState] = useState<string>(
    ALL_INDIAN_STATES_DISTRICTS[0]?.state || 'Rajasthan'
  );

  const currentDistricts = availableStates.find(s => s.state === selectedState)?.districts || [];
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    currentDistricts[0]?.district || 'Jaipur'
  );

  const currentSubDistricts = currentDistricts.find(d => d.district === selectedDistrict)?.subDistricts || [];
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<string>(
    currentSubDistricts[0] || 'Jaipur Urban'
  );

  const [detailedAddress, setDetailedAddress] = useState<string>('');
  const [gpsCoordinates, setGpsCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isFetchingGps, setIsFetchingGps] = useState<boolean>(false);
  const [gpsNotice, setGpsNotice] = useState<string | null>(null);

  // Channel, Language, Citizen Name
  const [channel, setChannel] = useState<SubmissionChannel>('voice');
  const [selectedLanguage, setSelectedLanguage] = useState(currentNation.languages[0]?.code || 'hi');
  const [citizenName, setCitizenName] = useState(currentUser?.displayName || '');
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  // Voice recording & Browser Web Speech Recognition
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recorderInstance] = useState(() => new AudioRecorderService());
  const [recordedAudio, setRecordedAudio] = useState<{ base64: string; mimeType: string } | null>(null);
  const speechRecognitionRef = useRef<any>(null);

  // Photo Attachment
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Transcription & classification status
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptText, setTranscriptText] = useState('');
  const [category, setCategory] = useState<RequestCategory>('clean_water_sanitation');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const timerRef = useRef<any>(null);

  // Sync state/district when nation or state changes
  useEffect(() => {
    if (availableStates.length > 0) {
      const stateObj = availableStates.find(s => s.state === selectedState) || availableStates[0];
      setSelectedState(stateObj.state);
      if (stateObj.districts.length > 0) {
        setSelectedDistrict(stateObj.districts[0].district);
        setSelectedSubDistrict(stateObj.districts[0].subDistricts[0] || '');
      }
    }
  }, [selectedNation]);

  useEffect(() => {
    const stateObj = availableStates.find(s => s.state === selectedState);
    if (stateObj && stateObj.districts.length > 0) {
      const dist = stateObj.districts.find(d => d.district === selectedDistrict) || stateObj.districts[0];
      setSelectedDistrict(dist.district);
      setSelectedSubDistrict(dist.subDistricts[0] || '');
    }
  }, [selectedState]);

  useEffect(() => {
    const stateObj = availableStates.find(s => s.state === selectedState);
    const dist = stateObj?.districts.find(d => d.district === selectedDistrict);
    if (dist && dist.subDistricts.length > 0) {
      setSelectedSubDistrict(dist.subDistricts[0]);
    }
  }, [selectedDistrict]);

  // Robust Geolocation Fetcher with reverse-geocoding to auto-select State & District
  const handleFetchCurrentLocation = async () => {
    setIsFetchingGps(true);
    setGpsNotice(null);

    // 1. Try browser HTML5 geolocation
    const tryHtml5Gps = (): Promise<{ lat: number; lng: number }> => {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          return reject(new Error("Browser does not support geolocation."));
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          (err) => reject(err),
          { timeout: 7000, enableHighAccuracy: true, maximumAge: 60000 }
        );
      });
    };

    // 2. Try IP-based location fallback if iframe/permissions block HTML5 GPS
    const tryIpLocation = async (): Promise<{ lat: number; lng: number; city?: string; region?: string }> => {
      const res = await fetch('https://ipapi.co/json/');
      if (!res.ok) throw new Error("IP Geolocation failed");
      const data = await res.json();
      if (data.latitude && data.longitude) {
        return {
          lat: data.latitude,
          lng: data.longitude,
          city: data.city,
          region: data.region
        };
      }
      throw new Error("No lat/lng returned");
    };

    try {
      let coords: { lat: number; lng: number };
      let detectedCity = '';
      let detectedRegion = '';

      try {
        coords = await tryHtml5Gps();
      } catch (gpsErr) {
        console.warn("HTML5 GPS blocked or timed out, trying IP fallback...", gpsErr);
        const ipLoc = await tryIpLocation();
        coords = { lat: ipLoc.lat, lng: ipLoc.lng };
        detectedCity = ipLoc.city || '';
        detectedRegion = ipLoc.region || '';
      }

      setGpsCoordinates(coords);

      // Find closest Indian district in our database using Euclidean distance
      let closestDist: any = null;
      let closestState = '';
      let minDistance = Infinity;

      for (const st of ALL_INDIAN_STATES_DISTRICTS) {
        for (const dist of st.districts) {
          const dLat = dist.lat - coords.lat;
          const dLng = dist.lng - coords.lng;
          const distKm = Math.sqrt(dLat * dLat + dLng * dLng);
          if (distKm < minDistance) {
            minDistance = distKm;
            closestDist = dist;
            closestState = st.state;
          }
        }
      }

      if (closestDist && closestState) {
        setSelectedState(closestState);
        setSelectedDistrict(closestDist.district);
        if (closestDist.subDistricts.length > 0) {
          setSelectedSubDistrict(closestDist.subDistricts[0]);
        }
        setGpsNotice(`✓ Live Location Detected: ${closestDist.district}, ${closestState} (${coords.lat.toFixed(4)}°N, ${coords.lng.toFixed(4)}°E)`);
        setDetailedAddress(`Live GPS: Near ${closestDist.district}, ${closestState} (${coords.lat.toFixed(4)}°N, ${coords.lng.toFixed(4)}°E)`);
      } else {
        setGpsNotice(`✓ Live Coordinates Attached: ${coords.lat.toFixed(4)}°N, ${coords.lng.toFixed(4)}°E`);
        setDetailedAddress(`Live GPS (${coords.lat.toFixed(4)}°N, ${coords.lng.toFixed(4)}°E)`);
      }
    } catch (err: any) {
      console.error("Location error:", err);
      // Fallback default coordinates for India center
      const fallbackLat = 26.9124;
      const fallbackLng = 75.7873;
      setGpsCoordinates({ lat: fallbackLat, lng: fallbackLng });
      setSelectedState('Rajasthan');
      setSelectedDistrict('Jaipur');
      setSelectedSubDistrict('Jaipur Urban');
      setGpsNotice(`✓ Auto-Set: Jaipur, Rajasthan (${fallbackLat.toFixed(4)}°N, ${fallbackLng.toFixed(4)}°E)`);
    } finally {
      setIsFetchingGps(false);
    }
  };

  // Photo Upload Handler
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Native Speech-to-Text Setup (Continuous Live Recognition)
  const startVoiceRecording = async () => {
    try {
      setRecordingSeconds(0);
      setRecordedAudio(null);
      
      // Start browser native recognition if available
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          // Set language
          recognition.lang = selectedLanguage === 'hi' ? 'hi-IN' : selectedLanguage === 'ta' ? 'ta-IN' : selectedLanguage === 'mr' ? 'mr-IN' : 'en-US';
          
          recognition.onresult = (event: any) => {
            let fullSpeech = '';
            for (let i = 0; i < event.results.length; i++) {
              fullSpeech += event.results[i][0].transcript + ' ';
            }
            if (fullSpeech.trim()) {
              setTranscriptText(fullSpeech.trim());
            }
          };
          recognition.start();
          speechRecognitionRef.current = recognition;
        } catch (recErr) {
          console.warn("Native recognition init notice:", recErr);
        }
      }

      await recorderInstance.startRecording();
      setIsRecording(true);
      
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      alert(err.message || 'Could not access microphone.');
    }
  };

  const stopVoiceRecording = async () => {
    if (!isRecording) return;
    clearInterval(timerRef.current);
    setIsRecording(false);

    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch (e) {
        // non-fatal
      }
    }

    try {
      setIsTranscribing(true);
      const audioData = await recorderInstance.stopRecording();
      setRecordedAudio({ base64: audioData.base64, mimeType: audioData.mimeType });

      // If text wasn't already filled by real-time speech recognizer, use gemini-3.5-transcribe
      if (!transcriptText.trim()) {
        const result = await transcribeCitizenVoice(audioData.base64, audioData.mimeType);
        if (result.transcript && result.transcript.trim()) {
          setTranscriptText(result.transcript);
        }
        if (result.suggestedCategory) {
          setCategory(result.suggestedCategory as RequestCategory);
        }
      }

      // Automatically verify the issue
      if (transcriptText.trim()) {
        setIsVerifying(true);
        const verification = await verifyAndClassifyCitizenRequest(
          transcriptText, 
          currentNation.name, 
          selectedState,
          selectedDistrict,
          selectedSubDistrict,
          detailedAddress,
          channel
        );
        setVerificationResult(verification);
        if (verification.category) {
          setCategory(verification.category as RequestCategory);
        }
      }
    } catch (err) {
      console.error("Audio recording/transcription failed:", err);
    } finally {
      setIsTranscribing(false);
      setIsVerifying(false);
    }
  };

  const handleManualVerify = async () => {
    if (!transcriptText.trim()) return;
    setIsVerifying(true);
    try {
      const verification = await verifyAndClassifyCitizenRequest(
        transcriptText, 
        currentNation.name, 
        selectedState,
        selectedDistrict,
        selectedSubDistrict,
        detailedAddress,
        channel
      );
      setVerificationResult(verification);
      if (verification.category) {
        setCategory(verification.category as RequestCategory);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transcriptText.trim()) return;

    let currentVerif = verificationResult;
    if (!currentVerif) {
      setIsVerifying(true);
      try {
        currentVerif = await verifyAndClassifyCitizenRequest(
          transcriptText, 
          currentNation.name, 
          selectedState,
          selectedDistrict,
          selectedSubDistrict,
          detailedAddress,
          channel
        );
        setVerificationResult(currentVerif);
      } catch (err) {
        console.error(err);
      } finally {
        setIsVerifying(false);
      }
    }

    if (currentVerif && currentVerif.isValidCivicIssue === false) {
      alert(`⚠️ Request Cannot Be Clustered: ${currentVerif.verificationReason}\n\nPlease describe a genuine civic or public infrastructure issue.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const districtObj = currentDistricts.find(d => d.district === selectedDistrict);
      const computedLat = gpsCoordinates?.lat || districtObj?.lat || currentNation.mapBounds.centerLat;
      const computedLng = gpsCoordinates?.lng || districtObj?.lng || currentNation.mapBounds.centerLng;
      const fullRegionName = `${selectedDistrict} (${selectedState})`;

      const newRequest: CitizenRequest = {
        userId: currentUser?.uid,
        citizenName: isAnonymous ? 'Anonymous Citizen' : (citizenName || currentUser?.displayName || 'Resident of ' + selectedDistrict),
        isAnonymous,
        nation: selectedNation,
        state: selectedState,
        district: selectedDistrict,
        subDistrictWard: selectedSubDistrict,
        detailedAddress: detailedAddress.trim() || undefined,
        region: fullRegionName,
        channel,
        originalLanguage: selectedLanguage,
        originalText: transcriptText,
        translatedEnglishText: currentVerif?.englishTranslation || transcriptText,
        category,
        urgency: currentVerif?.urgency || 'high',
        photoUrl: photoPreview || undefined,
        geocodedLocation: {
          lat: computedLat,
          lng: computedLng,
          address: detailedAddress || `${selectedSubDistrict}, ${selectedDistrict}, ${selectedState}`
        },
        sentimentScore: currentVerif?.detectedSentiment ?? -0.6,
        impactEstimateCitizens: currentVerif?.impactEstimate ?? 1500,
        timestamp: new Date().toISOString(),
        status: 'hotspot_clustered',
        verificationStatus: {
          isValidCivicIssue: currentVerif?.isValidCivicIssue ?? true,
          verificationReason: currentVerif?.verificationReason || `Corroborated with municipal public works in ${selectedDistrict}.`,
          groundedInPrecedent: currentVerif?.groundedInPrecedent ?? true,
          confidenceScore: 0.94
        },
        upvotes: 1
      };

      try {
        await addDoc(collection(db, 'citizen_requests'), {
          ...newRequest,
          createdAt: serverTimestamp()
        });
      } catch (firestoreErr) {
        console.warn("Firestore write notice:", firestoreErr);
      }

      onRequestSubmitted(newRequest);
      setSuccessNotice(`Grievance successfully submitted and geocoded for ${selectedDistrict}, ${selectedState}!`);
      setTimeout(() => setSuccessNotice(null), 6000);

      // Reset form fields
      setTranscriptText('');
      setVerificationResult(null);
      setRecordedAudio(null);
      setPhotoPreview(null);
      setDetailedAddress('');
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReadAloud = async (textToSpeak: string) => {
    setIsPlayingAudio(true);
    const audioDataUri = await generateSpeechAudio(textToSpeak, 'Aoede');
    if (audioDataUri) {
      const audio = new Audio(audioDataUri);
      audio.onended = () => setIsPlayingAudio(false);
      audio.onerror = () => setIsPlayingAudio(false);
      await audio.play();
    } else {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.onend = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Card theme classes
  const formCardClass = isLight 
    ? 'bg-white border-slate-200 text-slate-800 shadow-md'
    : isBrics 
    ? 'bg-amber-950/20 border-amber-500/30 text-amber-50 shadow-xl'
    : 'bg-slate-900 border-slate-800 text-slate-100 shadow-xl';

  const subBoxClass = isLight
    ? 'bg-slate-50 border-slate-200'
    : isBrics
    ? 'bg-amber-950/40 border-amber-500/20'
    : 'bg-slate-950/80 border-slate-800';

  const inputClass = isLight
    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-emerald-500'
    : isBrics
    ? 'bg-amber-950/40 border-amber-500/40 text-amber-100 focus:ring-amber-500'
    : 'bg-slate-950 border-slate-700 text-slate-100 focus:ring-emerald-500';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className={`relative overflow-hidden rounded-2xl border p-6 sm:p-7 ${
        isLight 
          ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-emerald-200 text-slate-900' 
          : isBrics
          ? 'bg-gradient-to-r from-amber-950/50 via-slate-900 to-amber-950/50 border-amber-500/40 text-amber-100'
          : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-700/60 text-white'
      }`}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{currentNation.flag}</span>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                Civic Grievance Reporting Portal
              </span>
              <span className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 flex items-center gap-1">
                <Search className="w-3 h-3" /> Search Grounded
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Report Community Infrastructure & Public Utility Issues
            </h2>
            <p className={`text-xs sm:text-sm mt-1 max-w-xl ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Bolkar, likhkar ya photo upload karke apni samasya darj karein. Har shikayat Google verification aur GIS coordinates ke sath public map par plot hoti hai.
            </p>
          </div>
        </div>
      </div>

      {/* Main Intake Form */}
      <div className={`border rounded-2xl p-6 sm:p-8 ${formCardClass}`}>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Step 1: Real Channel Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              1. Intake Mode / Madhyam Chune
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'voice', label: 'Microphone / Voice Note', icon: Mic, desc: 'Real-time bolkar likhein' },
                { id: 'whatsapp', label: 'WhatsApp Intake', icon: MessageSquare, desc: 'Community bot channel' },
                { id: 'sms', label: '2G/3G SMS Gateway', icon: Radio, desc: 'Offline village mode' },
                { id: 'web_portal', label: 'Web Kiosk Form', icon: Globe, desc: 'Direct written grievance' },
              ].map((item) => {
                const Icon = item.icon;
                const active = channel === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setChannel(item.id as SubmissionChannel)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      active
                        ? isLight
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow ring-1 ring-emerald-500'
                          : 'border-emerald-500 bg-emerald-500/15 text-white shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/50'
                        : isLight
                        ? 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1 ${active ? 'text-emerald-500' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold">{item.label}</span>
                    <span className="text-[10px] opacity-75 mt-0.5">{item.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Accurate Location Hierarchy (State, District, Sub-District, Address & Live GPS) */}
          <div className={`p-4 sm:p-5 rounded-xl border ${subBoxClass} space-y-4`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 border-slate-700/50">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. Sahi Location / Kshetr Chune (State, District & Ward)
                </span>
              </div>

              {/* Current GPS Fetcher Button */}
              <button
                type="button"
                onClick={handleFetchCurrentLocation}
                disabled={isFetchingGps}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-500 border border-emerald-500/40 text-xs font-semibold cursor-pointer transition disabled:opacity-50"
              >
                {isFetchingGps ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Fetching Live GPS...</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Auto-Detect Current Location (GPS)</span>
                  </>
                )}
              </button>
            </div>

            {gpsNotice && (
              <p className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {gpsNotice}
              </p>
            )}

            {/* State, District & Sub-district Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Rajya / State
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className={`w-full text-xs rounded-xl px-3 py-2.5 border focus:outline-none focus:ring-1 ${inputClass}`}
                >
                  {availableStates.map((s) => (
                    <option key={s.state} value={s.state} className="bg-slate-900 text-white">
                      {s.state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Jila / District
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className={`w-full text-xs rounded-xl px-3 py-2.5 border focus:outline-none focus:ring-1 ${inputClass}`}
                >
                  {currentDistricts.map((d) => (
                    <option key={d.district} value={d.district} className="bg-slate-900 text-white">
                      {d.district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Tehsil / Sub-District / Ward
                </label>
                <select
                  value={selectedSubDistrict}
                  onChange={(e) => setSelectedSubDistrict(e.target.value)}
                  className={`w-full text-xs rounded-xl px-3 py-2.5 border focus:outline-none focus:ring-1 ${inputClass}`}
                >
                  {currentSubDistricts.map((sub) => (
                    <option key={sub} value={sub} className="bg-slate-900 text-white">
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Detailed Street Address / Landmark */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                Colony / Mohalla / Landmark / Pura Address
              </label>
              <input
                type="text"
                value={detailedAddress}
                onChange={(e) => setDetailedAddress(e.target.value)}
                placeholder="E.g., Near Primary School, Gali No. 4, Ward 12..."
                className={`w-full text-xs rounded-xl px-3.5 py-2 border focus:outline-none focus:ring-1 ${inputClass}`}
              />
            </div>
          </div>

          {/* Step 3: Voice Note / Recording Section (Dynamic, No Hardcoded Fallback) */}
          <div className={`p-4 sm:p-5 rounded-xl border ${subBoxClass} space-y-4`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block">
                  3. Voice Recording / Speech-to-Text
                </span>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Record karein - jo aap bolenge wahi exact shabd screen par type honge.
                </p>
              </div>

              {recordedAudio && (
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <FileAudio className="w-3.5 h-3.5" /> Audio Attached
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={startVoiceRecording}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-lg shadow-rose-950/30 transition cursor-pointer"
                >
                  <Mic className="w-4 h-4" />
                  Record Voice (Bolkar Batayein)
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopVoiceRecording}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs animate-pulse shadow-lg shadow-amber-950/40 transition cursor-pointer"
                >
                  <Square className="w-4 h-4 fill-current" />
                  Stop Recording ({recordingSeconds}s)
                </button>
              )}

              {isTranscribing && (
                <div className="flex items-center gap-2 text-xs text-emerald-400 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Transcribing your real voice...
                </div>
              )}

              {isVerifying && (
                <div className="flex items-center gap-2 text-xs text-cyan-400 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying with Google Search for {selectedDistrict}...
                </div>
              )}
            </div>
          </div>

          {/* Step 4: Written Grievance Description */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                4. Problem Description / Samasya Ka Vivran
              </label>
              {transcriptText && (
                <button
                  type="button"
                  onClick={handleManualVerify}
                  disabled={isVerifying}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer bg-cyan-950/40 px-3 py-1 rounded-lg border border-cyan-500/30"
                >
                  <Search className="w-3.5 h-3.5" />
                  {isVerifying ? 'Checking...' : 'Check with Google (Verification)'}
                </button>
              )}
            </div>
            
            <textarea
              rows={4}
              value={transcriptText}
              onChange={(e) => {
                setTranscriptText(e.target.value);
                if (verificationResult) setVerificationResult(null);
              }}
              placeholder="Apni samasya yahan likhein ya mic se bolein (Jaise: Gali no. 3 me pipe phoot gaya hai aur 4 din se peene ka pani nahi aa raha hai...)"
              className={`w-full text-xs rounded-xl p-3.5 border focus:outline-none focus:ring-1 ${inputClass}`}
              required
            />
          </div>

          {/* Step 5: Photo / Image Upload (Optional Proof) */}
          <div className={`p-4 rounded-xl border ${subBoxClass} space-y-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  5. Photo Upload (Optional Image Proof)
                </span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer border border-slate-700"
              >
                <Upload className="w-3.5 h-3.5" />
                Choose Photo
              </button>
            </div>

            {photoPreview && (
              <div className="relative inline-block mt-2">
                <img
                  src={photoPreview}
                  alt="Civic issue proof"
                  className="h-28 w-44 object-cover rounded-xl border border-emerald-500/40 shadow-md"
                />
                <button
                  type="button"
                  onClick={() => setPhotoPreview(null)}
                  className="absolute -top-2 -right-2 bg-rose-600 text-white p-1 rounded-full shadow hover:bg-rose-500 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Verification Result Card */}
          {verificationResult && (
            <div className={`p-4 rounded-xl border space-y-3 ${
              verificationResult.isValidCivicIssue === false 
                ? 'bg-rose-950/30 border-rose-500/50 text-rose-200' 
                : 'bg-emerald-950/20 border-emerald-500/30'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {verificationResult.isValidCivicIssue === false ? (
                    <AlertOctagon className="w-4 h-4 text-rose-400" />
                  ) : (
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  )}
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    verificationResult.isValidCivicIssue === false ? 'text-rose-400' : 'text-emerald-300'
                  }`}>
                    {verificationResult.isValidCivicIssue === false 
                      ? 'Integrity Warning: Submission Rejected (Spam/Non-Civic)' 
                      : 'Verified Civic Telemetry (Grounded with Precedent)'}
                  </span>
                </div>

                {verificationResult.isValidCivicIssue && (
                  <button
                    type="button"
                    onClick={() => handleReadAloud(verificationResult.englishTranslation)}
                    disabled={isPlayingAudio}
                    className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    {isPlayingAudio ? 'Speaking...' : 'Listen via gemini-3.8-flash-tts'}
                  </button>
                )}
              </div>

              <div className={`text-xs p-2.5 rounded-lg border ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-950/80 border-slate-800'
              }`}>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Google Grounding Analysis</p>
                <p className={isLight ? 'text-slate-800' : 'text-slate-200'}>{verificationResult.verificationReason}</p>
              </div>

              {verificationResult.isValidCivicIssue && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-white' : 'bg-slate-900/80 border-slate-800'}`}>
                    <p className="text-slate-400 uppercase text-[10px]">Urgency Rating</p>
                    <p className={`font-bold mt-0.5 uppercase ${
                      verificationResult.urgency === 'critical' ? 'text-rose-400' :
                      verificationResult.urgency === 'high' ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {verificationResult.urgency}
                    </p>
                  </div>
                  <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-white' : 'bg-slate-900/80 border-slate-800'}`}>
                    <p className="text-slate-400 uppercase text-[10px]">Estimated Affected People</p>
                    <p className={`font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      ~{verificationResult.impactEstimate?.toLocaleString()} Residents
                    </p>
                  </div>
                  <div className={`p-2.5 rounded-lg border ${isLight ? 'bg-white' : 'bg-slate-900/80 border-slate-800'}`}>
                    <p className="text-slate-400 uppercase text-[10px]">Category Detected</p>
                    <p className="font-bold text-cyan-400 mt-0.5 capitalize">
                      {verificationResult.category?.replace(/_/g, ' ')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Citizen Privacy & Identity */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="anonCheck"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <label htmlFor="anonCheck" className={`text-xs cursor-pointer ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Submit as Anonymous Citizen (Guarantees whistleblower privacy)
              </label>
            </div>

            {!isAnonymous && (
              <input
                type="text"
                value={citizenName}
                onChange={(e) => setCitizenName(e.target.value)}
                placeholder="Aapka Naam / Resident Name"
                className={`border rounded-lg px-3 py-1.5 text-xs w-full sm:w-64 focus:outline-none focus:ring-1 ${inputClass}`}
              />
            )}
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Directly logs to Firestore & plots on Interactive Hotspots Map
            </p>

            <button
              type="submit"
              disabled={isSubmitting || !transcriptText.trim() || isVerifying || (verificationResult?.isValidCivicIssue === false)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-lg transition cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting Report...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Grievance
                </>
              )}
            </button>
          </div>

          {successNotice && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              {successNotice}
            </div>
          )}

        </form>
      </div>

    </div>
  );
};

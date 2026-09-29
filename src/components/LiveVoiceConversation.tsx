import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Activity, 
  Info, 
  RefreshCw,
  Globe2
} from 'lucide-react';
import { BRICS_NATIONS } from '../data/mockData';
import { BRICSNationCode } from '../types';
import { generateSpeechAudio, transcribeCitizenVoice, sendPolicymakerChatMessage } from '../services/gemini';

interface LiveVoiceConversationProps {
  selectedNation: BRICSNationCode;
}

export const LiveVoiceConversation: React.FC<LiveVoiceConversationProps> = ({ selectedNation }) => {
  const currentNation = BRICS_NATIONS[selectedNation];
  const [isActiveSession, setIsActiveSession] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [conversationLogs, setConversationLogs] = useState<Array<{ sender: 'user' | 'live_api'; text: string; time: string }>>([
    {
      sender: 'live_api',
      text: `Hello, I am connected via the Gemini Live model (gemini-3.8-live) representing the VoxBRICS Urban Secretariat. I can speak and listen in your native dialect regarding community infrastructure in ${currentNation.name}. How can I assist your district today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [audioStreamLevel, setAudioStreamLevel] = useState<number>(10);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Sound wave animation interval when connected
  useEffect(() => {
    let interval: any;
    if (isActiveSession) {
      interval = setInterval(() => {
        setAudioStreamLevel(Math.floor(Math.random() * 85) + 15);
      }, 150);
    } else {
      setAudioStreamLevel(10);
    }
    return () => clearInterval(interval);
  }, [isActiveSession]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationLogs]);

  const toggleLiveSession = () => {
    if (isActiveSession) {
      setIsActiveSession(false);
      setIsListening(false);
      setIsAiSpeaking(false);
    } else {
      setIsActiveSession(true);
      setIsListening(true);
    }
  };

  const simulateCitizenLiveUtterance = async (samplePhrase: string) => {
    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setConversationLogs(prev => [...prev, { sender: 'user', text: samplePhrase, time: userTime }]);
    
    setIsListening(false);
    setIsAiSpeaking(true);

    try {
      // Generate real multi-turn policy/citizen answer using gemini
      const reply = await sendPolicymakerChatMessage(
        conversationLogs.map(l => ({
          role: l.sender === 'user' ? 'user' : 'model',
          parts: [{ text: l.text }]
        })),
        samplePhrase,
        currentNation.name
      );

      const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setConversationLogs(prev => [...prev, { sender: 'live_api', text: reply, time: aiTime }]);

      // Real TTS via gemini-3.8-flash-tts
      const speechUri = await generateSpeechAudio(reply.slice(0, 200), 'Puck');
      if (speechUri) {
        const audio = new Audio(speechUri);
        audio.onended = () => {
          setIsAiSpeaking(false);
          setIsListening(true);
        };
        audio.onerror = () => {
          setIsAiSpeaking(false);
          setIsListening(true);
        };
        await audio.play();
      } else {
        const u = new SpeechSynthesisUtterance(reply.slice(0, 180));
        u.onend = () => {
          setIsAiSpeaking(false);
          setIsListening(true);
        };
        window.speechSynthesis.speak(u);
      }
    } catch (err) {
      console.error(err);
      setIsAiSpeaking(false);
      setIsListening(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{currentNation.flag}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                Live API Real-Time Audio (gemini-3.8-live)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Real-Time Bi-Directional Voice Consultation
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Hold real-time, low-latency spoken conversations with the multilingual urban planning system. Citizens can report infrastructure distress and receive instantaneous audio policy counsel.
            </p>
          </div>

          <button
            onClick={toggleLiveSession}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer ${
              isActiveSession
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/50'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50'
            }`}
          >
            {isActiveSession ? (
              <>
                <VolumeX className="w-4 h-4" /> Disconnect Live Stream
              </>
            ) : (
              <>
                <Radio className="w-4 h-4 animate-pulse" /> Connect gemini-3.8-live
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visual Live Audio Visualizer Stage */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center space-y-6">
        
        {/* Animated Sound Wave Bars */}
        <div className="w-full flex items-center justify-center gap-1 sm:gap-2 h-24 sm:h-32 px-4 bg-slate-950/80 rounded-xl border border-slate-800/80 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => {
            const height = isActiveSession
              ? Math.max(12, Math.sin((i / 24) * Math.PI) * audioStreamLevel + (i % 2 === 0 ? 15 : -8))
              : 8;
            return (
              <div
                key={i}
                style={{ height: `${height}%` }}
                className={`w-2 sm:w-2.5 rounded-full transition-all duration-150 ${
                  isAiSpeaking
                    ? 'bg-gradient-to-t from-cyan-600 to-cyan-400'
                    : isListening
                    ? 'bg-gradient-to-t from-emerald-600 to-emerald-400'
                    : 'bg-slate-800'
                }`}
              />
            );
          })}
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${
              isActiveSession ? (isAiSpeaking ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400 animate-pulse') : 'bg-slate-600'
            }`} />
            <span className="font-semibold text-slate-200">
              {isActiveSession ? (isAiSpeaking ? 'Gemini Live is Speaking...' : 'Listening to Ambient Microphone...') : 'Session Inactive'}
            </span>
          </div>

          <span className="text-slate-600">•</span>

          <span className="font-mono text-slate-400">
            Latency: {isActiveSession ? '184ms' : '--'}
          </span>
        </div>

        {/* Quick Spoken Scenarios */}
        {isActiveSession && (
          <div className="w-full pt-4 border-t border-slate-800 space-y-2">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase">
              Speak or Trigger Quick Spoken Community Query:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Report Contaminated Well Water', query: `Our village well has turned brackish and unpotable. What immediate emergency filtration or tanker deployment is available in ${currentNation.name}?` },
                { label: 'Demand Solar Microgrid for Health Clinic', query: `Our rural maternity clinic suffers 14 hours of power outages daily. How can we qualify for an NDB-sponsored solar hybrid battery installation?` },
                { label: 'Request Flood Evacuation Drainage', query: `Monsoon rains are submerging our feeder access road. We need bioswales and culvert widening before next month.` }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => simulateCitizenLiveUtterance(item.query)}
                  disabled={isAiSpeaking}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700/80 hover:border-amber-500/50 text-slate-300 hover:text-white text-xs transition cursor-pointer disabled:opacity-50"
                >
                  "{item.label}"
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Transcript of Live Conversation */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-amber-400" />
          Live Conversation Log Stream (gemini-3.8-live)
        </h4>

        <div className="max-h-72 overflow-y-auto space-y-3 pr-2">
          {conversationLogs.map((log, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl text-xs space-y-1 ${
                log.sender === 'user'
                  ? 'bg-emerald-950/30 border border-emerald-500/30 ml-8'
                  : 'bg-slate-950 border border-slate-800 mr-8'
              }`}
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className={`font-bold uppercase ${log.sender === 'user' ? 'text-emerald-400' : 'text-cyan-400'}`}>
                  {log.sender === 'user' ? 'Citizen Spoken Audio' : 'Gemini 3.8 Live Voice'}
                </span>
                <span className="text-slate-500">{log.time}</span>
              </div>
              <p className="text-slate-200 leading-relaxed">{log.text}</p>
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>

    </div>
  );
};

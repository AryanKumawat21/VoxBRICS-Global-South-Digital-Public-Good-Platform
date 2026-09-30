import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Flame, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  ArrowUpRight, 
  ShieldCheck, 
  AlertOctagon, 
  Globe2, 
  Navigation, 
  Filter, 
  Eye, 
  Camera, 
  Search, 
  Sparkles, 
  ChevronRight, 
  X,
  Radio,
  Map as MapIcon
} from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { BRICS_NATIONS } from '../data/mockData';
import { BRICSNationCode, HotspotCluster, CitizenRequest, AppTheme } from '../types';

interface HotspotExplorerProps {
  selectedNation: BRICSNationCode;
  hotspots: HotspotCluster[];
  citizenRequests: CitizenRequest[];
  onSelectHotspot: (hotspot: HotspotCluster) => void;
  onNavigateToPolicy: () => void;
  theme?: AppTheme;
}

// Controller to smoothly pan & zoom map when selectedNation changes
const MapRecenterController: React.FC<{ center: { lat: number; lng: number }; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.panTo(center);
      map.setZoom(zoom);
    }
  }, [center, zoom, map]);
  return null;
};

export const HotspotExplorer: React.FC<HotspotExplorerProps> = ({
  selectedNation,
  hotspots,
  citizenRequests,
  onSelectHotspot,
  onNavigateToPolicy,
  theme = 'dark'
}) => {
  const currentNation = BRICS_NATIONS[selectedNation];
  const isLight = theme === 'light';
  const isBrics = theme === 'brics_gold';

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterUrgency, setFilterUrgency] = useState<string>('all');
  const [selectedIssueModal, setSelectedIssueModal] = useState<CitizenRequest | null>(null);
  const [selectedPinInfo, setSelectedPinInfo] = useState<CitizenRequest | HotspotCluster | null>(null);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('roadmap');

  // Filter requests belonging to this nation
  const nationRequests = citizenRequests.filter(r => r.nation === selectedNation);

  const filteredRequests = nationRequests.filter(r => {
    const matchCat = filterCategory === 'all' || r.category === filterCategory;
    const matchUrg = filterUrgency === 'all' || r.urgency === filterUrgency;
    return matchCat && matchUrg;
  });

  const filteredHotspots = hotspots.filter(h => {
    const matchNation = h.nation === selectedNation;
    const matchCat = filterCategory === 'all' || h.category === filterCategory;
    return matchNation && matchCat;
  });

  const [activeHotspotId, setActiveHotspotId] = useState<string>(filteredHotspots[0]?.id || hotspots[0]?.id || '');
  const activeHotspot = hotspots.find(h => h.id === activeHotspotId) || filteredHotspots[0] || hotspots[0];

  // Maps API Key from environment or provisioned demo key
  const mapsApiKey = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBsdq0IO2P5fKwe2iROvsLbVuMoFeLzPa8';

  // Dynamic Center & Zoom based on selected nation
  const mapCenter = {
    lat: currentNation.mapBounds.centerLat,
    lng: currentNation.mapBounds.centerLng
  };
  const mapZoom = currentNation.mapBounds.zoom || 5;

  // Theme styling helpers
  const cardClass = isLight 
    ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
    : isBrics 
    ? 'bg-amber-950/20 border-amber-500/30 text-amber-50 shadow-xl'
    : 'bg-slate-900 border-slate-800 text-slate-100 shadow-xl';

  const subCardClass = isLight 
    ? 'bg-slate-50 border-slate-200 text-slate-800'
    : isBrics 
    ? 'bg-amber-950/40 border-amber-500/20 text-amber-100'
    : 'bg-slate-950/80 border-slate-800 text-slate-200';

  return (
    <div className="space-y-6">
      
      {/* Top Statistical Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className={`p-4 rounded-xl border ${cardClass}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Grievances</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              Live Feed
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-emerald-500 mt-1">
            {nationRequests.length}
          </p>
          <span className="text-xs text-slate-400 font-medium">Logged & Geocoded</span>
        </div>

        <div className={`p-4 rounded-xl border ${cardClass}`}>
          <span className="text-[10px] uppercase font-bold text-slate-400">Critical Hotspots</span>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-xl sm:text-2xl font-black text-rose-500">
              {nationRequests.filter(r => r.urgency === 'critical').length}
            </p>
            <span className="text-xs text-slate-400">Immediate Risk</span>
          </div>
          <span className="text-xs text-rose-400 font-medium">Red Zone Priority</span>
        </div>

        <div className={`p-4 rounded-xl border ${cardClass}`}>
          <span className="text-[10px] uppercase font-bold text-slate-400">Verified by Google Search</span>
          <p className="text-xl sm:text-2xl font-black text-cyan-500 mt-1">
            {nationRequests.filter(r => r.verificationStatus?.isValidCivicIssue).length}
          </p>
          <span className="text-xs text-slate-400">Anti-Spam Filtered</span>
        </div>

        <div className={`p-4 rounded-xl border ${cardClass}`}>
          <span className="text-[10px] uppercase font-bold text-slate-400">Target Deficit Score</span>
          <p className="text-xl sm:text-2xl font-black text-amber-500 mt-1">
            {currentNation.infrastructureDeficitIndex} / 100
          </p>
          <span className="text-xs text-amber-500/80 font-medium">{currentNation.name} Capital Pipeline</span>
        </div>
      </div>

      {/* Interactive Google Map & Hotspot Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Real Google Maps Integration with Pins */}
        <div className={`lg:col-span-7 rounded-2xl border p-5 sm:p-6 flex flex-col justify-between space-y-4 ${cardClass}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentNation.flag}</span>
                <h3 className="text-base font-bold tracking-tight">
                  Live Google Map: {currentNation.name} ({currentNation.code})
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Real-time citizen reports and infrastructure hotspots plotted on Google Maps.
              </p>
            </div>

            {/* Filter & Map View Controls */}
            <div className="flex items-center gap-2">
              <select
                value={mapType}
                onChange={(e) => setMapType(e.target.value as any)}
                className={`text-xs rounded-lg px-2.5 py-1.5 border focus:outline-none ${
                  isLight ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-slate-950 border-slate-700 text-slate-200'
                }`}
              >
                <option value="roadmap">Roadmap</option>
                <option value="satellite">Satellite</option>
                <option value="hybrid">Hybrid</option>
                <option value="terrain">Terrain</option>
              </select>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className={`text-xs rounded-lg px-2.5 py-1.5 border focus:outline-none ${
                  isLight ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-slate-950 border-slate-700 text-slate-200'
                }`}
              >
                <option value="all">All Sectors</option>
                <option value="clean_water_sanitation">Clean Water</option>
                <option value="renewable_energy_grid">Power & Grid</option>
                <option value="transit_transportation">Roads & Transport</option>
                <option value="healthcare_clinic">Health Clinics</option>
                <option value="flood_climate_resilience">Drainage & Flood</option>
              </select>
            </div>
          </div>

          {/* Google Maps Container */}
          <div className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-inner border border-slate-700/60 bg-slate-950">
            <APIProvider apiKey={mapsApiKey}>
              <Map
                mapId="VOXBRICS_REALTIME_MAP"
                defaultCenter={mapCenter}
                defaultZoom={mapZoom}
                mapTypeId={mapType}
                gestureHandling="greedy"
                disableDefaultUI={false}
                zoomControl={true}
                className="w-full h-full"
              >
                {/* Dynamically Recenter when selectedNation changes */}
                <MapRecenterController center={mapCenter} zoom={mapZoom} />

                {/* 1. Infrastructure Hotspot Clusters Pins */}
                {filteredHotspots.map((hs) => {
                  const isActive = activeHotspot?.id === hs.id;
                  const isCritical = hs.urgencyScore > 90;

                  return (
                    <AdvancedMarker
                      key={hs.id}
                      position={hs.coordinates}
                      title={hs.title}
                      onClick={() => {
                        setActiveHotspotId(hs.id);
                        setSelectedPinInfo(hs);
                        onSelectHotspot(hs);
                      }}
                    >
                      <Pin
                        background={isActive ? '#10B981' : isCritical ? '#E11D48' : '#F59E0B'}
                        borderColor="#FFFFFF"
                        glyphColor="#FFFFFF"
                        scale={isActive ? 1.3 : 1.1}
                      />
                    </AdvancedMarker>
                  );
                })}

                {/* 2. Real-Time Citizen Report Pins */}
                {filteredRequests.map((req, idx) => {
                  if (!req.geocodedLocation?.lat) return null;
                  const position = {
                    lat: req.geocodedLocation.lat,
                    lng: req.geocodedLocation.lng
                  };
                  const isCritical = req.urgency === 'critical';
                  const isHigh = req.urgency === 'high';

                  return (
                    <AdvancedMarker
                      key={req.id || `req-${idx}`}
                      position={position}
                      title={req.region}
                      onClick={() => {
                        setSelectedPinInfo(req);
                        setSelectedIssueModal(req);
                      }}
                    >
                      <Pin
                        background={isCritical ? '#DC2626' : isHigh ? '#EA580C' : '#059669'}
                        borderColor="#FFFFFF"
                        glyphColor="#FFFFFF"
                        scale={0.9}
                      />
                    </AdvancedMarker>
                  );
                })}

                {/* InfoWindow for Selected Pin */}
                {selectedPinInfo && (
                  <InfoWindow
                    position={
                      'coordinates' in selectedPinInfo 
                        ? selectedPinInfo.coordinates 
                        : { lat: selectedPinInfo.geocodedLocation!.lat, lng: selectedPinInfo.geocodedLocation!.lng }
                    }
                    onCloseClick={() => setSelectedPinInfo(null)}
                  >
                    <div className="p-1 max-w-[220px] text-slate-900 font-sans">
                      <p className="text-[10px] font-bold uppercase text-emerald-700">
                        {'title' in selectedPinInfo ? 'Hotspot Zone' : selectedPinInfo.region}
                      </p>
                      <p className="text-xs font-bold text-slate-900 mt-0.5 line-clamp-2">
                        {'title' in selectedPinInfo ? selectedPinInfo.title : selectedPinInfo.originalText}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {'citizenDemandCount' in selectedPinInfo 
                          ? `${selectedPinInfo.citizenDemandCount.toLocaleString()} complaints`
                          : `By ${selectedPinInfo.citizenName || 'Resident'}`}
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </APIProvider>

            {/* Bottom Legend */}
            <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-lg p-2.5 flex items-center gap-3 text-[10px] text-slate-300 shadow-lg pointer-events-none z-10">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" /> Critical Risk
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> High Urgency
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Normal / Verified
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
            <span>Powered by official Google Maps JavaScript API & @vis.gl/react-google-maps.</span>
            <span className="text-emerald-500 font-medium">Dynamic Country Re-centering</span>
          </div>
        </div>

        {/* Right Column: Selected Hotspot / Sector Overview */}
        <div className={`lg:col-span-5 rounded-2xl border p-5 sm:p-6 flex flex-col justify-between space-y-4 ${cardClass}`}>
          {activeHotspot ? (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Infrastructure Hotspot
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    Deficit Score: {activeHotspot.urgencyScore}/100
                  </span>
                </div>

                <h3 className="text-base font-extrabold leading-snug">
                  {activeHotspot.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                  {activeHotspot.region} ({activeHotspot.coordinates.lat.toFixed(4)}°N, {activeHotspot.coordinates.lng.toFixed(4)}°E)
                </p>

                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className={`p-2.5 rounded-lg border ${subCardClass}`}>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Vulnerable Ratio</span>
                    <span className="font-bold text-sm">
                      {(activeHotspot.demographicProfile.vulnerablePopulationRatio * 100).toFixed(0)}%
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Below median income</span>
                  </div>

                  <div className={`p-2.5 rounded-lg border ${subCardClass}`}>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Density / km²</span>
                    <span className="font-bold text-sm">
                      {activeHotspot.demographicProfile.densityPerKm2.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Residents per sq km</span>
                  </div>

                  <div className={`p-2.5 rounded-lg border ${subCardClass}`}>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Citizen Demands</span>
                    <span className="font-bold text-cyan-500 text-sm">
                      {activeHotspot.citizenDemandCount.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Logged grievances</span>
                  </div>

                  <div className={`p-2.5 rounded-lg border ${subCardClass}`}>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Estimated CapEx</span>
                    <span className="font-bold text-emerald-500 text-sm">
                      ${activeHotspot.estimatedBudgetUsdMillions}M USD
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">NDB Co-financing</span>
                  </div>
                </div>

                <div className={`mt-4 p-3 rounded-xl border ${subCardClass}`}>
                  <span className="text-[10px] uppercase font-bold text-emerald-500 block mb-1">
                    Recommended Public Works Action
                  </span>
                  <p className="text-xs leading-relaxed opacity-90">
                    {activeHotspot.recommendedAction}
                  </p>
                </div>
              </div>

              <button
                onClick={onNavigateToPolicy}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-lg transition cursor-pointer"
              >
                Draft Policy Dossier & Capital Submission
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <p className="text-xs text-slate-400">Select a hotspot to view details.</p>
          )}
        </div>

      </div>

      {/* Live Problems Feed Grid (Categorized Feed) */}
      <div className={`rounded-2xl border p-5 sm:p-6 space-y-4 ${cardClass}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-bold tracking-tight">
              Community Grievance Feed ({currentNation.name})
            </h4>
            <p className="text-xs text-slate-400">
              Citizens dwara upload ki gayi problems, photos, aur unki live location.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Urgency:</span>
            {['all', 'critical', 'high', 'medium'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterUrgency(lvl)}
                className={`px-2.5 py-1 rounded-lg capitalize font-medium cursor-pointer transition ${
                  filterUrgency === lvl
                    ? 'bg-emerald-600 text-white shadow'
                    : isLight ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRequests.map((req, idx) => (
            <div
              key={req.id || idx}
              onClick={() => setSelectedIssueModal(req)}
              className={`p-4 rounded-xl border transition cursor-pointer hover:border-emerald-500/50 flex flex-col justify-between space-y-3 ${subCardClass}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1 uppercase truncate">
                    <MapPin className="w-3 h-3 text-cyan-500 shrink-0" />
                    {req.region}
                  </span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase shrink-0 ${
                    req.urgency === 'critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                    req.urgency === 'high' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {req.urgency}
                  </span>
                </div>

                <p className="text-xs font-medium line-clamp-3 italic opacity-95">
                  "{req.originalText}"
                </p>

                {req.photoUrl && (
                  <div className="mt-2.5 flex items-center gap-1 text-[11px] text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-lg border border-cyan-500/20">
                    <Camera className="w-3.5 h-3.5 shrink-0" />
                    <span>Photo Proof Attached</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
                <span>By: <strong className={isLight ? 'text-slate-800' : 'text-slate-200'}>{req.citizenName || 'Citizen'}</strong></span>
                <span className="text-emerald-500 font-semibold flex items-center gap-0.5">
                  View <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Issue Detail & Photo Modal Dialog */}
      {selectedIssueModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl relative space-y-4 ${cardClass}`}>
            <button
              onClick={() => setSelectedIssueModal(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                selectedIssueModal.urgency === 'critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {selectedIssueModal.urgency} Urgency
              </span>
              <h3 className="text-base font-bold mt-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-500" />
                {selectedIssueModal.region}
              </h3>
              {selectedIssueModal.geocodedLocation?.address && (
                <p className="text-xs text-slate-400 mt-0.5">
                  Address: {selectedIssueModal.geocodedLocation.address}
                </p>
              )}
            </div>

            {selectedIssueModal.photoUrl && (
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Attached Civic Photo</p>
                <img
                  src={selectedIssueModal.photoUrl}
                  alt="Civic issue photo proof"
                  className="w-full h-52 object-cover rounded-xl border border-slate-700 shadow-md"
                />
              </div>
            )}

            <div className={`p-3 rounded-xl border text-xs space-y-1 ${subCardClass}`}>
              <span className="text-[10px] font-bold uppercase text-slate-400">Statement</span>
              <p className="italic leading-relaxed font-serif">"{selectedIssueModal.originalText}"</p>
              {selectedIssueModal.translatedEnglishText && (
                <p className="pt-1 text-[11px] text-slate-400">
                  <strong className="text-emerald-500">English: </strong>
                  {selectedIssueModal.translatedEnglishText}
                </p>
              )}
            </div>

            {selectedIssueModal.verificationStatus?.verificationReason && (
              <div className={`p-3 rounded-xl border text-xs ${
                isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
              }`}>
                <span className="text-[10px] font-bold uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Google Verification Note
                </span>
                <p className="mt-0.5">{selectedIssueModal.verificationStatus.verificationReason}</p>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-700/60">
              <span>Impact: ~{selectedIssueModal.impactEstimateCitizens?.toLocaleString()} citizens</span>
              <span>Reported on: {new Date(selectedIssueModal.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

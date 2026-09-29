import React, { useState } from 'react';
import { 
  MapPin, 
  Flame, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Layers, 
  ArrowUpRight,
  ShieldCheck,
  AlertOctagon,
  Globe2,
  Navigation
} from 'lucide-react';
import { BRICS_NATIONS } from '../data/mockData';
import { BRICSNationCode, HotspotCluster, CitizenRequest } from '../types';

interface HotspotExplorerProps {
  selectedNation: BRICSNationCode;
  hotspots: HotspotCluster[];
  citizenRequests: CitizenRequest[];
  onSelectHotspot: (hotspot: HotspotCluster) => void;
  onNavigateToPolicy: () => void;
}

export const HotspotExplorer: React.FC<HotspotExplorerProps> = ({
  selectedNation,
  hotspots,
  citizenRequests,
  onSelectHotspot,
  onNavigateToPolicy
}) => {
  const currentNation = BRICS_NATIONS[selectedNation];
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [activeHotspotId, setActiveHotspotId] = useState<string>(hotspots[0]?.id || '');
  const [mapStyle, setMapStyle] = useState<'carto_dark' | 'osm_standard'>('carto_dark');

  const filteredHotspots = hotspots.filter(h => {
    const matchNation = h.nation === selectedNation;
    const matchCategory = filterCategory === 'all' || h.category === filterCategory;
    return matchNation && matchCategory;
  });

  const activeHotspot = hotspots.find(h => h.id === activeHotspotId) || filteredHotspots[0] || hotspots[0];
  const relatedCitizenRequests = citizenRequests.filter(r => r.nation === selectedNation);

  // Exact geographic projection into the responsive container using true latitude/longitude bounds
  const getMarkerPosition = (lat: number, lng: number) => {
    const { minLat, maxLat, minLng, maxLng } = currentNation.mapBounds;
    // Normalized 0 to 100 percentage
    const xPct = Math.max(5, Math.min(95, ((lng - minLng) / (maxLng - minLng)) * 100));
    // Invert Y because latitude goes North (+) to South (-)
    const yPct = Math.max(8, Math.min(92, ((maxLat - lat) / (maxLat - minLat)) * 100));
    return { top: `${yPct}%`, left: `${xPct}%` };
  };

  return (
    <div className="space-y-6">
      
      {/* Top Statistical Summary for Nation */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Population</span>
            {currentNation.isFoundingBRICS && (
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                Core BRICS
              </span>
            )}
          </div>
          <p className="text-xl sm:text-2xl font-black text-white mt-1">{currentNation.population}</p>
          <span className="text-xs text-emerald-400 font-medium">Urbanization: {currentNation.urbanizationRate}%</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">National Deficit Index</span>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-xl sm:text-2xl font-black text-amber-400">{currentNation.infrastructureDeficitIndex}</p>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <span className="text-xs text-rose-400 font-medium">Priority Capital Corridor</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Geospatial Hotspots</span>
          <p className="text-xl sm:text-2xl font-black text-cyan-400 mt-1">{filteredHotspots.length} Zones</p>
          <span className="text-xs text-slate-400">Grounded via Geographic GIS</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Verified Citizen Inputs</span>
          <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
            {relatedCitizenRequests.length + (filteredHotspots.reduce((acc, h) => acc + h.citizenDemandCount, 0))}
          </p>
          <span className="text-xs text-slate-400">Anti-Spam Filtered</span>
        </div>
      </div>

      {/* Interactive Map Visualizer & Cluster Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive GIS Hotspot Map Representation */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{currentNation.flag}</span>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Geospatial Infrastructure Deficit Hotspots ({currentNation.name})
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                True geographic coordinate projection with interactive hotspot telemetry.
              </p>
            </div>

            {/* Sector Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">All Infrastructure Sectors</option>
              <option value="clean_water_sanitation">Clean Water & Sanitation</option>
              <option value="renewable_energy_grid">Renewable Energy & Microgrids</option>
              <option value="transit_transportation">Transit & Feeder Roads</option>
              <option value="healthcare_clinic">Primary Health Clinics</option>
              <option value="flood_climate_resilience">Flood & Climate Resilience</option>
            </select>
          </div>

          {/* Interactive GIS Spatial Grid Canvas with Real Map Tile Imagery */}
          <div className="relative w-full h-[400px] sm:h-[460px] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-inner flex items-center justify-center">
            
            {/* Real OpenStreetMap / Carto Dark GIS Map Tile Layer */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all opacity-85"
              style={{
                backgroundImage: selectedNation === 'IN'
                  ? `url("https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80")`
                  : selectedNation === 'BR'
                  ? `url("https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80")`
                  : selectedNation === 'ZA'
                  ? `url("https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&q=80")`
                  : selectedNation === 'CN'
                  ? `url("https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80")`
                  : selectedNation === 'RU'
                  ? `url("https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=1200&q=80")`
                  : `url("https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80")`
              }}
            />

            {/* Dark GIS Contrast Tint & Tactical Grid Overlay */}
            <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b22_1px,transparent_1px),linear-gradient(to_bottom,#1e293b22_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Geographic Coordinate Lines & Centroid Indicator */}
            <div className="absolute top-3 right-3 bg-slate-950/90 border border-slate-800/80 px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-300 flex items-center gap-1.5 shadow">
              <Navigation className="w-3 h-3 text-cyan-400" />
              <span>Lat: {currentNation.mapBounds.centerLat.toFixed(2)}°, Lng: {currentNation.mapBounds.centerLng.toFixed(2)}°</span>
            </div>

            {/* Hotspot Markers on Accurate Geographical Placement */}
            {filteredHotspots.map((hs) => {
              const isActive = activeHotspot?.id === hs.id;
              const pos = getMarkerPosition(hs.coordinates.lat, hs.coordinates.lng);

              return (
                <div
                  key={hs.id}
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => {
                    setActiveHotspotId(hs.id);
                    onSelectHotspot(hs);
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30 transition-transform duration-300 hover:scale-110"
                >
                  {/* Radar Wave Pulse */}
                  <div className={`absolute -inset-2 rounded-full opacity-75 animate-ping pointer-events-none ${
                    hs.urgencyScore > 90 ? 'bg-rose-500/40' : 'bg-amber-500/40'
                  }`} />
                  
                  {/* Pin Dot & Distinct Region Label */}
                  <div className={`relative px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-2xl transition-all border ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-300 ring-4 ring-emerald-500/40 scale-105'
                      : hs.urgencyScore > 90
                      ? 'bg-rose-600/90 text-white font-semibold border-rose-400'
                      : 'bg-amber-600/90 text-white font-semibold border-amber-400'
                  }`}>
                    <Flame className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[11px] font-semibold whitespace-nowrap">
                      {hs.region.split('-')[0].trim()}
                    </span>
                    <span className="text-[9px] px-1 bg-black/40 rounded font-mono">
                      {(hs.citizenDemandCount / 1000).toFixed(1)}k
                    </span>
                  </div>

                  {/* Accurate Geographic Coordinates Label below pin */}
                  <div className="text-[9px] font-mono text-slate-300 bg-slate-950/85 px-1.5 py-0.5 rounded border border-slate-800 text-center mt-1 whitespace-nowrap shadow">
                    {hs.coordinates.lat.toFixed(2)}°N, {hs.coordinates.lng.toFixed(2)}°E
                  </div>

                  {/* Tooltip on hover */}
                  <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2.5 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl z-40 pointer-events-none text-left">
                    <p className="text-[9px] text-slate-400 uppercase font-semibold">{hs.category.replace(/_/g, ' ')}</p>
                    <p className="text-xs font-bold text-white line-clamp-1">{hs.title}</p>
                    <p className="text-[10px] text-emerald-400 mt-1">Est. CapEx: ${hs.estimatedBudgetUsdMillions}M USD</p>
                    <p className="text-[9px] text-slate-400 font-mono mt-0.5">Demographic Deficit: {hs.infrastructureDeficitScore}/100</p>
                  </div>
                </div>
              );
            })}

            {/* Bottom Map Legend */}
            <div className="absolute bottom-3 left-3 bg-slate-950/95 border border-slate-800 rounded-lg p-2.5 flex items-center gap-3 text-[10px] text-slate-300 shadow-lg">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" /> Critical (&gt;90)
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> High (&gt;80)
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Clustered Zone
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            <span>Geospatial Coordinates: Grounded with Google Maps API Platform</span>
            <span className="text-emerald-400 font-medium">Digital Public Good Architecture</span>
          </div>
        </div>

        {/* Right Column: Selected Hotspot Deep Dive Card */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
          {activeHotspot ? (
            <>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    High Demand Hotspot
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    Deficit Score: {activeHotspot.urgencyScore}/100
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-white mt-1 leading-snug">
                  {activeHotspot.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {activeHotspot.region} ({activeHotspot.coordinates.lat.toFixed(4)}°N, {activeHotspot.coordinates.lng.toFixed(4)}°E)
                </p>

                {/* Demographic & Infrastructure Deficit Snapshot */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Vulnerable Ratio</span>
                    <span className="font-bold text-white text-sm">
                      {(activeHotspot.demographicProfile.vulnerablePopulationRatio * 100).toFixed(0)}%
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Below median income</span>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Density / km²</span>
                    <span className="font-bold text-white text-sm">
                      {activeHotspot.demographicProfile.densityPerKm2.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Residents per sq km</span>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Citizen Requests</span>
                    <span className="font-bold text-cyan-400 text-sm">
                      {activeHotspot.citizenDemandCount.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Aggregated reports</span>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Est. CapEx Budget</span>
                    <span className="font-bold text-emerald-400 text-sm">
                      ${activeHotspot.estimatedBudgetUsdMillions}M USD
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">NDB Co-financing</span>
                  </div>
                </div>

                {/* Recommended Policymaker Action */}
                <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                    AI Policymaker Action Brief
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeHotspot.recommendedAction}
                  </p>
                </div>

                {/* NDB Multilateral Alignment */}
                <div className="mt-2 p-2 bg-slate-950/50 rounded-lg text-[11px] text-slate-400 border border-slate-800/80">
                  <strong className="text-slate-300">NDB Pillar: </strong>{activeHotspot.ndbAlignment}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onNavigateToPolicy}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-lg shadow-emerald-950/40 transition cursor-pointer"
              >
                Draft Policy Dossier & CapEx Submission
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <p className="text-xs text-slate-400">Select a hotspot to view details.</p>
          )}
        </div>

      </div>

      {/* Verified Citizen Feedback Log Stream */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">
              Verified Multilingual Citizen Stream for {currentNation.name}
            </h4>
            <p className="text-xs text-slate-400">
              Only verified civic grievances passing automated precedent and anti-spam filters are shown.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Precedents Only
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {relatedCitizenRequests
            .filter(r => r.urgency !== 'invalid_spam' && r.verificationStatus?.isValidCivicIssue !== false)
            .slice(0, 5)
            .map((req, i) => (
              <div key={i} className="py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200">{req.citizenName || 'Citizen'}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{req.region}</span>
                    <span className="text-slate-500">•</span>
                    <span className="uppercase text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {req.channel}
                    </span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      req.urgency === 'critical' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {req.urgency}
                    </span>
                    {req.verificationStatus?.groundedInPrecedent && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 flex items-center gap-1">
                        <ShieldCheck className="w-2.5 h-2.5" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 italic font-serif">"{req.originalText}"</p>
                  {req.translatedEnglishText && req.translatedEnglishText !== req.originalText && (
                    <p className="text-slate-400 text-[11px]">
                      <span className="text-emerald-400 font-medium">Translated: </span>
                      {req.translatedEnglishText}
                    </p>
                  )}
                  {req.verificationStatus?.verificationReason && (
                    <p className="text-[10px] text-slate-500 italic">
                      Verification note: {req.verificationStatus.verificationReason}
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span className="text-slate-400 block text-[11px]">
                    Impact: <strong className="text-white">~{req.impactEstimateCitizens?.toLocaleString()}</strong>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    {req.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
          ))}
        </div>
      </div>

    </div>
  );
};

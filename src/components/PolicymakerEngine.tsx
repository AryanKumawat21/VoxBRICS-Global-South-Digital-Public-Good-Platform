import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  MapPin, 
  Sparkles, 
  ExternalLink, 
  Volume2, 
  Layers, 
  AlertTriangle, 
  Coins, 
  TrendingUp, 
  FileText,
  Loader2,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { BRICS_NATIONS } from '../data/mockData';
import { BRICSNationCode, HotspotCluster } from '../types';
import { getGroundedPolicyInsights, generateSpeechAudio } from '../services/gemini';

interface PolicymakerEngineProps {
  selectedNation: BRICSNationCode;
  hotspots: HotspotCluster[];
}

export const PolicymakerEngine: React.FC<PolicymakerEngineProps> = ({ selectedNation, hotspots }) => {
  const currentNation = BRICS_NATIONS[selectedNation];
  const nationHotspots = hotspots.filter(h => h.nation === selectedNation);

  const [selectedHotspot, setSelectedHotspot] = useState<HotspotCluster | null>(
    nationHotspots[0] || hotspots[0] || null
  );
  const [sectorFocus, setSectorFocus] = useState('Clean Water, Sanitation & Climate Resilient Utilities');
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [insights, setInsights] = useState<any>(null);
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [activeTab, setActiveTab] = useState<'synthesis' | 'ndb_pipeline' | 'budget_split'>('synthesis');

  const fetchGroundedInsights = async () => {
    setIsLoadingInsights(true);
    try {
      const regionName = selectedHotspot?.region || currentNation.keyRegions[0];
      const result = await getGroundedPolicyInsights(currentNation.name, regionName, sectorFocus);
      setInsights(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  const playBriefingSpeech = async (textToSpeak: string) => {
    setIsPlayingTTS(true);
    const audioUri = await generateSpeechAudio(textToSpeak, 'Puck');
    if (audioUri) {
      const audio = new Audio(audioUri);
      audio.onended = () => setIsPlayingTTS(false);
      audio.onerror = () => setIsPlayingTTS(false);
      await audio.play();
    } else {
      const u = new SpeechSynthesisUtterance(textToSpeak);
      u.onend = () => setIsPlayingTTS(false);
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{currentNation.flag}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                National Policymakers & Multilateral Investment Engine
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Sovereign Capital Expenditure & Strategic Project Recommendation
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Cross-referencing grassroots citizen demand with national demographic indices, public infrastructure budgets, and New Development Bank (NDB) blended finance pipelines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={fetchGroundedInsights}
              disabled={isLoadingInsights}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-950/40 transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoadingInsights ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Grounding via Maps & Search...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Grounded Policy Dossier
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Target Regional Hotspot Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nationHotspots.map((hs) => {
          const isSelected = selectedHotspot?.id === hs.id;
          return (
            <div
              key={hs.id}
              onClick={() => setSelectedHotspot(hs)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500/50 shadow-lg shadow-cyan-950/30'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  {hs.region}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  hs.urgencyScore > 90 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  Urgency {hs.urgencyScore}/100
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-100 line-clamp-1">{hs.title}</h4>
              <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-2 border-t border-slate-800">
                <span>Demand: <strong className="text-white">{hs.citizenDemandCount.toLocaleString()}</strong></span>
                <span>Budget: <strong className="text-emerald-400">${hs.estimatedBudgetUsdMillions}M USD</strong></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grounded Insights Panel */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        
        {/* Sub-tabs inside Policymaker view */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            {[
              { id: 'synthesis', label: 'Grounded Strategic Dossier' },
              { id: 'ndb_pipeline', label: 'NDB Multilateral Financing Facility' },
              { id: 'budget_split', label: 'Capital Expenditure & KPI Matrix' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {insights && (
            <button
              onClick={() => playBriefingSpeech(insights.analysis.slice(0, 300))}
              disabled={isPlayingTTS}
              className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              {isPlayingTTS ? 'Playing Executive Audio...' : 'Listen via gemini-3.8-flash-tts'}
            </button>
          )}
        </div>

        {/* Tab 1: Grounded Policy Dossier */}
        {activeTab === 'synthesis' && (
          <div className="space-y-6">
            {!insights && !isLoadingInsights && (
              <div className="text-center py-10 space-y-3">
                <Building2 className="w-10 h-10 text-cyan-400 mx-auto opacity-70" />
                <h4 className="text-base font-bold text-white">Click "Generate Grounded Policy Dossier" Above</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Our dual-grounding engine (gemini-3.5-flash with Google Maps tool and Google Search tool) will synthesize live municipal plans, demographic indicators, and satellite indices for {selectedHotspot?.region || currentNation.name}.
                </p>
                <button
                  onClick={fetchGroundedInsights}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md shadow-cyan-950/40 cursor-pointer"
                >
                  Synthesize Policy Dossier Now
                </button>
              </div>
            )}

            {isLoadingInsights && (
              <div className="py-16 text-center space-y-3">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
                <p className="text-sm font-semibold text-slate-200">
                  Grounding regional parameters across Google Maps & Search indices...
                </p>
                <p className="text-xs text-slate-500 font-mono">
                  Using gemini-3.5-flash (tools: googleSearch, googleMaps)
                </p>
              </div>
            )}

            {insights && (
              <div className="space-y-6">
                
                {/* Grounding Source Badges */}
                {insights.groundedSources?.length > 0 && (
                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
                      Live Grounded Citations & Sources (Google Search / Maps Data)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {insights.groundedSources.map((source: any, i: number) => (
                        <a
                          key={i}
                          href={source.uri}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-[11px] text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 px-2.5 py-1 rounded-md border border-cyan-500/20 transition"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {source.title || source.uri}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Analysis Body */}
                <div className="prose prose-invert prose-sm max-w-none bg-slate-950/60 p-5 rounded-xl border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                  {insights.analysis}
                </div>

                {/* Policymaker Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Critical Infrastructure Deficits Identified
                    </span>
                    <ul className="text-xs space-y-1.5 text-slate-300">
                      {insights.infrastructureGaps?.map((gap: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      High-Priority Recommended Projects
                    </span>
                    <ul className="text-xs space-y-1.5 text-slate-300">
                      {insights.recommendedProjects?.map((proj: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{proj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* Tab 2: NDB Multilateral Financing Facility */}
        {activeTab === 'ndb_pipeline' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
              <h4 className="text-sm font-bold text-white mb-1">New Development Bank (NDB) Project Pipeline Integration</h4>
              <p className="text-xs text-slate-300">
                VoxBRICS converts citizen requests into bankable project prospectuses complying with the NDB General Strategy for sustainable infrastructure and sovereign guarantees.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Financing Window</span>
                <p className="font-semibold text-white mt-1">Concessional Sovereign Loan</p>
                <p className="text-[11px] text-emerald-400 mt-0.5">25-year tenure @ SOFR + 0.65%</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Co-Financing Partner</span>
                <p className="font-semibold text-white mt-1">Asian Infrastructure Investment Bank (AIIB) / BNDES</p>
                <p className="text-[11px] text-cyan-400 mt-0.5">Blended 40% local currency tranche</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold">ESG Taxonomy Rating</span>
                <p className="font-semibold text-white mt-1">Tier-1 Climate Adaptation</p>
                <p className="text-[11px] text-purple-400 mt-0.5">SDG 6 (Clean Water) & SDG 11 (Cities)</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Capital Expenditure Matrix */}
        {activeTab === 'budget_split' && (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Phase</th>
                    <th className="p-3">CapEx Allocation (USD)</th>
                    <th className="p-3">Deliverable Milestone</th>
                    <th className="p-3">Beneficiary Footprint</th>
                    <th className="p-3">Procurement Mode</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr>
                    <td className="p-3 font-semibold text-white">Phase 1: Civil Works & Deep Intake</td>
                    <td className="p-3 text-emerald-400 font-mono">$18.5M</td>
                    <td className="p-3">Month 0 - 8: 14 High-yield borewells + Solar pump stations</td>
                    <td className="p-3">45,000 citizens</td>
                    <td className="p-3">Open BRICS E-Tender</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Phase 2: Trunk Pipelining & Filtration</td>
                    <td className="p-3 text-emerald-400 font-mono">$16.2M</td>
                    <td className="p-3">Month 9 - 18: 120km distribution trunk with IoT telemetry</td>
                    <td className="p-3">92,000 citizens</td>
                    <td className="p-3">Public-Private Partnership (PPP)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-white">Phase 3: Digital Public Metering</td>
                    <td className="p-3 text-emerald-400 font-mono">$7.8M</td>
                    <td className="p-3">Month 19 - 24: Smart meters & mobile citizen audit app</td>
                    <td className="p-3">140,000 citizens</td>
                    <td className="p-3">Open-Source Digital Public Good</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

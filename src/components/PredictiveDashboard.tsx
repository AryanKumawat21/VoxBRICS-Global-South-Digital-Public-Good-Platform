import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart2, 
  Sliders, 
  AlertCircle, 
  Leaf, 
  Droplet, 
  Users, 
  Zap, 
  Calendar,
  Building,
  ArrowRight
} from 'lucide-react';
import { BRICS_NATIONS } from '../data/mockData';
import { BRICSNationCode, PredictiveTrendPoint } from '../types';

interface PredictiveDashboardProps {
  selectedNation: BRICSNationCode;
}

export const PredictiveDashboard: React.FC<PredictiveDashboardProps> = ({ selectedNation }) => {
  const currentNation = BRICS_NATIONS[selectedNation];

  // Simulation parameters for long-term urban planning (2026 - 2035)
  const [climateStressModifier, setClimateStressModifier] = useState<number>(1.2); // 1.0x to 2.5x
  const [inwardMigrationPct, setInwardMigrationPct] = useState<number>(3.5); // % annual growth
  const [capitalInvestmentLevel, setCapitalInvestmentLevel] = useState<'low' | 'moderate' | 'aggressive'>('moderate');
  const [targetHorizonYear, setTargetHorizonYear] = useState<number>(2035);

  // Generate predictive multi-year trajectory
  const years = [2026, 2028, 2030, 2032, 2035];
  const capExMultiplier = capitalInvestmentLevel === 'aggressive' ? 0.6 : capitalInvestmentLevel === 'moderate' ? 0.9 : 1.3;

  const trajectoryData: PredictiveTrendPoint[] = years.map((year, idx) => {
    const elapsed = year - 2026;
    const baseDemand = 45 + (elapsed * inwardMigrationPct * 1.8);
    const climateImpact = 30 + (elapsed * climateStressModifier * 4.2);
    const demandIntensity = Math.min(100, Math.round(baseDemand * (climateStressModifier / 1.1) * (capitalInvestmentLevel === 'aggressive' ? 0.75 : 1.1)));
    const waterStress = Math.min(98, Math.round(38 + (elapsed * 4.5 * climateStressModifier)));
    const costPerBeneficiary = Math.round((140 + elapsed * 12) * capExMultiplier);

    return {
      year,
      demandIntensity,
      populationGrowthPct: +(inwardMigrationPct * (1 + elapsed * 0.08)).toFixed(1),
      climateRiskFactor: Math.min(100, Math.round(climateImpact)),
      waterStressLevel: waterStress,
      projectedCostPerBeneficiaryUsd: costPerBeneficiary
    };
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{currentNation.flag}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                Predictive Planning Horizon: 2026 – 2035
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Long-Term Urban & Infrastructure Forecasting Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Simulating demographic surges, compounding climate volatility, and capital expenditure amortization across BRICS metropolitan belts.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
            <BarChart2 className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Horizon Year</p>
              <p className="text-sm font-black text-purple-300">{targetHorizonYear} Master Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Modeling Parameters */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Sliders className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Simulated Urban Dynamics & Stress Levers
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lever 1: Climate Risk */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" /> Climate Vulnerability Factor
              </span>
              <span className="font-mono text-purple-400 font-bold">{climateStressModifier}x Baseline</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="2.5"
              step="0.1"
              value={climateStressModifier}
              onChange={(e) => setClimateStressModifier(parseFloat(e.target.value))}
              className="w-full accent-purple-500 h-1.5 bg-slate-950 rounded cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Accounts for extreme monsoon rainfall, heat island indices, and drought cycles.
            </p>
          </div>

          {/* Lever 2: Inward Migration */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400" /> Peri-Urban Inward Migration Rate
              </span>
              <span className="font-mono text-cyan-400 font-bold">{inwardMigrationPct}% / Year</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="6.0"
              step="0.5"
              value={inwardMigrationPct}
              onChange={(e) => setInwardMigrationPct(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 h-1.5 bg-slate-950 rounded cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Rural-to-urban population expansion requiring immediate municipal feeder extensions.
            </p>
          </div>

          {/* Lever 3: Sovereign Investment Mode */}
          <div className="space-y-2">
            <span className="text-slate-300 font-semibold text-xs flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Sovereign CapEx Acceleration
            </span>
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {[
                { id: 'low', label: 'Fiscal Austerity' },
                { id: 'moderate', label: 'NDB Blended' },
                { id: 'aggressive', label: 'Green Stimulus' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setCapitalInvestmentLevel(m.id as any)}
                  className={`text-[11px] py-1.5 rounded-lg border font-semibold transition cursor-pointer ${
                    capitalInvestmentLevel === m.id
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              Aggressive green stimulus amortizes long-term per-capita infrastructure cost by 40%.
            </p>
          </div>
        </div>
      </div>

      {/* Trajectory Data Visualization Chart Representation */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h4 className="text-base font-bold text-white tracking-tight">
              10-Year Infrastructure Deficit vs. Citizen Demand Trajectory
            </h4>
            <p className="text-xs text-slate-400">
              Dynamic multi-variable forecasting for {currentNation.name} urban corridors.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-purple-400">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Demand Intensity
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Water Stress Index
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Cost/Citizen ($)
            </span>
          </div>
        </div>

        {/* Predictive Trend Bar Columns */}
        <div className="grid grid-cols-5 gap-3 sm:gap-6 pt-4 items-end h-64">
          {trajectoryData.map((point) => (
            <div key={point.year} className="flex flex-col items-center h-full justify-end group">
              
              {/* Bars cluster */}
              <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-48">
                {/* Demand Bar */}
                <div
                  style={{ height: `${point.demandIntensity}%` }}
                  className="w-1/3 bg-gradient-to-t from-purple-800 to-purple-400 rounded-t-md transition-all duration-500 group-hover:brightness-125 relative"
                >
                  <span className="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-purple-300 font-bold">
                    {point.demandIntensity}%
                  </span>
                </div>

                {/* Water Stress Bar */}
                <div
                  style={{ height: `${point.waterStressLevel}%` }}
                  className="w-1/3 bg-gradient-to-t from-cyan-800 to-cyan-400 rounded-t-md transition-all duration-500 group-hover:brightness-125 relative"
                >
                  <span className="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-cyan-300 font-bold">
                    {point.waterStressLevel}%
                  </span>
                </div>

                {/* Cost Bar */}
                <div
                  style={{ height: `${(point.projectedCostPerBeneficiaryUsd / 200) * 100}%` }}
                  className="w-1/3 bg-gradient-to-t from-emerald-800 to-emerald-400 rounded-t-md transition-all duration-500 group-hover:brightness-125 relative"
                >
                  <span className="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-emerald-300 font-bold">
                    ${point.projectedCostPerBeneficiaryUsd}
                  </span>
                </div>
              </div>

              {/* Year label */}
              <span className="mt-3 text-xs font-mono font-bold text-slate-300">
                {point.year}
              </span>
              <span className="text-[10px] text-slate-500 hidden sm:block">
                +{point.populationGrowthPct}% pop
              </span>
            </div>
          ))}
        </div>

        {/* Forecasting Takeaways for Urban Planners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
            <span className="text-[10px] uppercase font-bold text-purple-400">Peak Demand Window</span>
            <p className="font-semibold text-white mt-1">2030 - 2032 Critical Inflection</p>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Without proactive decentralized storage, informal settlements reach 92% structural water deficit.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
            <span className="text-[10px] uppercase font-bold text-cyan-400">Groundwater Depletion Risk</span>
            <p className="font-semibold text-white mt-1">Aquifer Depletion at 2.4x Recharge</p>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Mandates state-sponsored rainwater harvesting and sponge-city detention channels.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
            <span className="text-[10px] uppercase font-bold text-emerald-400">CapEx Amortization</span>
            <p className="font-semibold text-white mt-1">High Return on Digital Telemetry</p>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Citizen-monitored pipe sensors reduce municipal non-revenue water loss by $14M annually.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

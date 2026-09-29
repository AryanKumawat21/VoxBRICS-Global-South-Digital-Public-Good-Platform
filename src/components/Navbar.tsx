import React from 'react';
import { 
  Building2, 
  Globe2, 
  BarChart3, 
  Mic2, 
  MapPin, 
  BrainCircuit, 
  Radio, 
  LogOut, 
  ShieldCheck, 
  ChevronDown,
  User as UserIcon,
  Sun,
  Moon,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';
import { BRICS_NATIONS } from '../data/mockData';
import { BRICSNationCode, AppTheme } from '../types';
import { loginWithGoogle, logoutUser, AppUserProfile } from '../services/firebase';

interface NavbarProps {
  currentTab: 'portal' | 'hotspots' | 'policymaker' | 'predictive' | 'live_voice' | 'chat' | 'dashboard';
  setCurrentTab: (tab: 'portal' | 'hotspots' | 'policymaker' | 'predictive' | 'live_voice' | 'chat' | 'dashboard') => void;
  selectedNation: BRICSNationCode;
  setSelectedNation: (nation: BRICSNationCode) => void;
  currentUser: AppUserProfile | null;
  onUserChange: (user: AppUserProfile | null) => void;
  theme: AppTheme;
  setTheme: (t: AppTheme) => void;
  userReportsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  selectedNation,
  setSelectedNation,
  currentUser,
  onUserChange,
  theme,
  setTheme,
  userReportsCount = 0
}) => {
  const currentNationData = BRICS_NATIONS[selectedNation];

  const handleAuth = async () => {
    if (currentUser) {
      await logoutUser();
      onUserChange(null);
    } else {
      try {
        const user = await loginWithGoogle();
        onUserChange(user);
      } catch (e) {
        console.error("Auth error:", e);
      }
    }
  };

  const foundingBrics = Object.values(BRICS_NATIONS).filter(n => n.isFoundingBRICS);
  const additionalBrics = Object.values(BRICS_NATIONS).filter(n => !n.isFoundingBRICS);

  const isLight = theme === 'light';
  const isBrics = theme === 'brics_gold';

  // Navigation styling dependent on active theme
  const navContainerClass = isLight 
    ? 'bg-white/90 border-b border-slate-200 text-slate-800'
    : isBrics 
    ? 'bg-slate-950/90 border-b border-amber-500/30 text-amber-50'
    : 'bg-slate-950/80 border-b border-slate-800 text-slate-100';

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl transition-colors duration-200 ${navContainerClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-2.5 cursor-pointer shrink-0" onClick={() => setCurrentTab('hotspots')}>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Globe2 className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`text-base font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  VoxBRICS
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                  DPG
                </span>
              </div>
              <p className={`text-[10px] hidden sm:block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Citizen Intelligence Platform
              </p>
            </div>
          </div>

          {/* BRICS Member State Switcher */}
          <div className="relative shrink-0">
            <select
              value={selectedNation}
              onChange={(e) => setSelectedNation(e.target.value as BRICSNationCode)}
              className={`appearance-none text-xs font-semibold rounded-lg pl-2.5 pr-7 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer shadow-sm transition ${
                isLight 
                  ? 'bg-slate-100 border border-slate-300 text-slate-800' 
                  : 'bg-slate-900 border border-slate-700/80 text-slate-200 hover:border-emerald-500/50'
              }`}
            >
              <optgroup label="⭐ Core Founding BRICS (B-R-I-C-S)" className="bg-slate-950 text-amber-400 font-bold">
                {foundingBrics.map((n) => (
                  <option key={n.code} value={n.code} className="bg-slate-900 text-slate-100 font-medium">
                    {n.flag} {n.name} ({n.code})
                  </option>
                ))}
              </optgroup>
              <optgroup label="🌐 Expanded BRICS+ Member States" className="bg-slate-950 text-cyan-400 font-bold">
                {additionalBrics.map((n) => (
                  <option key={n.code} value={n.code} className="bg-slate-900 text-slate-100 font-medium">
                    {n.flag} {n.name} ({n.code})
                  </option>
                ))}
              </optgroup>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: 'hotspots', label: 'Hotspots', icon: MapPin },
              { id: 'portal', label: 'Citizen Voice', icon: Mic2 },
              { id: 'policymaker', label: 'Policymaker', icon: Building2 },
              { id: 'predictive', label: 'Predictive 2035', icon: BarChart3 },
              { id: 'live_voice', label: 'Live API', icon: Radio },
              { id: 'chat', label: 'AI Planning Chat', icon: BrainCircuit },
              { id: 'dashboard', label: 'User Dashboard', icon: LayoutDashboard, badge: userReportsCount > 0 ? userReportsCount : undefined }
            ].map((item) => {
              const Icon = item.icon;
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id as any)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    active
                      ? isLight
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : isBrics
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500 text-slate-950 font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster: Theme Switcher & User Profile */}
          <div className="flex items-center gap-2">
            
            {/* 3-Theme Switcher (Dark / Light / BRICS Gold) */}
            <div className={`flex items-center p-0.5 rounded-lg border text-xs ${
              isLight ? 'bg-slate-100 border-slate-300' : 'bg-slate-900 border-slate-800'
            }`}>
              <button
                onClick={() => setTheme('dark')}
                title="Dark Theme (Default)"
                className={`p-1.5 rounded-md transition cursor-pointer ${
                  theme === 'dark' ? 'bg-slate-800 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('light')}
                title="Light Theme"
                className={`p-1.5 rounded-md transition cursor-pointer ${
                  theme === 'light' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('brics_gold')}
                title="BRICS Sovereign Gold Theme"
                className={`p-1.5 rounded-md transition cursor-pointer ${
                  theme === 'brics_gold' ? 'bg-amber-500/30 text-amber-300 shadow-sm font-bold' : 'text-slate-400 hover:text-amber-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* User Auth Section / Dashboard Trigger */}
            {currentUser ? (
              <div 
                onClick={() => setCurrentTab('dashboard')}
                className={`flex items-center gap-1.5 rounded-lg p-1 pr-2.5 border transition cursor-pointer ${
                  currentTab === 'dashboard'
                    ? 'border-emerald-500 ring-1 ring-emerald-500/40 bg-emerald-500/10'
                    : isLight
                    ? 'bg-slate-100 border-slate-300 hover:bg-slate-200'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt={currentUser.displayName || ''} className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-emerald-600/30 text-emerald-400 flex items-center justify-center text-[11px] font-bold">
                    {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                  </div>
                )}
                <div className="hidden sm:block text-left">
                  <p className={`text-[10px] font-bold truncate max-w-[85px] leading-tight ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                    {currentUser.displayName?.split(' ')[0] || 'Aryan'}
                  </p>
                  <p className="text-[9px] text-emerald-400 leading-tight">Dashboard</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAuth();
                  }}
                  title="Sign out"
                  className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800/40 rounded transition cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAuth}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow transition cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className={`lg:hidden flex items-center overflow-x-auto gap-2 py-2 border-t no-scrollbar ${
          isLight ? 'border-slate-200' : 'border-slate-800/80'
        }`}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'hotspots', label: 'Hotspots', icon: MapPin },
            { id: 'portal', label: 'Citizen Voice', icon: Mic2 },
            { id: 'policymaker', label: 'Policymaker', icon: Building2 },
            { id: 'predictive', label: 'Predictive 2035', icon: BarChart3 },
            { id: 'live_voice', label: 'Live API', icon: Radio },
            { id: 'chat', label: 'AI Chat', icon: BrainCircuit }
          ].map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id as any)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs whitespace-nowrap rounded-md font-medium transition ${
                  active
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : isLight
                    ? 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900'
                }`}
              >
                <Icon className="w-3 h-3" />
                {item.label}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};

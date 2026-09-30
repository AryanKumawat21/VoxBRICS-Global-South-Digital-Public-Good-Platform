import React, { useState } from 'react';
import { 
  User as UserIcon, 
  ShieldCheck, 
  MapPin, 
  Flame, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Award, 
  TrendingUp, 
  Sparkles, 
  ExternalLink, 
  PlusCircle, 
  Trash2,
  DollarSign,
  Activity,
  Layers,
  ChevronRight,
  Bookmark,
  Edit3,
  Save,
  X,
  Mail,
  Building,
  AlertCircle,
  Camera,
  Check,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { AppUserProfile, updateStoredUserProfile, isValidGoogleEmail, UserRole } from '../services/firebase';
import { CitizenRequest, HotspotCluster, AppTheme } from '../types';
import { BRICS_NATIONS } from '../data/mockData';

interface UserDashboardProps {
  currentUser: AppUserProfile | null;
  onProfileUpdated: (updated: AppUserProfile) => void;
  citizenRequests: CitizenRequest[];
  hotspots: HotspotCluster[];
  theme: AppTheme;
  onNavigateToTab: (tab: any) => void;
  onSelectHotspot: (hs: HotspotCluster) => void;
  onDeleteRequest: (requestId: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  currentUser,
  onProfileUpdated,
  citizenRequests,
  hotspots,
  theme,
  onNavigateToTab,
  onSelectHotspot,
  onDeleteRequest
}) => {
  const [selectedSubTab, setSelectedSubTab] = useState<'my_reports' | 'tracked_projects' | 'impact_analytics'>('my_reports');
  
  // Profile Edit Modal State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(currentUser?.displayName || '');
  const [editEmail, setEditEmail] = useState(currentUser?.email || '');
  const [editNation, setEditNation] = useState(currentUser?.nation || 'India');
  const [editDepartment, setEditDepartment] = useState(currentUser?.departmentOrCommunity || 'Resident Member');
  const [editBio, setEditBio] = useState(currentUser?.bio || '');
  const [editRole, setEditRole] = useState<UserRole>(currentUser?.role || 'citizen');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Sync state if currentUser changes
  React.useEffect(() => {
    if (currentUser) {
      setEditName(currentUser.displayName || '');
      setEditEmail(currentUser.email || '');
      setEditNation(currentUser.nation || 'India');
      setEditDepartment(currentUser.departmentOrCommunity || 'Resident Member');
      setEditBio(currentUser.bio || '');
      setEditRole(currentUser.role || 'citizen');
    }
  }, [currentUser]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim() || !editEmail.trim()) return;

    const emailIsVerified = isValidGoogleEmail(editEmail);
    const finalRole: UserRole = emailIsVerified ? editRole : 'citizen';

    const updated = updateStoredUserProfile({
      displayName: editName.trim(),
      email: editEmail.trim(),
      nation: editNation,
      departmentOrCommunity: editDepartment.trim(),
      bio: editBio.trim(),
      role: finalRole,
      isVerifiedGmail: emailIsVerified
    });

    if (updated) {
      onProfileUpdated(updated);
      setIsEditingProfile(false);
      setSaveSuccessMsg(true);
      setTimeout(() => setSaveSuccessMsg(false), 4000);
    }
  };

  const handleDelete = (req: CitizenRequest) => {
    const idToDelete = req.id || req.timestamp;
    if (window.confirm("Kya aap sach me is problem report ko remove/resolve karna chahte hain?")) {
      setDeletingId(idToDelete);
      onDeleteRequest(idToDelete);
      setTimeout(() => setDeletingId(null), 500);
    }
  };

  // Filter user's submitted reports
  const userSubmissions = citizenRequests.filter(req => {
    if (!currentUser) return false;
    if (req.userId && req.userId === currentUser.uid) return true;
    if (currentUser.displayName && req.citizenName && req.citizenName.toLowerCase() === currentUser.displayName.toLowerCase()) return true;
    return false;
  });

  const totalReportsCount = userSubmissions.length;
  const verifiedCount = userSubmissions.filter(r => r.verificationStatus?.isValidCivicIssue).length;
  const clusteredCount = userSubmissions.filter(r => r.status === 'hotspot_clustered' || r.status === 'policy_matched').length;
  const estimatedImpactedCitizens = userSubmissions.reduce((acc, r) => acc + (r.impactEstimateCitizens || 0), 0);

  const bookmarkedHotspotList = hotspots.filter(h => 
    currentUser?.bookmarkedHotspots?.includes(h.id) || h.id === 'hs-in-01' || h.id === 'hs-in-02'
  );

  const isLight = theme === 'light';
  const isBrics = theme === 'brics_gold';

  const cardBgClass = isLight 
    ? 'bg-white border-slate-200 shadow-sm text-slate-800'
    : isBrics 
    ? 'bg-amber-950/20 border-amber-500/30 text-amber-50 shadow-xl'
    : 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-xl';

  const subCardBgClass = isLight
    ? 'bg-slate-50 border-slate-200 text-slate-800'
    : isBrics
    ? 'bg-amber-950/40 border-amber-500/20 text-amber-100'
    : 'bg-slate-950/80 border-slate-800 text-slate-200';

  const isUserVerified = currentUser?.isVerifiedGmail || isValidGoogleEmail(currentUser?.email || '');
  const initialLetter = (currentUser?.displayName?.trim()[0] || currentUser?.email?.trim()[0] || 'U').toUpperCase();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Profile Saved Alert Notification */}
      {saveSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Profile updated successfully!
          </span>
          <button onClick={() => setSaveSuccessMsg(false)} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* User Header Profile Card */}
      <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
        isLight 
          ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-emerald-200' 
          : isBrics 
          ? 'bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 border-amber-500/40' 
          : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-700/60'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            
            {/* Clean Monogram Avatar with First Letter (No Stock Female Photo) */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-2xl font-black shadow-lg ring-2 ring-emerald-500/30 shrink-0 select-none">
              {initialLetter}
            </div>

            {/* Profile Info */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {currentUser?.displayName || 'Citizen Resident'}
                </h2>

                {isUserVerified ? (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {currentUser?.role === 'policymaker' ? 'Policymaker' : currentUser?.role === 'verified_delegate' ? 'Verified Delegate' : 'Verified Google Account'}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                    <UserIcon className="w-3 h-3" />
                    Citizen Member
                  </span>
                )}
              </div>

              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {currentUser?.email || 'No email attached'} • {currentUser?.departmentOrCommunity || 'Resident'} • <span className="font-semibold">{currentUser?.nation || 'India'}</span>
              </p>

              {currentUser?.bio && (
                <p className={`text-xs max-w-xl italic ${isLight ? 'text-slate-500' : 'text-slate-300'}`}>
                  "{currentUser.bio}"
                </p>
              )}

              <div className="flex items-center gap-3 pt-1 text-[11px] font-medium">
                <span className="flex items-center gap-1 text-emerald-500 font-bold">
                  <Award className="w-3.5 h-3.5" />
                  Civic Reputation: {currentUser?.civicReputationScore || 75}/100
                </span>
                <span className={isLight ? 'text-slate-400' : 'text-slate-600'}>•</span>
                <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>
                  Member since {currentUser?.joinedAt || 'September 2026'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Clean & Direct */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsEditingProfile(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 shadow transition cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={() => onNavigateToTab('portal')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>File Development Request</span>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal Dialog */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl relative space-y-4 ${cardBgClass}`}>
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-emerald-400" />
                <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Update Citizen Identity & Role
                </h3>
              </div>
              <button 
                onClick={() => setIsEditingProfile(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Full Name / Citizen Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className={`w-full text-xs rounded-xl px-3.5 py-2.5 border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className={`w-full text-xs rounded-xl px-3.5 py-2.5 border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                  }`}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Country
                  </label>
                  <select
                    value={editNation}
                    onChange={(e) => setEditNation(e.target.value)}
                    className={`w-full text-xs rounded-xl px-3 py-2.5 border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                    }`}
                  >
                    {Object.values(BRICS_NATIONS).map((n) => (
                      <option key={n.code} value={n.name} className="bg-slate-900 text-white">
                        {n.flag} {n.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Requested Role
                  </label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as UserRole)}
                    className={`w-full text-xs rounded-xl px-3 py-2.5 border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                    }`}
                  >
                    <option value="citizen" className="bg-slate-900 text-white">Citizen Member</option>
                    <option value="verified_delegate" className="bg-slate-900 text-white">Verified Delegate</option>
                    <option value="policymaker" className="bg-slate-900 text-white">Municipal Planner / Official</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Community Ward / Department / Organization
                </label>
                <input
                  type="text"
                  value={editDepartment}
                  onChange={(e) => setEditDepartment(e.target.value)}
                  placeholder="E.g., Resident Forum, Ward 12..."
                  className={`w-full text-xs rounded-xl px-3.5 py-2.5 border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Short Civic Bio
                </label>
                <textarea
                  rows={2}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Describe your civic priorities..."
                  className={`w-full text-xs rounded-xl p-3 border focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-700/60">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md transition cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Metrics Row: Activity & Telemetry Impact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 rounded-xl border ${cardBgClass}`}>
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">My Active Reports</span>
          <div className="flex items-baseline gap-2">
            <p className={`text-2xl font-black ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
              {totalReportsCount}
            </p>
            <span className="text-[11px] text-slate-400 font-medium">Logged</span>
          </div>
          <span className="text-[11px] text-emerald-500 font-medium mt-1 block">
            {verifiedCount} verified with Google Search
          </span>
        </div>

        <div className={`p-4 rounded-xl border ${cardBgClass}`}>
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Clustered Into Hotspots</span>
          <div className="flex items-baseline gap-2">
            <p className={`text-2xl font-black ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`}>
              {clusteredCount}
            </p>
            <span className="text-[11px] text-slate-400 font-medium">Hotspots</span>
          </div>
          <span className="text-[11px] text-cyan-500 font-medium mt-1 block">
            Integrated in CapEx models
          </span>
        </div>

        <div className={`p-4 rounded-xl border ${cardBgClass}`}>
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Beneficiary Footprint</span>
          <div className="flex items-baseline gap-2">
            <p className={`text-2xl font-black ${isLight ? 'text-purple-700' : 'text-purple-400'}`}>
              {estimatedImpactedCitizens > 0 ? estimatedImpactedCitizens.toLocaleString() : '0'}
            </p>
            <span className="text-[11px] text-slate-400 font-medium">Residents</span>
          </div>
          <span className="text-[11px] text-purple-500 font-medium mt-1 block">
            Across ward corridors
          </span>
        </div>

        <div className={`p-4 rounded-xl border ${cardBgClass}`}>
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Tracked CapEx Value</span>
          <div className="flex items-baseline gap-2">
            <p className={`text-2xl font-black ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>
              ${bookmarkedHotspotList.reduce((acc, h) => acc + h.estimatedBudgetUsdMillions, 0)}M
            </p>
            <span className="text-[11px] text-slate-400 font-medium">USD</span>
          </div>
          <span className="text-[11px] text-amber-500 font-medium mt-1 block">
            In proposed sovereign allocations
          </span>
        </div>
      </div>

      {/* Main Dashboard Panel with Subtabs */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${cardBgClass} space-y-6`}>
        
        {/* Subtabs Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-700/60 pb-3">
          {[
            { id: 'my_reports', label: `My Development Reports (${totalReportsCount})`, icon: FileText },
            { id: 'tracked_projects', label: `Tracked Hotspots (${bookmarkedHotspotList.length})`, icon: Bookmark },
            { id: 'impact_analytics', label: 'Civic Impact & Proofs', icon: Activity }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = selectedSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedSubTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  active
                    ? isLight
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : isBrics
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: User's Real Logged Development Requests */}
        {selectedSubTab === 'my_reports' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Your Logged Citizen Development Reports
                </h3>
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Jab aapki problem resolve ho jaye, toh aap ise 'Resolve / Remove' button se aasani se hata sakte hain.
                </p>
              </div>

              <button
                onClick={() => onNavigateToTab('portal')}
                className="text-xs text-emerald-500 hover:text-emerald-400 font-semibold flex items-center gap-1 cursor-pointer"
              >
                + New Request
              </button>
            </div>

            {userSubmissions.length === 0 ? (
              <div className={`p-8 text-center rounded-xl border ${subCardBgClass} space-y-3`}>
                <FileText className="w-10 h-10 text-emerald-400 mx-auto opacity-70" />
                <h4 className={`text-sm font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>
                  No Active Reports Under This Account
                </h4>
                <p className={`text-xs max-w-md mx-auto ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Aapki sabhi problems resolve/remove ho chuki hain, ya aapne abhi tak koi report darj nahi ki hai.
                </p>
                <button
                  onClick={() => onNavigateToTab('portal')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow cursor-pointer"
                >
                  File First Request
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-700/60">
                {userSubmissions.map((req, idx) => {
                  const reqKey = req.id || req.timestamp || idx;
                  const isDeleting = deletingId === (req.id || req.timestamp);

                  return (
                    <div key={reqKey} className="py-4 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-emerald-400 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {req.region}
                          </span>
                          <span className="text-slate-500">•</span>
                          <span className="uppercase text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                            {req.channel}
                          </span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            req.urgency === 'critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                            req.urgency === 'high' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}>
                            {req.urgency}
                          </span>
                          {req.verificationStatus?.isValidCivicIssue && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 flex items-center gap-1">
                              <CheckCircle2 className="w-2.5 h-2.5" /> Verified Civic Need
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-mono text-slate-400">
                            {new Date(req.timestamp).toLocaleDateString()}
                          </span>

                          {/* Problem Delete / Resolve Button */}
                          <button
                            onClick={() => handleDelete(req)}
                            disabled={isDeleting}
                            title="Resolve & Remove this problem from Dashboard and Maps"
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/50 transition cursor-pointer disabled:opacity-50"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>{isDeleting ? 'Removing...' : 'Resolve & Remove'}</span>
                          </button>
                        </div>
                      </div>

                      <p className={`text-xs italic ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                        "{req.originalText}"
                      </p>

                      {req.translatedEnglishText && req.translatedEnglishText !== req.originalText && (
                        <p className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                          <strong className="text-emerald-400">Translated: </strong>
                          {req.translatedEnglishText}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="text-slate-400">
                          Affected Citizens: <strong className={isLight ? 'text-slate-800' : 'text-white'}>~{req.impactEstimateCitizens?.toLocaleString()}</strong>
                        </span>
                        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                          Status: <strong className="uppercase">{req.status.replace(/_/g, ' ')}</strong>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Tracked NDB Hotspot Projects */}
        {selectedSubTab === 'tracked_projects' && (
          <div className="space-y-4">
            <div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Bookmarked Infrastructure Projects
              </h3>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Priority public works projects being tracked across your region.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedHotspotList.map((hs) => (
                <div
                  key={hs.id}
                  onClick={() => onSelectHotspot(hs)}
                  className={`p-4 rounded-xl border transition cursor-pointer hover:border-emerald-500/60 flex flex-col justify-between space-y-3 ${subCardBgClass}`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {hs.region}
                      </span>
                      <span className="font-mono text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded text-[10px]">
                        Deficit: {hs.urgencyScore}/100
                      </span>
                    </div>

                    <h4 className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {hs.title}
                    </h4>

                    <p className={`text-[11px] mt-1 line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {hs.recommendedAction}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-700/60">
                    <span className="text-slate-400">
                      CapEx: <strong className="text-emerald-400">${hs.estimatedBudgetUsdMillions}M USD</strong>
                    </span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                      Inspect Dossier <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Civic Impact Analytics */}
        {selectedSubTab === 'impact_analytics' && (
          <div className="space-y-4">
            <div>
              <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Civic Audit & Impact Telemetry
              </h3>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Verified telemetry metrics contributing to municipal priority scoring.
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${subCardBgClass} space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Voice Note Transcription Accuracy</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">98.4%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-[98.4%]" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-slate-300">Google Search Precedent Verification</span>
                <span className="text-xs font-bold text-cyan-400 font-mono">100% Grounded</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full w-full" />
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

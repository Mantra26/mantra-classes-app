import React from 'react';
import { useApp, ViewState } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Sparkles,
  BarChart3,
  BookmarkCheck,
  HelpCircle,
  CreditCard,
  ShieldCheck,
  X,
  Award,
  Video,
  Presentation,
  UserCheck,
  ClipboardCheck,
  Lock,
  LogOut,
  ArrowLeft,
  Trophy,
  Zap,
  Search
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const {
    view,
    setView,
    user,
    openPaymentModal,
    setSelectedSubjectId,
    currentRole,
    toggleRole,
    activeGrade,
    activeBoard,
    facultyTests,
    studentSubmissions,
    activeFacultyMember,
    pendingApprovalsCount,
    setIsStaffModalOpen,
    logoutStudent,
    returnToStudentPortal,
    setIsFlashcardsOpen,
    setIsBlitzOpen,
    setIsSearchOpen
  } = useApp();

  const mySubmissions = studentSubmissions.filter(s => s.studentId === user.id);
  const submittedIds = new Set(mySubmissions.map(s => s.testPaperId));
  const pendingCount = facultyTests.filter(
    t =>
      (t.targetGrade === 'all' || t.targetGrade === activeGrade) &&
      (!t.approvalStatus || t.approvalStatus === 'approved') &&
      !submittedIds.has(t.id)
  ).length;

  const studentNavItems: { id: ViewState; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'subjects', label: 'Subjects & Chapters', icon: <BookOpen className="w-5 h-5" /> },
    {
      id: 'assigned-tests',
      label: 'Assigned Tests & HW',
      icon: <ClipboardCheck className="w-5 h-5 text-emerald-600" />,
      badge: pendingCount > 0 ? `${pendingCount} Pending` : undefined
    },
    { id: 'test-series', label: 'Test Series', icon: <GraduationCap className="w-5 h-5" />, badge: 'Live' },
    { id: 'custom-builder', label: 'Custom Test Builder', icon: <Sparkles className="w-5 h-5 text-amber-500" />, badge: 'Smart' },
    { id: 'analytics', label: 'Scorecards & Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'bookmarks', label: 'Saved Tough Questions', icon: <BookmarkCheck className="w-5 h-5" /> },
    { id: 'doubts', label: 'Messages & Doubts Desk', icon: <HelpCircle className="w-5 h-5 text-indigo-600" />, badge: 'Direct' },
    { id: 'leaderboard', label: 'Scholar Leaderboard', icon: <Trophy className="w-5 h-5 text-amber-500" />, badge: 'Hall of Fame' },
  ];

  const facultyNavItems: { id: ViewState; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'faculty',
      label: 'Faculty Workspace',
      icon: <UserCheck className="w-5 h-5 text-purple-600" />,
      badge: activeFacultyMember?.name.split(' ')[0]
    },
    { id: 'assigned-tests', label: 'Student Test Papers', icon: <ClipboardCheck className="w-5 h-5 text-emerald-600" /> },
    { id: 'subjects', label: 'Curriculum & Notes', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'analytics', label: 'Student Performance', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'doubts', label: 'Student Messages & Doubts', icon: <HelpCircle className="w-5 h-5 text-indigo-500" /> }
  ];

  const adminNavItems: { id: ViewState; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'admin',
      label: 'Admin Studio Dashboard',
      icon: <ShieldCheck className="w-5 h-5 text-amber-500" />,
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} Action` : 'Director'
    },
    { id: 'assigned-tests', label: 'Student Tests & HW', icon: <ClipboardCheck className="w-5 h-5 text-emerald-600" /> },
    { id: 'subjects', label: 'Browse Chapter Materials', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'doubts', label: 'Student Messages & Doubts', icon: <HelpCircle className="w-5 h-5 text-indigo-500" /> },
    { id: 'test-series', label: 'Test Series Bank', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'analytics', label: 'Student Performance Data', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'leaderboard', label: 'Student Leaderboard', icon: <Trophy className="w-5 h-5 text-amber-500" /> },
  ];

  const activeNavItems =
    currentRole === 'admin'
      ? adminNavItems
      : currentRole === 'faculty'
      ? facultyNavItems
      : studentNavItems;

  const handleNavClick = (id: ViewState) => {
    if (id === 'subjects') {
      setSelectedSubjectId(null);
    }
    setView(id);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* App Branding */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-amber-500 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-slate-900 text-lg tracking-tight">Mantra Classes</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
                  {activeBoard} {activeGrade === '11' || activeGrade === '12' ? `Class ${activeGrade}` : `Grade ${activeGrade}`}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 flex items-center gap-1">
                By <span className="text-indigo-600 font-semibold">Uma Shukla</span>
                <Award className="w-3 h-3 text-amber-500 inline" />
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Identity Pill in Sidebar */}
        <div className="p-3 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center space-x-2 min-w-0">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                  currentRole === 'admin'
                    ? 'bg-amber-500 text-slate-950'
                    : currentRole === 'faculty'
                    ? 'bg-purple-600 text-white'
                    : 'bg-indigo-600 text-white'
                }`}
              >
                {currentRole === 'admin' ? 'US' : currentRole === 'faculty' ? (activeFacultyMember?.name?.slice(0, 2).toUpperCase() || 'FC') : (user.name ? user.name.slice(0, 2).toUpperCase() : 'ST')}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {currentRole === 'admin' ? 'Uma Shukla' : currentRole === 'faculty' ? (activeFacultyMember?.name || 'Faculty') : (user.name || 'Student')}
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {currentRole === 'admin' ? 'Educator (Admin)' : currentRole === 'faculty' ? 'Faculty Member' : (user.mobileNumber ? `+91 ${user.mobileNumber}` : user.grade)}
                </div>
              </div>
            </div>

            {currentRole !== 'student' && (
              <button
                onClick={returnToStudentPortal}
                className="text-[10px] font-bold px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors shrink-0"
                title="Return to Student View"
              >
                Exit
              </button>
            )}
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2 flex items-center justify-between">
            <span>
              {currentRole === 'admin'
                ? 'Admin Studio'
                : currentRole === 'faculty'
                ? 'Faculty Workspace'
                : `${activeBoard} ${activeGrade === '11' || activeGrade === '12' ? `Class ${activeGrade} Commerce` : `Grade ${activeGrade}`} Prep`}
            </span>
            {currentRole === 'admin' ? (
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                Director
              </span>
            ) : currentRole === 'faculty' ? (
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-800">
                Faculty
              </span>
            ) : null}
          </div>

          {activeNavItems.map(item => {
            const isActive = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={isActive ? 'text-white' : 'text-slate-500'}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-indigo-50 text-indigo-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Scholar Power Tools */}
        <div className="px-3 pt-2 pb-1 space-y-1.5 border-t border-slate-100">
          <div className="text-[10px] font-black uppercase text-slate-400 px-2 tracking-wider">
            Study Power Tools
          </div>
          <button
            onClick={() => {
              setIsBlitzOpen(true);
              if (isOpen) onClose();
            }}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-900 bg-amber-50/80 hover:bg-amber-100 border border-amber-200 transition-all text-left"
          >
            <Zap className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0" />
            <span>60s Daily Blitz Quiz</span>
          </button>
          <button
            onClick={() => {
              setIsFlashcardsOpen(true);
              if (isOpen) onClose();
            }}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold text-indigo-900 bg-indigo-50/80 hover:bg-indigo-100 border border-indigo-200 transition-all text-left"
          >
            <span className="text-sm shrink-0">🎴</span>
            <span>3D Flip Flashcards</span>
          </button>
          <button
            onClick={() => {
              setIsSearchOpen(true);
              if (isOpen) onClose();
            }}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all text-left"
          >
            <Search className="w-4 h-4 text-slate-500 shrink-0" />
            <span>AI Concept Solver</span>
          </button>
        </div>

        {/* Pro / UPI Upgrade Card */}
        <div className="p-3 m-3 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {user.isProMember ? 'PRO ACTIVE' : 'PRO PASS'}
            </span>
            <span className="text-[11px] text-slate-300">Grade 7 Pass</span>
          </div>

          <h4 className="font-bold text-sm text-white mb-1">
            {user.isProMember ? 'Mantra Pro Active 🎉' : 'ICSE Board 95%+ Pass'}
          </h4>
          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            {user.isProMember
              ? 'Full access to videos, PPT slides, and interactive concept labs.'
              : 'Direct UPI: 8707794159@ptyes with QR scanner unlock.'}
          </p>

          <button
            onClick={() => openPaymentModal()}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-[0.98]"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>{user.isProMember ? 'View Subscription' : 'Pay via UPI / Scanner'}</span>
          </button>
        </div>

        {/* Staff Portal Access Button in Sidebar */}
        {currentRole === 'student' && (
          <div className="p-3 border-t border-slate-100 bg-slate-50/70">
            <button
              onClick={() => setIsStaffModalOpen(true)}
              className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs transition-all shadow-xs"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Staff Portal (Admin / Faculty)</span>
            </button>
          </div>
        )}

        {/* Footer info */}
        <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-[11px]">ICSE Syllabus 2026-27</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">v2.5</span>
        </div>
      </aside>
    </>
  );
};

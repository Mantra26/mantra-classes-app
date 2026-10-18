import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  Flame,
  Coins,
  Crown,
  RotateCcw,
  Sparkles,
  QrCode,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  Award
} from 'lucide-react';

interface HeaderProps {
  onOpenSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSidebar }) => {
  const {
    user,
    view,
    setView,
    openPaymentModal,
    resetAppDemoData,
    currentRole,
    setCurrentRole,
    activeGrade,
    setActiveGrade,
    activeBoard,
    setActiveBoard,
    activeFacultyMember,
    pendingApprovalsCount
  } = useApp();

  const gradeLabel = (activeGrade === '11' || activeGrade === '12') ? `Class ${activeGrade} Commerce` : `Grade ${activeGrade}`;

  const getPageTitle = () => {
    if (view === 'admin') {
      return 'Director Uma Shukla Educator Studio';
    }
    if (view === 'faculty') {
      return `Faculty Workspace (${activeFacultyMember?.name || 'Faculty Member'})`;
    }
    switch (view) {
      case 'dashboard':
        return `Student Dashboard (${activeBoard} ${gradeLabel})`;
      case 'subjects':
        return `${activeBoard} ${gradeLabel} Subjects & Lessons`;
      case 'chapter-detail':
        return 'Chapter Study Guide & Visual Lab';
      case 'test-series':
        return `${activeBoard} ${gradeLabel} Test Series Portal`;
      case 'custom-builder':
        return 'Custom Multi-Chapter Test Builder';
      case 'assigned-tests':
        return `Assigned Faculty Tests & Homework (${gradeLabel})`;
      case 'analytics':
        return 'Performance Analytics & Scorecards';
      case 'bookmarks':
        return 'Saved Tough Questions & Notes';
      case 'doubts':
        return 'Doubt Desk with Uma Shukla';
      default:
        return 'Mantra Classes';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & breadcrumbs */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Open Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider hidden sm:block">
              {currentRole === 'admin'
                ? 'Mantra Classes \\ Admin Studio'
                : currentRole === 'faculty'
                ? `Mantra Classes \\ Faculty Portal (${activeFacultyMember?.name || 'Faculty'})`
                : `Mantra Classes \\ ${activeBoard} ${gradeLabel}`}
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Right: Board Switcher, Grade Switcher, Role Switcher, Stats, Pro badge, Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* BOARD SELECTOR DROPDOWN */}
          <div className="flex items-center space-x-1.5 bg-amber-50/90 hover:bg-amber-100/80 border border-amber-200/80 rounded-xl px-2.5 py-1.5 text-xs font-bold text-amber-900 shadow-xs transition-colors">
            <Award className="w-4 h-4 text-amber-600" />
            <select
              value={activeBoard}
              onChange={e => setActiveBoard(e.target.value as any)}
              className="bg-transparent font-extrabold text-amber-950 outline-none cursor-pointer pr-1 text-xs"
              aria-label="Select Education Board"
            >
              <option value="CBSE">CBSE (English Medium)</option>
              <option value="ICSE">ICSE (English Medium)</option>
            </select>
          </div>

          {/* GRADE SELECTOR DROPDOWN */}
          <div className="flex items-center space-x-1.5 bg-indigo-50/90 hover:bg-indigo-100/80 border border-indigo-200/80 rounded-xl px-2.5 py-1.5 text-xs font-bold text-indigo-900 shadow-xs transition-colors">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <select
              value={activeGrade}
              onChange={e => setActiveGrade(e.target.value as any)}
              className="bg-transparent font-extrabold text-indigo-950 outline-none cursor-pointer pr-1 text-xs"
              aria-label="Select Grade or Class"
            >
              <optgroup label="Senior Secondary (CBSE Commerce)">
                <option value="12">Class 12 (Commerce & Core)</option>
                <option value="11">Class 11 (Commerce & Core)</option>
              </optgroup>
              <optgroup label="Middle & Primary Grades">
                <option value="7">Grade 7</option>
                <option value="6">Grade 6</option>
                <option value="5">Grade 5</option>
                <option value="4">Grade 4</option>
                <option value="3">Grade 3</option>
                <option value="2">Grade 2</option>
              </optgroup>
            </select>
          </div>

          {/* 3-WAY ROLE SELECTOR DROPDOWN */}
          <div className="relative">
            <select
              value={currentRole}
              onChange={e => {
                const nextRole = e.target.value as any;
                setCurrentRole(nextRole);
                if (nextRole === 'admin') setView('admin');
                else if (nextRole === 'faculty') setView('faculty');
                else setView('dashboard');
              }}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl outline-none cursor-pointer border transition-all shadow-xs ${
                currentRole === 'admin'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold ring-2 ring-amber-400/40'
                  : currentRole === 'faculty'
                  ? 'bg-purple-600 text-white border-purple-500 font-extrabold ring-2 ring-purple-400/30'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
              }`}
            >
              <option value="student" className="bg-white text-slate-900">
                🎓 Student View ({user.name})
              </option>
              <option value="faculty" className="bg-white text-slate-900">
                🧑‍🏫 Faculty Portal ({activeFacultyMember?.name || 'Faculty'})
              </option>
              <option value="admin" className="bg-white text-slate-900">
                👩‍🏫 Admin: Uma Shukla (Director) {pendingApprovalsCount > 0 ? `(${pendingApprovalsCount} Action)` : ''}
              </option>
            </select>
          </div>

          {/* Student Stats (shown in student view) */}
          {currentRole === 'student' && (
            <>
              {/* Daily Streak */}
              <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-orange-50 border border-orange-200/60 text-orange-700 text-xs font-semibold shadow-xs">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>{user.streakDays}d Streak</span>
              </div>

              {/* Coins */}
              <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200/60 text-amber-800 text-xs font-semibold">
                <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{user.coins} Coins</span>
              </div>

              {/* Pro Status or UPI pay trigger */}
              {user.isProMember ? (
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-indigo-500/10 border border-amber-400/40 text-amber-900 text-xs font-bold">
                  <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="hidden sm:inline">PRO ACTIVE</span>
                </div>
              ) : (
                <button
                  onClick={() => openPaymentModal()}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>UPI Pay</span>
                </button>
              )}
            </>
          )}

          {/* Reset Demo button for tester */}
          <button
            onClick={() => {
              if (confirm('Reset demo data to initial realistic state?')) {
                resetAppDemoData();
              }
            }}
            title="Reset demo data"
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* User profile avatar chip */}
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
            <div className="relative">
              {currentRole === 'admin' ? (
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm ring-2 ring-amber-400">
                  US
                </div>
              ) : currentRole === 'faculty' ? (
                <img
                  src={
                    activeFacultyMember?.avatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                  }
                  alt={activeFacultyMember?.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-500/30"
                />
              ) : (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
              )}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight">
                {currentRole === 'admin'
                  ? 'Uma Shukla'
                  : currentRole === 'faculty'
                  ? activeFacultyMember?.name
                  : user.name}
              </div>
              <div className="text-[10px] text-slate-500">
                {currentRole === 'admin'
                  ? 'Director & Mentor'
                  : currentRole === 'faculty'
                  ? 'Faculty Member'
                  : user.grade}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

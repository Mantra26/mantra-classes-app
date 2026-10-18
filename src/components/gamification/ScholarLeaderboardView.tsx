import React from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_ACHIEVEMENT_BADGES, getScholarLevel } from '../../data/gamificationData';
import {
  Trophy,
  Flame,
  Award,
  Zap,
  Crown,
  ChevronRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const ScholarLeaderboardView: React.FC = () => {
  const {
    user,
    leaderboard,
    activeBoard,
    activeGrade,
    setView,
    setIsFlashcardsOpen,
    setIsBlitzOpen
  } = useApp();

  const userScholarLevel = getScholarLevel(user.xp || 680);
  const nextLevelXp = userScholarLevel.nextLevelXp;
  const xpProgress = Math.min(100, Math.round(((user.xp || 680) / nextLevelXp) * 100));
  const userUnlocked = user.unlockedBadgeIds || [];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/20 border border-white/20 text-white text-xs font-semibold mb-3">
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
              <span>Weekly Scholar Hall of Fame • All Boards & Grades</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
              Mantra Scholar Leaderboard 🏆
            </h1>
            <p className="text-sm text-amber-50 leading-relaxed mb-4">
              Compete with peer scholars across ICSE, CBSE, and IGCSE. Earn XP by taking chapter mocks, mastering flashcards, maintaining daily streaks, and answering 60s Daily Blitz quizzes.
            </p>

            {/* Current Student Tier Card */}
            <div className="bg-slate-950/70 border border-white/20 rounded-2xl p-4 max-w-md backdrop-blur-md">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="text-amber-300 flex items-center space-x-1.5">
                  <span>{userScholarLevel.badge}</span>
                  <span>{userScholarLevel.level}</span>
                </span>
                <span className="text-white font-mono">
                  {user.xp || 680} / {nextLevelXp} XP
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-emerald-400 h-2.5 rounded-full transition-all duration-1000"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick XP Earning Action Buttons */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              onClick={() => setIsBlitzOpen(true)}
              className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-lg transition-all active:scale-95"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Play 60s Daily Blitz (+50 XP)</span>
            </button>

            <button
              onClick={() => setIsFlashcardsOpen(true)}
              className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>Study 3D Flashcards (+25 XP)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Leaderboard Standings (Left) vs Achievement Badges (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Weekly Standings Table (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">Weekly Top 10 Scholars</h2>
              <p className="text-xs text-slate-500">Live rankings reset every Sunday midnight</p>
            </div>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-200">
              Live Standings
            </span>
          </div>

          <div className="space-y-2.5">
            {leaderboard.slice(0, 10).map((scholar, idx) => {
              const isCurrentUser = scholar.id === user.id || scholar.name === user.name;
              let rankBadge = `#${idx + 1}`;
              let rankStyle = 'bg-slate-100 text-slate-700';

              if (idx === 0) {
                rankBadge = '🥇';
                rankStyle = 'bg-amber-100 text-amber-800 ring-2 ring-amber-400';
              } else if (idx === 1) {
                rankBadge = '🥈';
                rankStyle = 'bg-slate-200 text-slate-800';
              } else if (idx === 2) {
                rankBadge = '🥉';
                rankStyle = 'bg-orange-100 text-orange-800';
              }

              return (
                <div
                  key={scholar.id}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    isCurrentUser
                      ? 'bg-gradient-to-r from-indigo-50 via-white to-amber-50/40 border-2 border-indigo-500 shadow-md ring-2 ring-indigo-400/20'
                      : 'bg-white border-slate-200/70 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <span className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 ${rankStyle}`}>
                      {rankBadge}
                    </span>

                    <img
                      src={scholar.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                      alt={scholar.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200 shrink-0"
                    />

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-extrabold text-slate-900">{scholar.name}</span>
                        {isCurrentUser && (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                            You
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        {scholar.board} Grade {scholar.grade} • {scholar.badgesCount || 3} Badges
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Streak */}
                    <div className="hidden sm:flex items-center space-x-1 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-xl">
                      <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                      <span>{scholar.streakDays}d</span>
                    </div>

                    {/* XP Score */}
                    <div className="text-right">
                      <div className="text-sm sm:text-base font-black text-indigo-900 flex items-center justify-end space-x-1">
                        <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
                        <span>{scholar.xp} XP</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Scholar Badges & Level Progress */}
        <div className="space-y-6">
          {/* 8 Achievement Badges */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Achievement Badges</h3>
                <p className="text-xs text-slate-500">
                  {userUnlocked.length} of {ALL_ACHIEVEMENT_BADGES.length} Unlocked
                </p>
              </div>
              <Award className="w-5 h-5 text-amber-500" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {ALL_ACHIEVEMENT_BADGES.map(badge => {
                const isUnlocked = userUnlocked.includes(badge.id);

                return (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isUnlocked
                        ? 'bg-amber-50/60 border-amber-300 ring-1 ring-amber-400/40'
                        : 'bg-slate-50 border-slate-200 opacity-50 grayscale'
                    }`}
                  >
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="text-xs font-black text-slate-900 leading-tight">
                      {badge.name}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                      {badge.description}
                    </div>
                    <div className="mt-1.5">
                      {isUnlocked ? (
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block">
                          Unlocked
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-slate-400 flex items-center justify-center space-x-0.5">
                          <Lock className="w-2.5 h-2.5" />
                          <span>Locked</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How to Earn XP Card */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-3xl p-6 space-y-3">
            <h3 className="text-sm font-bold flex items-center space-x-2 text-amber-300">
              <Sparkles className="w-4 h-4" />
              <span>How to Earn More Scholar XP</span>
            </h3>
            <ul className="space-y-2 text-xs text-indigo-100">
              <li className="flex items-center justify-between">
                <span>Complete any Mock Test</span>
                <b className="text-amber-400 font-mono">+50 XP</b>
              </li>
              <li className="flex items-center justify-between">
                <span>60s Daily Blitz Challenge</span>
                <b className="text-amber-400 font-mono">+50 XP</b>
              </li>
              <li className="flex items-center justify-between">
                <span>Master 5 3D Flashcards</span>
                <b className="text-amber-400 font-mono">+25 XP</b>
              </li>
              <li className="flex items-center justify-between">
                <span>Daily Study Streak Check-in</span>
                <b className="text-amber-400 font-mono">+15 XP</b>
              </li>
              <li className="flex items-center justify-between">
                <span>100% Score on Custom Test</span>
                <b className="text-amber-400 font-mono">+100 XP</b>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

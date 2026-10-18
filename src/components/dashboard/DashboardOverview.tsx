import React from 'react';
import { useApp } from '../../context/AppContext';
import { ICSE_SUBJECTS, ICSE_CHAPTERS } from '../../data/icseCurriculum';
import { WeakAreasWidget } from './WeakAreasWidget';
import {
  Trophy,
  Target,
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  FileSpreadsheet,
  PlayCircle,
  FlaskConical,
  GraduationCap,
  Award,
  Lock,
  AlertTriangle,
  MessageSquare
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const {
    user,
    testAttempts,
    openScorecardForAttempt,
    setView,
    setSelectedSubjectId,
    startSubjectTest,
    goToChapterDetail,
    setActiveLabType,
    setActiveVideo,
    activeGrade,
    activeBoard,
    filteredSubjects,
    openPaymentModal,
    currentRole
  } = useApp();

  const isAuthorized = currentRole === 'admin' || user.isProMember || user.paymentStatus === 'authorized';
  const hasUsedDemo = currentRole !== 'admin' && (user.demoMockTestTaken || (testAttempts && testAttempts.length >= 1));

  return (
    <div className="space-y-6">
      {/* Student Demo Mock Test & Payment Status Banner */}
      {user.paymentStatus === 'pending_authorization' ? (
        <div className="rounded-3xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border-2 border-amber-400/50 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-xs">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-950">
                  Payment Awaiting Director Authorization
                </span>
                <span className="text-xs text-amber-900 font-mono font-bold">UTR: {user.pendingUtr}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Your Fee for {user.pendingPlanName || 'Course Module'} (₹{user.pendingAmount || 499}) is Under Review
              </h3>
              <p className="text-xs text-slate-600">
                Director Uma Shukla is verifying your transaction in the Admin Desk. Once approved, all tests in this module will be unlocked automatically.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/918707794159?text=${encodeURIComponent(
              `Hello Director Uma Shukla,\nMy payment for ${user.pendingPlanName || 'Course Module'} (UTR: ${user.pendingUtr}) is pending authorization.\nStudent: ${user.name}\nMobile: ${user.mobileNumber || ''}\nPlease authorize my account.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center space-x-1.5"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Director</span>
          </a>
        </div>
      ) : user.paymentStatus === 'rejected' ? (
        <div className="rounded-3xl bg-rose-50 border-2 border-rose-300 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-rose-200 text-rose-900">
                Verification Update
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                UTR Verification Incomplete
              </h3>
              <p className="text-xs text-slate-600">
                Director Uma Shukla could not match your previous UTR with the bank statement. Please submit a valid 12-digit UTR.
              </p>
            </div>
          </div>

          <button
            onClick={() => openPaymentModal()}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-all"
          >
            Re-submit UTR / Pay Fee
          </button>
        </div>
      ) : !hasUsedDemo && !isAuthorized ? (
        <div className="rounded-3xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-transparent border-2 border-indigo-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black shrink-0 shadow-sm">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  New Student Welcome Offer
                </span>
                <span className="text-xs font-bold text-indigo-700">1 Free Demo Mock Test Available</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Take Your Free Diagnostic Benchmark Mock Test
              </h3>
              <p className="text-xs text-slate-600">
                Experience Mantra Classes' {activeBoard} Grade {activeGrade} test engine with marking schemes and AI Weakness Radar before enrolling.
              </p>
            </div>
          </div>

          <button
            onClick={() => setView('test-series')}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center space-x-1.5"
          >
            <span>Start 1 Free Demo Test</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : hasUsedDemo && !isAuthorized ? (
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-800/60 p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Free Demo Mock Test Completed
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                Unlock Full Course Modules & Tests
              </h3>
              <p className="text-xs text-indigo-200">
                You have completed your 1 free demo mock test. To unlock chapter tests, full papers, and custom mocks, choose a module and submit payment.
              </p>
            </div>
          </div>

          <button
            onClick={() => openPaymentModal()}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all active:scale-95 flex items-center space-x-1.5"
          >
            <span>Choose Module & Pay via UPI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-emerald-900 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><b>Mantra Classes PRO Active:</b> Authorized by Director Uma Shukla for {user.authorizedModules?.join(', ') || 'Master Pass'}</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
            Full Access
          </span>
        </div>
      )}

      {/* Hero Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Mantra Classes \ Mentorship by Uma Shukla</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
              Namaste, {user.name}! 🎯
            </h2>
            <p className="text-sm text-indigo-100 leading-relaxed mb-4">
              Welcome to your dedicated {activeGrade === '11' || activeGrade === '12' ? `Class ${activeGrade} Commerce (${activeBoard})` : `${activeBoard} Grade ${activeGrade}`} Test Series & Learning Studio. Master {activeGrade === '11' || activeGrade === '12' ? 'Accountancy, Business Studies, Economics, and Computer Applications' : 'Computer Applications, Mathematics, Sciences and Humanities'}, solve assigned tests, and inspect detailed scorecards.
            </p>

            {/* Target Percentage Progress */}
            <div className="bg-indigo-950/60 border border-indigo-700/60 rounded-2xl p-3.5 max-w-md">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="text-slate-300">Target Score Progress:</span>
                <span className="text-amber-300 font-bold">
                  {user.averageScorePercentage}% / Goal {user.targetPercentage}%
                </span>
              </div>
              <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-emerald-400 h-2.5 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, (user.averageScorePercentage / user.targetPercentage) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick CTA Actions Card */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3">
            <button
              onClick={() => setView('custom-builder')}
              className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Build Custom Mock Test</span>
            </button>

            <button
              onClick={() => setView('test-series')}
              className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all active:scale-95"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Browse Subject Test Series</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{user.totalTestsTaken}</div>
            <div className="text-xs font-semibold text-slate-500">Mocks Completed</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{user.averageScorePercentage}%</div>
            <div className="text-xs font-semibold text-slate-500">Average Percentage</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">4 Days</div>
            <div className="text-xs font-semibold text-slate-500">Study Streak 🔥</div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{user.coins}</div>
            <div className="text-xs font-semibold text-slate-500">Mantra Coins 🪙</div>
          </div>
        </div>
      </div>

      {/* Topics & Questions Where You Should Work Hard (Diagnostics) */}
      <WeakAreasWidget />

      {/* Main Two Columns: Recent Scorecards & Featured Subjects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Test Scorecards (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Recent Test Scorecards</h3>
              <p className="text-xs text-slate-500">Click any attempt to inspect question analysis & solution steps</p>
            </div>
            <button
              onClick={() => setView('analytics')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>View All Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {testAttempts.map(attempt => {
              const isHigh = attempt.percentage >= 80;
              const isMed = attempt.percentage >= 60 && attempt.percentage < 80;
              return (
                <div
                  key={attempt.id}
                  onClick={() => openScorecardForAttempt(attempt)}
                  className="bg-white p-4 rounded-2xl border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {attempt.testType}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {Math.round(attempt.totalTimeSpentSeconds / 60)} mins
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm sm:text-base">
                      {attempt.testTitle}
                    </h4>

                    <div className="text-xs text-slate-500 flex items-center gap-3">
                      <span>Score: <b>{attempt.scoredMarks}/{attempt.totalMarks}</b></span>
                      <span>Accuracy: <b>{attempt.accuracy}%</b></span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600 font-medium">{attempt.grade}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div
                      className={`text-lg sm:text-xl font-black px-3 py-1 rounded-xl text-center ${
                        isHigh
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : isMed
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {attempt.percentage}%
                    </div>

                    <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-indigo-50 text-slate-400 group-hover:text-indigo-600 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Visual Labs & Video Presentations Preview (1 col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg">Interactive Visual Labs</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Grade 7 Special
            </span>
          </div>

          <div className="space-y-3">
            {/* Lab 1: Light Reflection */}
            <div
              onClick={() => setActiveLabType('light_reflection')}
              className="p-4 rounded-2xl bg-gradient-to-br from-sky-500/10 via-white to-sky-500/5 border border-sky-200 hover:border-sky-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-sky-700 uppercase">Physics Optics Lab</div>
                  <h4 className="font-bold text-slate-900 group-hover:text-sky-700 text-sm">
                    Reflection & Plane Mirror Tracer
                  </h4>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-2">
                Interact with incident angles, calculate glancing angles and observe virtual image rays in real time.
              </p>
              <div className="text-xs font-bold text-sky-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Launch Ray Diagram Lab</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            {/* Lab 2: Plant vs Animal Cell */}
            <div
              onClick={() => setActiveLabType('cell_organelles')}
              className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-white to-emerald-500/5 border border-emerald-200 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-emerald-700 uppercase">Biology Anatomy Lab</div>
                  <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 text-sm">
                    Plant & Animal Cell Organelles
                  </h4>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-2">
                Click chloroplasts, cell walls, vacuoles, and mitochondria to see ICSE board exam definitions.
              </p>
              <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Launch Cell Diagram Lab</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>

            {/* Lab 3: Fraction & Decimal Visualizer */}
            <div
              onClick={() => setActiveLabType('fraction_visualizer')}
              className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 border border-amber-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-amber-700 uppercase">Mathematics Visualizer</div>
                  <h4 className="font-bold text-slate-900 group-hover:text-amber-700 text-sm">
                    Fraction & Decimal Pizza/Bar Lab
                  </h4>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-2">
                Slide numerator and denominator to dynamically visualize proper, improper fractions and percentages.
              </p>
              <div className="text-xs font-bold text-amber-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Launch Math Visualizer</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grade 7 ICSE Subjects Explorer */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">
              {activeGrade === '11' || activeGrade === '12' ? `Class ${activeGrade} Commerce Curriculum (${activeBoard})` : `Grade ${activeGrade} ${activeBoard} English Medium Curriculum`}
            </h3>
            <p className="text-xs text-slate-500">Pick any subject to study detailed chapter notes or take dedicated tests</p>
          </div>
          <button
            onClick={() => setView('subjects')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>View All Subjects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSubjects.slice(0, 4).map(sub => {
            return (
              <div
                key={sub.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {sub.code}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {sub.chapterCount} Chapters
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-base mb-1">{sub.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {sub.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setSelectedSubjectId(sub.id);
                      setView('subjects');
                    }}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold text-center transition-colors"
                  >
                    View Chapters
                  </button>
                  <button
                    onClick={() => startSubjectTest(sub.id)}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold text-center transition-colors shadow-xs"
                  >
                    Take Mock
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

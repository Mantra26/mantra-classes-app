import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ICSE_SUBJECTS, ICSE_CHAPTERS } from '../../data/icseCurriculum';
import { ICSE_QUESTION_BANK } from '../../data/questionBank';
import { SubjectId } from '../../types';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Clock,
  HelpCircle,
  ArrowRight,
  Filter,
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';

export const TestSeriesExplorer: React.FC = () => {
  const {
    startSubjectTest,
    startChapterTest,
    setView,
    user,
    testAttempts,
    openPaymentModal,
    setSelectedSubjectId,
    activeGrade,
    activeBoard,
    filteredSubjects,
    filteredChapters: chaptersByGrade
  } = useApp();

  const isAuthorized = user.isProMember || user.paymentStatus === 'authorized';
  const hasUsedDemo = user.demoMockTestTaken || (testAttempts && testAttempts.length >= 1);

  const [activeTab, setActiveTab] = useState<'subject-wise' | 'lesson-wise'>('subject-wise');
  const [filterSubjectId, setFilterSubjectId] = useState<SubjectId | 'all'>('all');

  // Filtered chapters
  const filteredChapters = filterSubjectId === 'all'
    ? chaptersByGrade
    : chaptersByGrade.filter(c => c.subjectId === filterSubjectId);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              {activeBoard} {activeGrade === '11' || activeGrade === '12' ? `Class ${activeGrade} Commerce` : `Grade ${activeGrade}`} Test Series
            </span>
            <span className="text-xs text-slate-400">Curated by Uma Shukla</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {activeGrade === '11' || activeGrade === '12' ? `Class ${activeGrade} Commerce (${activeBoard})` : `Grade ${activeGrade} ${activeBoard}`} Examination Series
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1">
            Choose whole subject mock papers or drill down into specific chapter tests. Every test features average and tough {activeBoard} questions with step-by-step marking schemes.
          </p>
        </div>

        <button
          onClick={() => setView('custom-builder')}
          className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 whitespace-nowrap self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 fill-slate-950" />
          <span>Build Custom Multi-Chapter Test</span>
        </button>
      </div>

      {/* Tabs Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('subject-wise')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'subject-wise'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Subject-wise Mocks ({filteredSubjects.length} Papers)</span>
          </button>

          <button
            onClick={() => setActiveTab('lesson-wise')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'lesson-wise'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Lesson-wise / Chapter Tests ({chaptersByGrade.length} Chapters)</span>
          </button>
        </div>

        {/* Subject Filter Pill for Lesson-wise */}
        {activeTab === 'lesson-wise' && (
          <div className="flex items-center space-x-1 overflow-x-auto py-1">
            <button
              onClick={() => setFilterSubjectId('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterSubjectId === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Subjects
            </button>
            {filteredSubjects.map(s => (
              <button
                key={s.id}
                onClick={() => setFilterSubjectId(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterSubjectId === s.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* TAB 1: SUBJECT-WISE TESTS */}
      {activeTab === 'subject-wise' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSubjects.map(subject => {
            const questionCount = ICSE_QUESTION_BANK.filter(q => q.subjectId === subject.id).length;
            const chapters = chaptersByGrade.filter(c => c.subjectId === subject.id);

            return (
              <div
                key={subject.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-lg hover:border-indigo-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {subject.code}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      30 Mins Mock
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1.5">
                    {subject.name} Comprehensive Mock
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                    {subject.description}
                  </p>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs text-slate-600 mb-4">
                    <div className="flex items-center justify-between">
                      <span>Curriculum Chapters:</span>
                      <span className="font-bold text-slate-900">{chapters.length} Units</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Available Questions:</span>
                      <span className="font-bold text-indigo-600">{questionCount} Handpicked</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Question Mix:</span>
                      <span className="font-semibold text-slate-700">MCQ, T/F, Blanks, Short/Long</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  {hasUsedDemo && !isAuthorized ? (
                    <button
                      onClick={() => {
                        if (user.paymentStatus === 'pending_authorization') {
                          alert(`Your payment of ₹${user.pendingAmount || 499} for ${user.pendingPlanName || 'Course Module'} is currently pending authorization by Director Uma Shukla.\n\nOnce authorized, all tests in this module will be unlocked.`);
                        } else {
                          openPaymentModal();
                        }
                      }}
                      className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs sm:text-sm transition-all"
                    >
                      <Lock className="w-4 h-4 text-amber-600" />
                      <span>{user.paymentStatus === 'pending_authorization' ? '⏳ Awaiting Director Authorization' : '🔒 Unlock Module with Pro Pass'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => startSubjectTest(subject.id)}
                      className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-100 transition-all active:scale-95"
                    >
                      <span>{!hasUsedDemo && !isAuthorized ? `✨ Start Free Demo Test (${subject.name})` : `Start Full ${subject.name} Test`}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: LESSON-WISE TESTS */}
      {activeTab === 'lesson-wise' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChapters.map(chapter => {
            const questions = ICSE_QUESTION_BANK.filter(q => q.chapterId === chapter.id);
            const subject = filteredSubjects.find(s => s.id === chapter.subjectId) || ICSE_SUBJECTS.find(s => s.id === chapter.subjectId);
            const isChapterLocked = (hasUsedDemo && !isAuthorized) || (chapter.isLocked && !isAuthorized);

            return (
              <div
                key={chapter.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {subject?.name} • Ch {chapter.chapterNumber}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">15 Mins</span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-base mb-1.5">
                    {chapter.title}
                  </h4>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">
                    {chapter.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {chapter.keyConcepts.slice(0, 2).map((concept, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 line-clamp-1"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  {isChapterLocked ? (
                    <button
                      onClick={() => {
                        if (user.paymentStatus === 'pending_authorization') {
                          alert(`Your payment of ₹${user.pendingAmount || 499} for ${user.pendingPlanName || 'Course Module'} is currently pending authorization by Director Uma Shukla.`);
                        } else {
                          openPaymentModal();
                        }
                      }}
                      className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs transition-colors"
                    >
                      <Lock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{user.paymentStatus === 'pending_authorization' ? '⏳ Awaiting Director Auth' : 'Unlock with Pro Pass'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => startChapterTest(chapter.id)}
                      className="w-full flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs transition-all active:scale-95"
                    >
                      <span>{!hasUsedDemo && !isAuthorized ? '✨ Take Free Demo Test' : 'Take Chapter Diagnostic'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

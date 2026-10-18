import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ICSE_QUESTION_BANK } from '../../data/questionBank';
import {
  X,
  Trophy,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
  Bookmark,
  Share2,
  Clock,
  Target,
  ArrowRight,
  BookOpen,
  Award,
  HelpCircle
} from 'lucide-react';

export const ScorecardModal: React.FC = () => {
  const {
    activeScorecard,
    closeScorecard,
    startRemedialTest,
    goToChapterDetail,
    bookmarks,
    toggleBookmark
  } = useApp();

  const [filterMode, setFilterMode] = useState<'all' | 'wrong' | 'correct'>('all');

  if (!activeScorecard) return null;

  const attempt = activeScorecard;
  const isDistinction = attempt.percentage >= 80;
  const isPass = attempt.passed;

  // Retrieve questions
  const questionsInTest = ICSE_QUESTION_BANK.filter(q => attempt.questionIds.includes(q.id));

  // Filter questions for review
  const filteredQuestions = questionsInTest.filter(q => {
    const userAns = attempt.answers[q.id];
    if (filterMode === 'correct') return userAns?.isCorrect === true;
    if (filterMode === 'wrong') return userAns?.isCorrect === false;
    return true;
  });

  const correctCount = Object.values(attempt.answers).filter(a => a.isCorrect).length;
  const wrongCount = questionsInTest.length - correctCount;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-auto overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-5 sm:p-6 relative flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-500/40 text-amber-300 border border-indigo-400/30">
                Official Scorecard
              </span>
              <span className="text-xs text-indigo-200">Mantra Classes by Uma Shukla</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white">{attempt.testTitle}</h2>
          </div>

          <button
            onClick={closeScorecard}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
          {/* Main Scorecard Summary Hero */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-200/90 text-center">
            {/* Percentage & Scored Marks */}
            <div className="md:col-span-2 flex flex-col justify-center items-center p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 mb-1">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Overall Performance</span>
              </div>

              <div
                className={`text-4xl sm:text-5xl font-black tracking-tight mb-1 ${
                  isDistinction
                    ? 'text-emerald-600'
                    : isPass
                    ? 'text-indigo-600'
                    : 'text-rose-600'
                }`}
              >
                {attempt.percentage}%
              </div>

              <div className="text-sm font-bold text-slate-800">
                Score: <span className="text-indigo-600">{attempt.scoredMarks}</span> / {attempt.totalMarks} Marks
              </div>

              <div className="mt-2 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                <Award className="w-3.5 h-3.5" />
                <span>{attempt.grade}</span>
              </div>
            </div>

            {/* Accuracy & Time Stats */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-left">
                <div className="text-xs text-slate-500 font-semibold mb-0.5">Accuracy Rate</div>
                <div className="text-xl font-black text-slate-900">{attempt.accuracy}%</div>
                <div className="text-[11px] text-emerald-600 font-medium">
                  {correctCount} Correct of {questionsInTest.length} Questions
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-left">
                <div className="text-xs text-slate-500 font-semibold mb-0.5">Time Spent</div>
                <div className="text-xl font-black text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span>{Math.round(attempt.totalTimeSpentSeconds / 60)}m {attempt.totalTimeSpentSeconds % 60}s</span>
                </div>
                <div className="text-[11px] text-slate-400">Allotted: {attempt.durationMinutes} mins</div>
              </div>
            </div>

            {/* Result Verdict & Advice */}
            <div className="flex flex-col justify-between p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-indigo-50/50 border border-amber-200/80 text-left">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1">
                  Mentor Evaluation
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  {isDistinction
                    ? 'Superb ICSE Preparation! 🌟'
                    : isPass
                    ? 'Solid Foundation, Target Higher! 📈'
                    : 'Requires Chapter Revision! 📚'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isDistinction
                    ? 'You displayed thorough understanding of key terms and calculations.'
                    : 'Review the flagged missed concepts below to improve accuracy and speed.'}
                </p>
              </div>

              {attempt.weakAreas && attempt.weakAreas.length > 0 && (
                <button
                  onClick={() => startRemedialTest(attempt.id)}
                  className="mt-3 w-full flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs transition-all active:scale-95"
                >
                  <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                  <span>Start Remedial Quiz</span>
                </button>
              )}
            </div>
          </div>

          {/* DIAGNOSTIC ANALYSIS: "Where You Should Work Hard" Section */}
          {attempt.weakAreas && attempt.weakAreas.length > 0 && (
            <div className="p-5 rounded-3xl bg-amber-50/50 border-2 border-amber-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Where You Should Work Hard to Increase Your Score
                    </h3>
                    <p className="text-xs text-slate-500">
                      Pinpointed concept gaps and recommended study steps based on this test
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => startRemedialTest(attempt.id)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs"
                >
                  <Zap className="w-3.5 h-3.5 fill-slate-950" />
                  <span>1-Click Practice Missed Topics</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {attempt.weakAreas.map((w, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                          {w.chapterTitle}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-700">
                          {w.difficultySuggested}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        <span>{w.topic}</span>
                      </h4>

                      <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                        <span className="font-semibold text-slate-700">Identified gap: </span>
                        {w.missedConcepts.join(' ')}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-amber-800 font-semibold">
                        Action: {w.recommendedAction}
                      </span>
                      <button
                        onClick={() => {
                          closeScorecard();
                          goToChapterDetail(w.chapterId);
                        }}
                        className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 ml-2 flex-shrink-0"
                      >
                        <span>Study</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Granular Question-by-Question Review */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Detailed Question-by-Question Analysis</h3>
                <p className="text-xs text-slate-500">
                  Compare your submitted answers against ICSE board model solutions & marking schemes
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setFilterMode('all')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    filterMode === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  All ({questionsInTest.length})
                </button>
                <button
                  onClick={() => setFilterMode('wrong')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    filterMode === 'wrong' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Incorrect ({wrongCount})
                </button>
                <button
                  onClick={() => setFilterMode('correct')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    filterMode === 'correct' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Correct ({correctCount})
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.map((q, qIndex) => {
                const userAns = attempt.answers[q.id];
                const isCorrect = userAns?.isCorrect === true;
                const isSaved = bookmarks.some(b => b.questionId === q.id);

                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isCorrect
                        ? 'bg-emerald-50/20 border-emerald-200'
                        : 'bg-rose-50/20 border-rose-200'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${
                            isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                          }`}
                        >
                          {qIndex + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-700">{q.chapterTitle}</span>
                        <span className="text-[11px] text-slate-400">• {q.topic}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>+{userAns?.marksAwarded ?? q.marks}/{q.marks}</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              <span>0/{q.marks}</span>
                            </>
                          )}
                        </span>

                        <button
                          onClick={() => toggleBookmark(q.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isSaved ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400 hover:text-amber-600'
                          }`}
                          title="Save to bookmarks"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Question Prompt */}
                    <div className="text-sm sm:text-base font-semibold text-slate-900 mb-3">
                      {q.text}
                    </div>

                    {/* Comparison Box */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                      <div className="p-3 rounded-xl bg-white border border-slate-200">
                        <div className="font-bold text-slate-500 mb-1">Your Answer:</div>
                        <div
                          className={`font-semibold ${
                            isCorrect ? 'text-emerald-700' : 'text-rose-700'
                          }`}
                        >
                          {q.type === 'mcq' && userAns?.userMcqIndex !== undefined
                            ? `${['A', 'B', 'C', 'D'][userAns.userMcqIndex]}. ${q.options?.[userAns.userMcqIndex]}`
                            : q.type === 'true_false' && userAns?.userBoolean !== undefined
                            ? userAns.userBoolean ? 'True' : 'False'
                            : userAns?.userText || '(No Answer Submitted)'}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                        <div className="font-bold text-emerald-800 mb-1">Correct ICSE Answer:</div>
                        <div className="font-semibold text-emerald-950">
                          {q.type === 'mcq' && q.correctOptionIndex !== undefined
                            ? `${['A', 'B', 'C', 'D'][q.correctOptionIndex]}. ${q.options?.[q.correctOptionIndex]}`
                            : q.type === 'true_false' && q.correctBoolean !== undefined
                            ? q.correctBoolean ? 'True' : 'False'
                            : q.type === 'fill_blank' && q.correctBlanks
                            ? q.correctBlanks.join(' / ')
                            : q.sampleAnswer || 'See detailed solution steps'}
                        </div>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                      <div className="font-bold text-indigo-900 flex items-center gap-1">
                        <span>Step-by-Step ICSE Solution & Concept Note:</span>
                      </div>
                      <div className="whitespace-pre-line text-slate-600 leading-relaxed font-mono text-[11px]">
                        {q.explanation}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Bottom Sticky Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Scorecard ID: <span className="font-mono text-slate-700 font-bold">{attempt.id}</span>
          </div>

          <div className="flex items-center space-x-2">
            {attempt.weakAreas && attempt.weakAreas.length > 0 && (
              <button
                onClick={() => startRemedialTest(attempt.id)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-all active:scale-95"
              >
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
                <span>Practice Weak Concepts</span>
              </button>
            )}

            <button
              onClick={closeScorecard}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all active:scale-95"
            >
              Close Scorecard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

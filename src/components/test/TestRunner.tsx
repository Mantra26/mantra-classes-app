import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QuestionRenderer } from './QuestionRenderer';
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Award
} from 'lucide-react';

export const TestRunner: React.FC = () => {
  const {
    activeTest,
    setTestAnswer,
    toggleQuestionFlag,
    nextQuestion,
    prevQuestion,
    jumpToQuestion,
    submitActiveTest,
    quitActiveTest
  } = useApp();

  const [showPaletteMobile, setShowPaletteMobile] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  if (!activeTest) return null;

  const currentQ = activeTest.questions[activeTest.currentQuestionIndex];
  const currentAns = activeTest.answers[currentQ.id];
  const isFlagged = !!activeTest.flaggedQuestionIds[currentQ.id];

  // Timer formatting
  const minutes = Math.floor(activeTest.remainingSeconds / 60);
  const seconds = activeTest.remainingSeconds % 60;
  const isUrgent = activeTest.remainingSeconds < 300; // less than 5 min

  // Answered count calculation
  let answeredCount = 0;
  activeTest.questions.forEach(q => {
    const a = activeTest.answers[q.id];
    if (a) {
      if (a.userMcqIndex !== undefined || a.userBoolean !== undefined || (a.userText && a.userText.trim().length > 0)) {
        answeredCount++;
      }
    }
  });

  const flaggedCount = Object.values(activeTest.flaggedQuestionIds).filter(Boolean).length;
  const unansweredCount = activeTest.questions.length - answeredCount;

  const handleClearAnswer = () => {
    setTestAnswer(currentQ.id, {
      userMcqIndex: undefined,
      userBoolean: undefined,
      userText: ''
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-5 pb-16">
      {/* Test Runner Top Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 sticky top-16 z-20">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
              {activeTest.testType}
            </span>
            <span className="text-xs text-slate-400">• Mantra ICSE 7</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
            {activeTest.title}
          </h2>
        </div>

        {/* Timer & Submit Controls */}
        <div className="flex items-center space-x-3">
          {/* Countdown Clock */}
          <div
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-mono text-sm sm:text-base font-bold shadow-xs transition-colors ${
              isUrgent
                ? 'bg-rose-50 text-rose-700 border border-rose-300 animate-pulse'
                : 'bg-slate-900 text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Finish Test</span>
          </button>

          <button
            onClick={quitActiveTest}
            title="Quit test"
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Runner Body: Question Card + Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column (3 cols): Question Renderer + Action Buttons */}
        <div className="lg:col-span-3 space-y-4">
          <QuestionRenderer
            question={currentQ}
            questionNumber={activeTest.currentQuestionIndex + 1}
            totalQuestions={activeTest.questions.length}
            userAnswer={currentAns}
            onAnswerChange={ans => setTestAnswer(currentQ.id, ans)}
          />

          {/* Question Action Bottom Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              {/* Flag for Review */}
              <button
                type="button"
                onClick={() => toggleQuestionFlag(currentQ.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isFlagged
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-600 text-amber-600' : ''}`} />
                <span>{isFlagged ? 'Flagged for Review' : 'Flag Question'}</span>
              </button>

              {/* Clear Answer */}
              <button
                type="button"
                onClick={handleClearAnswer}
                className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {/* Previous */}
              <button
                type="button"
                onClick={prevQuestion}
                disabled={activeTest.currentQuestionIndex === 0}
                className="flex items-center space-x-1 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm font-semibold transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              {/* Next / Finish */}
              {activeTest.currentQuestionIndex < activeTest.questions.length - 1 ? (
                <button
                  type="button"
                  onClick={nextQuestion}
                  className="flex items-center space-x-1 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  className="flex items-center space-x-1 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95"
                >
                  <span>Review & Submit</span>
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Question Palette Navigation */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-sm">Question Palette</h3>
              <span className="text-xs font-bold text-indigo-600">
                {answeredCount}/{activeTest.questions.length} Solved
              </span>
            </div>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span>Flagged ({flaggedCount})</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-200" />
                <span>Skipped ({unansweredCount})</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full ring-2 ring-indigo-600 bg-white" />
                <span>Current</span>
              </div>
            </div>

            {/* Question Buttons Grid */}
            <div className="grid grid-cols-5 gap-2 pt-2">
              {activeTest.questions.map((q, idx) => {
                const ans = activeTest.answers[q.id];
                const hasAnswer =
                  ans &&
                  (ans.userMcqIndex !== undefined ||
                    ans.userBoolean !== undefined ||
                    (ans.userText && ans.userText.trim().length > 0));
                const flagged = !!activeTest.flaggedQuestionIds[q.id];
                const isCurrent = idx === activeTest.currentQuestionIndex;

                let btnColor = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                if (flagged) {
                  btnColor = 'bg-amber-100 text-amber-800 border-2 border-amber-400 font-bold';
                } else if (hasAnswer) {
                  btnColor = 'bg-emerald-500 text-white font-bold shadow-xs';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => jumpToQuestion(idx)}
                    className={`h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all relative ${btnColor} ${
                      isCurrent ? 'ring-2 ring-indigo-600 ring-offset-2 scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                    {flagged && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border border-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mentor Encouragement */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-amber-50 to-indigo-50 border border-amber-200/60 text-[11px] text-amber-900 leading-relaxed">
              <span className="font-bold">Uma Ma'am's Tip:</span> Read each ICSE question carefully and check the units before locking your final answer.
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Ready to Submit Test?</h3>
              <p className="text-xs text-slate-500">
                You are about to submit your responses for evaluation and diagnostic score generation.
              </p>
            </div>

            {/* Summary Counts */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100">
                <div className="text-xl font-black text-emerald-700">{answeredCount}</div>
                <div className="text-[11px] font-semibold text-emerald-900">Answered</div>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100">
                <div className="text-xl font-black text-amber-700">{flaggedCount}</div>
                <div className="text-[11px] font-semibold text-amber-900">Flagged</div>
              </div>
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100">
                <div className="text-xl font-black text-rose-700">{unansweredCount}</div>
                <div className="text-[11px] font-semibold text-rose-900">Unanswered</div>
              </div>
            </div>

            {unansweredCount > 0 && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600" />
                <span>You have {unansweredCount} unanswered questions. You can still go back and solve them.</span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                Back to Test
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSubmitModal(false);
                  submitActiveTest();
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

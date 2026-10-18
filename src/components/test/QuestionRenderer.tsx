import React, { useState } from 'react';
import { Question, UserAnswer } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Bookmark,
  CheckCircle2,
  HelpCircle,
  Award,
  ChevronDown,
  ChevronUp,
  Lightbulb
} from 'lucide-react';

interface QuestionRendererProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  userAnswer?: UserAnswer;
  onAnswerChange: (answer: Partial<UserAnswer>) => void;
  showSolutionImmediately?: boolean;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  questionNumber,
  totalQuestions,
  userAnswer,
  onAnswerChange,
  showSolutionImmediately = false
}) => {
  const { bookmarks, toggleBookmark } = useApp();
  const isBookmarked = bookmarks.some(b => b.questionId === question.id);
  const [showMantraHint, setShowMantraHint] = useState(false);

  const handleMcqSelect = (idx: number) => {
    onAnswerChange({
      questionId: question.id,
      userMcqIndex: idx
    });
  };

  const handleBooleanSelect = (val: boolean) => {
    onAnswerChange({
      questionId: question.id,
      userBoolean: val
    });
  };

  const handleTextChange = (text: string) => {
    onAnswerChange({
      questionId: question.id,
      userText: text
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-6">
      {/* Top Question Meta Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-black text-xs">
            Q{questionNumber} of {totalQuestions}
          </span>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-xl">
            {question.chapterTitle}
          </span>
          <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
            • {question.topic}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Difficulty Pill */}
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-xl ${
              question.difficulty === 'Tough'
                ? 'bg-purple-100 text-purple-700 border border-purple-200'
                : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
            }`}
          >
            {question.difficulty}
          </span>

          {/* Marks Badge */}
          <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
            {question.marks} {question.marks === 1 ? 'Mark' : 'Marks'}
          </span>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(question.id)}
            className={`p-2 rounded-xl transition-all ${
              isBookmarked
                ? 'bg-amber-100 text-amber-600 border border-amber-300'
                : 'bg-slate-100 text-slate-400 hover:text-amber-600 hover:bg-slate-200'
            }`}
            title={isBookmarked ? 'Saved to Bookmarks' : 'Bookmark this question'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Question Text */}
      <div className="space-y-3">
        <div className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
          {question.text}
        </div>

        {/* Diagram SVG if applicable */}
        {question.diagramSvg && (
          <div
            className="my-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-center"
            dangerouslySetInnerHTML={{ __html: question.diagramSvg }}
          />
        )}
      </div>

      {/* Question Interaction according to Question Type */}
      <div className="pt-2">
        {/* 1. Multiple Choice (MCQ) */}
        {question.type === 'mcq' && question.options && (
          <div className="grid grid-cols-1 gap-2.5">
            {question.options.map((option, idx) => {
              const isSelected = userAnswer?.userMcqIndex === idx;
              const optionLetters = ['A', 'B', 'C', 'D'];

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleMcqSelect(idx)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 group ${
                    isSelected
                      ? 'bg-indigo-50/80 border-indigo-600 ring-2 ring-indigo-500/20 text-indigo-950 font-semibold'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                      }`}
                    >
                      {optionLetters[idx]}
                    </span>
                    <span className="text-sm sm:text-base leading-snug">{option}</span>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                      isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* 2. True / False */}
        {question.type === 'true_false' && (
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleBooleanSelect(true)}
              className={`p-4 sm:p-5 rounded-2xl border-2 text-center transition-all ${
                userAnswer?.userBoolean === true
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1">👍</div>
              <div className="font-bold text-base">TRUE</div>
              <div className="text-xs text-slate-400">Statement is correct</div>
            </button>

            <button
              type="button"
              onClick={() => handleBooleanSelect(false)}
              className={`p-4 sm:p-5 rounded-2xl border-2 text-center transition-all ${
                userAnswer?.userBoolean === false
                  ? 'bg-rose-50 border-rose-600 text-rose-950 font-bold ring-2 ring-rose-500/20'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1">👎</div>
              <div className="font-bold text-base">FALSE</div>
              <div className="text-xs text-slate-400">Statement is incorrect</div>
            </button>
          </div>
        )}

        {/* 3. Fill in the Blanks */}
        {question.type === 'fill_blank' && (
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Your Answer (Fill in the blank value / term):
            </label>
            <input
              type="text"
              value={userAnswer?.userText || ''}
              onChange={e => handleTextChange(e.target.value)}
              placeholder="Type your exact answer here..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 font-medium transition-all"
            />
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Tip: Enter single word, number, or terms separated by comma if two blanks.</span>
            </div>
          </div>
        )}

        {/* 4. Short Answer */}
        {question.type === 'short_answer' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                ICSE Short Answer (20-40 words):
              </label>
              <span className="text-xs text-slate-400 font-mono">
                {userAnswer?.userText ? userAnswer.userText.trim().split(/\s+/).filter(Boolean).length : 0} words
              </span>
            </div>
            <textarea
              rows={4}
              value={userAnswer?.userText || ''}
              onChange={e => handleTextChange(e.target.value)}
              placeholder="Write your step-by-step ICSE response here with key scientific/mathematical terminology..."
              className="w-full p-4 rounded-2xl border border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 text-sm font-medium transition-all resize-y"
            />
            {question.markingCriteria && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-700">Expected ICSE Points:</div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-500">
                  {question.markingCriteria.map((crit, cIdx) => (
                    <li key={cIdx}>{crit}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 5. Long Answer */}
        {question.type === 'long_answer' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                ICSE 5-Mark Structured Answer:
              </label>
              <span className="text-xs text-slate-400 font-mono">
                {userAnswer?.userText ? userAnswer.userText.trim().split(/\s+/).filter(Boolean).length : 0} words
              </span>
            </div>
            <textarea
              rows={6}
              value={userAnswer?.userText || ''}
              onChange={e => handleTextChange(e.target.value)}
              placeholder="Structured ICSE Answer (e.g. Parts (i), (ii), (iii), definitions, formulas, calculations)..."
              className="w-full p-4 rounded-2xl border border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 text-sm font-medium transition-all resize-y"
            />
            {question.markingCriteria && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-700">ICSE Board Marking Scheme Guide:</div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-500">
                  {question.markingCriteria.map((crit, cIdx) => (
                    <li key={cIdx}>{crit}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mantra Concept Hint by Uma Shukla (Collapsible) */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowMantraHint(!showMantraHint)}
          className="flex items-center space-x-2 text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100/70 border border-amber-200/80 px-3.5 py-2 rounded-xl transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>Mantra Concept Hint by Uma Shukla</span>
          {showMantraHint ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showMantraHint && (
          <div className="mt-2.5 p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-xs text-amber-950 font-medium leading-relaxed animate-in fade-in duration-200">
            <span className="font-bold text-amber-900">💡 Teacher's Hint: </span>
            {question.mantraHint}
          </div>
        )}
      </div>

      {/* Optional Instant Solution Check if review mode */}
      {showSolutionImmediately && (
        <div className="mt-4 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-slate-700 space-y-2">
          <div className="font-bold text-indigo-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span>Complete ICSE Model Solution:</span>
          </div>
          <div className="whitespace-pre-line leading-relaxed font-mono text-[11px] bg-white p-3 rounded-xl border border-indigo-100 text-slate-800">
            {question.explanation}
          </div>
        </div>
      )}
    </div>
  );
};

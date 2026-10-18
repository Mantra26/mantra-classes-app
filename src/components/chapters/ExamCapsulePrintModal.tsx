import React from 'react';
import { useApp } from '../../context/AppContext';
import { ICSE_SUBJECTS } from '../../data/icseCurriculum';
import { Chapter } from '../../types';
import {
  X,
  Printer,
  Sparkles,
  Award,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

export const ExamCapsulePrintModal: React.FC = () => {
  const {
    isCapsuleOpen,
    setIsCapsuleOpen,
    activeCapsuleChapter,
    activeGrade,
    activeBoard,
    setIsFlashcardsOpen
  } = useApp();

  if (!isCapsuleOpen || !activeCapsuleChapter) return null;

  const chapter: Chapter = activeCapsuleChapter;
  const subject = ICSE_SUBJECTS.find(s => s.id === chapter.subjectId);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[94vh] flex flex-col overflow-hidden my-auto">
        {/* Modal Toolbar (hidden during print) */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              📑
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                1-Page Exam Revision Capsule & Cheat Sheet
              </h3>
              <p className="text-[11px] text-slate-400">
                Ready for crisp A4 PDF generation and quick last-minute exam recall
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={() => setIsCapsuleOpen(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Sheet Viewport */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-slate-900 print:p-0 print:m-0" id="printable-exam-capsule">
          {/* Printable Sheet Header */}
          <div className="border-b-2 border-indigo-900 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-indigo-700 font-extrabold text-xs tracking-wider uppercase">
                <span>Mantra Classes</span>
                <span>•</span>
                <span>Mentorship by Director Uma Shukla</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 mt-1">
                {chapter.title}
              </h1>
              <p className="text-xs text-slate-600 font-semibold mt-0.5">
                {subject?.name} • {activeBoard} Grade {chapter.gradeLevel || activeGrade} Comprehensive Revision Capsule
              </p>
            </div>

            <div className="text-right sm:border-l-2 sm:border-slate-200 sm:pl-4">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Exam Board</span>
              <span className="text-xs font-black text-indigo-900">{activeBoard} & CISCE Aligned</span>
              <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">✓ 100% High-Yield Formula Certified</span>
            </div>
          </div>

          {/* Core Mind Map / Chapter Essence */}
          <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center space-x-2 text-indigo-950 font-black text-xs uppercase mb-1">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Chapter Mind Map & Core Concept</span>
            </div>
            <p className="text-xs text-indigo-950 font-medium leading-relaxed">
              {chapter.mindMapSummary || chapter.description}
            </p>
          </div>

          {/* 2-Column Grid: Key Rules & Formulas vs High-Yield Topics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {/* High-Yield Topics & Terminology */}
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
              <h4 className="text-xs font-black uppercase text-slate-900 border-b border-slate-200 pb-2 mb-3 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Must-Master Syllabus Concepts</span>
              </h4>
              <ul className="space-y-2 text-xs">
                {chapter.topics.map((t, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-800 font-semibold">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* High-Yield Formulas & Exam Traps */}
            <div className="border border-amber-200 rounded-2xl p-4 bg-amber-50/40">
              <h4 className="text-xs font-black uppercase text-amber-950 border-b border-amber-200 pb-2 mb-3 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>3 Common Exam Traps & Examiner Pitfalls</span>
              </h4>
              <div className="space-y-2.5 text-xs text-amber-950">
                <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                  <b className="text-rose-600">Trap 1 (Units & Signs):</b> Forgetting standard SI units or negative signs during algebraic transformations.
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                  <b className="text-rose-600">Trap 2 (Working Steps):</b> Writing final numeric answer without step-by-step formula and intermediate substitution.
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-amber-200">
                  <b className="text-rose-600">Trap 3 (Definition Precision):</b> Missing exact board keywords (e.g., 'rate of change', 'mutual benefit', 'indivisible').
                </div>
              </div>
            </div>
          </div>

          {/* Uma Ma'am's Exam Mantra Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-400/20 via-amber-400/10 to-indigo-50 border-2 border-amber-400/60 mb-6 flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2 py-0.5 rounded">
                Uma Ma'am's Golden Exam Mantra
              </span>
              <p className="text-xs font-bold text-slate-900 mt-1 leading-relaxed">
                "In {subject?.name}, 40% of marks are lost in careless unit conversion and skipping diagram labels. Always re-read the last sentence of the problem to verify what was asked!"
              </p>
            </div>
          </div>

          {/* Quick Study Checklist */}
          <div className="border-t border-slate-200 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 font-semibold">
            <div className="flex items-center space-x-4">
              <span>□ Chapter PPT Reviewed</span>
              <span>□ 3D Flashcards Mastered</span>
              <span>□ 1 Mock Test Solved</span>
            </div>
            <div className="font-mono text-[11px] text-slate-400">
              Mantra Classes Official Study Capsule • {new Date().getFullYear()}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs print:hidden">
          <button
            onClick={() => {
              setIsCapsuleOpen(false);
              setIsFlashcardsOpen(true);
            }}
            className="flex items-center space-x-1.5 font-bold text-indigo-600 hover:text-indigo-800"
          >
            <span>Study 3D Flashcards for this chapter</span>
          </button>

          <button
            onClick={() => setIsCapsuleOpen(false)}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-slate-700"
          >
            Close Capsule
          </button>
        </div>
      </div>
    </div>
  );
};

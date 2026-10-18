import React, { useState, useEffect } from 'react';
import { ChapterResource, PptSlide } from '../../types';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Presentation,
  Download,
  Sparkles,
  Maximize2,
  Minimize2,
  CheckCircle2,
  AlertTriangle,
  Award,
  Layers,
  BookOpen
} from 'lucide-react';

interface PptSlideViewerModalProps {
  pptResource: ChapterResource | null;
  onClose: () => void;
}

export const PptSlideViewerModal: React.FC<PptSlideViewerModalProps> = ({
  pptResource,
  onClose
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Default fallback slides if custom slides array is not provided
  const defaultSlides: PptSlide[] = [
    {
      slideNumber: 1,
      title: pptResource?.title || 'ICSE Grade 7 Chapter Presentation',
      categoryTag: 'ICSE BOARD SYLLABUS OVERVIEW',
      bullets: [
        'Curated specifically for Class 7 ICSE English Medium examinations.',
        'Structured in accordance with latest Council regulations and marking criteria.',
        'Includes step-by-step solved questions, concept tables, and common errors.',
        'Faculty Lead: Uma Shukla, Ex-ICSE Board Senior Examiner & Director.'
      ],
      keyHighlight: 'Target: Scoring 95%+ in school unit tests and final terminal exams.',
      examMantra: 'Master fundamental definitions first before tackling composite application numericals.'
    },
    {
      slideNumber: 2,
      title: 'Fundamental Laws & Core Theoretical Definitions',
      categoryTag: 'HIGH-YIELD THEORY',
      bullets: [
        'Understand the governing scientific/mathematical rules with accurate terminology.',
        'Definitions must include essential keywords to secure full board marks.',
        'Units must be specified in SI and CGS formats where applicable.'
      ],
      diagramBox: {
        label: 'Key Terms for Oral & Written Exams',
        items: [
          { term: 'Principal Rule', explanation: 'Always write down the basic formula before substituting numerical values.' },
          { term: 'Sign Conventions', explanation: 'Take careful note of positive and negative signs in all algebraic and physical equations.' },
          { term: 'SI Metric Units', explanation: 'Never leave numerical answers dimensionless.' }
        ]
      },
      examMantra: 'Never omit units in final calculation lines; examiners deduct half a mark for missing units.'
    },
    {
      slideNumber: 3,
      title: 'Comparative Analysis & Concept Breakdown Table',
      categoryTag: 'EXAM COMPARISON MATRIX',
      bullets: [
        'Questions testing differences between two concepts are standard in ICSE section B.',
        'Always frame comparative answers in a structured tabular format with minimum 3 distinct points.'
      ],
      tableData: {
        headers: ['Evaluation Parameter', 'Category A (Fundamental)', 'Category B (Applied)'],
        rows: [
          ['Primary Characteristic', 'Directly observable or measurable', 'Derived from fundamental properties'],
          ['Mathematical Behavior', 'Linear progression under standard conditions', 'Non-linear or dependent on external parameters'],
          ['ICSE Question Frequency', 'Compulsory Section A (1-2 Marks)', 'Structured Section B (3-5 Marks)']
        ]
      },
      examMantra: 'Tabular format gives you guaranteed full marks in 3-mark differentiation questions.'
    },
    {
      slideNumber: 4,
      title: 'Step-by-Step Solved ICSE Board Exemplar',
      categoryTag: 'SOLVED EXAM PROBLEM',
      bullets: [
        'Step 1: Write down Given Data clearly with proper algebraic symbols.',
        'Step 2: State the formula / theorem being used.',
        'Step 3: Substitute given numbers into the formula systematically.',
        'Step 4: Box your final result with appropriate units.'
      ],
      keyHighlight: 'Step Marking Rule: 1 mark for formula, 1 mark for substitution, 1 mark for final boxed answer with units.',
      examMantra: 'Even if the final arithmetic has an error, correct formula and substitution get you 2 out of 3 marks!'
    },
    {
      slideNumber: 5,
      title: 'Common Pitfalls & Exam Traps Where Marks are Lost',
      categoryTag: 'TRAPS & CAUTIONS',
      bullets: [
        'Rushing through bracket priority in multi-step equations.',
        'Confusing glancing angles with the angle of incidence in optics problems.',
        'Forgetting that xylem conducts unidirectionally while phloem transports bidirectionally.',
        'Failing to convert kilometers per hour to meters per second using the 5/18 factor.'
      ],
      diagramBox: {
        label: 'Board Examiner Alert',
        items: [
          { term: 'Trap 1', explanation: 'Misreading the question prompt: check if the question asks for True or False with reasons.' },
          { term: 'Trap 2', explanation: 'Writing vague one-word answers where a complete sentence explanation is required.' }
        ]
      },
      examMantra: 'Spend the first 10 minutes of reading time to spot tricky constraints before writing.'
    },
    {
      slideNumber: 6,
      title: 'Uma Shukla\'s Master Revision Mantra & Checklist',
      categoryTag: 'SUMMARY & MENTOR CHECKLIST',
      bullets: [
        'Revise all definitions from your chapter revision cards twice a week.',
        'Take the Chapter Diagnostic Test on the Mantra Classes App to identify any weak spots.',
        'Bookmark questions you got wrong and review their step-by-step solutions.',
        'Clear any doubts immediately via the Direct Doubts Desk with Uma Ma\'am.'
      ],
      keyHighlight: 'Consistency is the key: 20 minutes of daily testing outperforms 4 hours of cramming before exams.',
      examMantra: 'You are ready to excel! Believe in your hard work and execute with calm confidence.'
    }
  ];

  const slides = pptResource?.slides && pptResource.slides.length > 0
    ? pptResource.slides
    : defaultSlides;

  const currentSlide = slides[currentSlideIndex] || slides[0];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlideIndex(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, onClose]);

  if (!pptResource) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div
        className={`bg-slate-900 rounded-3xl w-full my-auto overflow-hidden shadow-2xl border border-slate-800 flex flex-col animate-in zoom-in-95 duration-200 text-white ${
          isFullscreen ? 'fixed inset-2 max-w-none max-h-none z-50' : 'max-w-5xl max-h-[95vh]'
        }`}
      >
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
              <Presentation className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-400/20">
                  Interactive PPT Slide Deck
                </span>
                <span className="text-xs text-slate-400">• Uma Shukla Studio</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1">{pptResource.title}</h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-slate-800 text-amber-300 border border-slate-700">
              Slide {currentSlideIndex + 1} of {slides.length}
            </span>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors hidden sm:block"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Presentation'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main 16:9 Presentation Slide Canvas */}
        <div className="flex-1 p-3 sm:p-6 bg-slate-950 flex flex-col justify-between overflow-y-auto">
          <div className="w-full max-w-4xl mx-auto aspect-[16/9] min-h-[360px] rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-2 border-indigo-500/30 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Top Slide Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  {currentSlide.categoryTag || 'ICSE GRADE 7 ESSENTIALS'}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  MANTRA CLASSES • ICSE 7
                </span>
              </div>

              <h3 className="text-lg sm:text-2xl font-black text-white mb-1.5 tracking-tight">
                {currentSlide.title}
              </h3>
            </div>

            {/* Slide Body Content */}
            <div className="my-auto space-y-3 py-2">
              {/* Bullet Points */}
              {currentSlide.bullets && currentSlide.bullets.length > 0 && (
                <div className="space-y-2">
                  {currentSlide.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-200">
                      <div className="w-5 h-5 rounded-md bg-indigo-600/50 text-indigo-300 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-[10px]">
                        ✓
                      </div>
                      <span className="leading-relaxed">{bullet}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Optional Comparison Table */}
              {currentSlide.tableData && (
                <div className="overflow-x-auto my-2 rounded-xl border border-indigo-500/20 bg-black/40">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-indigo-500/30 text-amber-300 font-bold bg-indigo-950/40">
                        {currentSlide.tableData.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-2 sm:p-2.5">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {currentSlide.tableData.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-indigo-900/20">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-2 sm:p-2.5 text-slate-300 font-medium">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Optional Diagram / Definitions Box */}
              {currentSlide.diagramBox && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-2">
                  {currentSlide.diagramBox.items.map((item, dIdx) => (
                    <div key={dIdx} className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs">
                      <div className="font-bold text-amber-300 mb-0.5">{item.term}</div>
                      <div className="text-slate-300 text-[11px] leading-relaxed">{item.explanation}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Key Highlight Banner */}
              {currentSlide.keyHighlight && (
                <div className="p-3 rounded-xl bg-indigo-900/40 border border-indigo-400/30 text-xs sm:text-sm text-indigo-200 font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>{currentSlide.keyHighlight}</span>
                </div>
              )}
            </div>

            {/* Slide Footer: Uma Shukla Exam Mantra */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-400 gap-2">
              <div className="flex items-center space-x-1.5 text-amber-300 font-medium">
                <span className="font-bold">Uma Shukla's Exam Mantra:</span>
                <span className="italic text-slate-300 font-normal">"{currentSlide.examMantra}"</span>
              </div>
              <div className="text-[11px] font-mono text-slate-500 whitespace-nowrap">
                Slide {currentSlideIndex + 1}/{slides.length}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Slide Navigation & Thumbnail Drawer */}
        <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {/* Previous Slide */}
          <button
            onClick={() => setCurrentSlideIndex(prev => Math.max(prev - 1, 0))}
            disabled={currentSlideIndex === 0}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm font-bold text-white transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Slide dots / numbers */}
          <div className="flex items-center space-x-1 overflow-x-auto py-1">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                  currentSlideIndex === idx
                    ? 'bg-amber-500 text-slate-950 font-black scale-110 shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {/* Download PPT */}
            <button
              onClick={() => alert(`Downloading high-quality PPT Deck for "${pptResource.title}" (.pptx)...`)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download Deck</span>
            </button>

            {/* Next Slide */}
            <button
              onClick={() => setCurrentSlideIndex(prev => Math.min(prev + 1, slides.length - 1))}
              disabled={currentSlideIndex === slides.length - 1}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm font-bold text-slate-950 transition-all"
            >
              <span>Next Slide</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

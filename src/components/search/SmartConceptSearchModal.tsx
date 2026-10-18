import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPREHENSIVE_FLASHCARDS } from '../../data/flashcardsData';
import { ICSE_QUESTION_BANK } from '../../data/questionBank';
import { ICSE_CHAPTERS, ICSE_SUBJECTS } from '../../data/icseCurriculum';
import { Search, X, BookOpen, HelpCircle, Sparkles, Check, ArrowRight, Copy } from 'lucide-react';

export const SmartConceptSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setSelectedSubjectId,
    setSelectedChapterId,
    setView
  } = useApp();

  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'formulas' | 'questions' | 'chapters'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return { formulas: [], questions: [], chapters: [] };

    const matchingFormulas = COMPREHENSIVE_FLASHCARDS.filter(
      f =>
        f.front.toLowerCase().includes(q) ||
        f.back.toLowerCase().includes(q) ||
        (f.formula && f.formula.toLowerCase().includes(q)) ||
        f.category.toLowerCase().includes(q)
    ).slice(0, 8);

    const matchingQuestions = ICSE_QUESTION_BANK.filter(
      qb =>
        qb.text.toLowerCase().includes(q) ||
        qb.explanation.toLowerCase().includes(q) ||
        qb.topic.toLowerCase().includes(q)
    ).slice(0, 8);

    const matchingChapters = ICSE_CHAPTERS.filter(
      ch =>
        ch.title.toLowerCase().includes(q) ||
        (ch.description && ch.description.toLowerCase().includes(q)) ||
        ch.topics.some(t => t.toLowerCase().includes(q))
    ).slice(0, 6);

    return {
      formulas: matchingFormulas,
      questions: matchingQuestions,
      chapters: matchingChapters
    };
  }, [query]);

  if (!isSearchOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleJumpToChapter = (chapterId: string, subjectId: any) => {
    setSelectedSubjectId(subjectId);
    setSelectedChapterId(chapterId);
    setView('chapter-detail');
    setIsSearchOpen(false);
  };

  const totalResults =
    results.formulas.length + results.questions.length + results.chapters.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-3 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[82vh]">
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center space-x-3 bg-white">
          <Search className="w-5 h-5 text-indigo-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search any formula, question, concept, or chapter (e.g. 'Photosynthesis', 'Binary', 'Goodwill', 'Pythagoras')..."
            className="w-full text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-500">
            ESC
          </span>
        </div>

        {/* Filter Pills */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center space-x-2 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-xl transition-all ${
              filterType === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Results ({totalResults})
          </button>
          <button
            onClick={() => setFilterType('formulas')}
            className={`px-3 py-1 rounded-xl transition-all ${
              filterType === 'formulas'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Formulas & Concepts ({results.formulas.length})
          </button>
          <button
            onClick={() => setFilterType('questions')}
            className={`px-3 py-1 rounded-xl transition-all ${
              filterType === 'questions'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Questions & Answers ({results.questions.length})
          </button>
          <button
            onClick={() => setFilterType('chapters')}
            className={`px-3 py-1 rounded-xl transition-all ${
              filterType === 'chapters'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Curriculum Chapters ({results.chapters.length})
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {query.trim().length < 2 ? (
            <div className="text-center py-12 text-slate-400">
              <Sparkles className="w-10 h-10 mx-auto text-indigo-400 mb-2 opacity-50" />
              <p className="text-sm font-bold text-slate-600">
                Instant AI Concept & Formula Solver
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                Type any keyword to instantly search definitions, formulas, MCQs, step-by-step solutions, and chapter notes.
              </p>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p className="text-sm font-bold">No results found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for broader keywords like 'Force', 'Binary', 'Partnership', 'Sandhi', or 'Ecosystem'.
              </p>
            </div>
          ) : (
            <>
              {/* Formulas & Concepts Section */}
              {(filterType === 'all' || filterType === 'formulas') && results.formulas.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-black text-amber-700 uppercase tracking-wider">
                    <span>⚡ Formulas & Core Definitions</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {results.formulas.map(f => (
                      <div
                        key={f.id}
                        className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 hover:border-amber-300 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-bold text-amber-900 mb-1">
                            <span className="uppercase">{f.subjectId} • {f.category}</span>
                            <button
                              onClick={() => handleCopy(f.id, `${f.front}\n${f.back}\nFormula: ${f.formula || ''}`)}
                              className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800"
                            >
                              {copiedId === f.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedId === f.id ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900">{f.front}</h4>
                          <p className="text-xs text-slate-700 mt-1 leading-relaxed">{f.back}</p>
                          {f.formula && (
                            <div className="mt-2 p-2 rounded-xl bg-white border border-amber-300 font-mono text-xs text-amber-900 font-bold">
                              {f.formula}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Questions Section */}
              {(filterType === 'all' || filterType === 'questions') && results.questions.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-black text-indigo-700 uppercase tracking-wider">
                    <span>❓ Solved Questions & Step-by-Step Answers</span>
                  </div>
                  <div className="space-y-2.5">
                    {results.questions.map(q => (
                      <div
                        key={q.id}
                        className="p-3.5 rounded-2xl bg-indigo-50/40 border border-indigo-200/80 hover:border-indigo-300 transition-all"
                      >
                        <div className="flex items-center justify-between text-[11px] font-bold text-indigo-900 mb-1">
                          <span className="uppercase">{q.topic} • Grade {q.gradeLevel || '7'}</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-black">
                            Correct: {q.correctOptionId.toUpperCase()}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 mb-2">{q.text}</h4>
                        <div className="p-2.5 rounded-xl bg-white border border-indigo-100 text-xs text-slate-700">
                          <b className="text-indigo-900">Step-by-step Solution:</b> {q.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Chapters Section */}
              {(filterType === 'all' || filterType === 'chapters') && results.chapters.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-black text-slate-700 uppercase tracking-wider">
                    <span>📚 Matching Chapters & Study Guides</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {results.chapters.map(c => (
                      <div
                        key={c.id}
                        onClick={() => handleJumpToChapter(c.id, c.subjectId)}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/30 cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase">
                            Grade {c.gradeLevel} • {c.subjectId}
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {c.title}
                          </h4>
                          <span className="text-[11px] text-slate-500">
                            {c.topics.length} Key Topics Covered
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 px-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Press <b>ESC</b> to close</span>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="font-bold text-slate-700 hover:text-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

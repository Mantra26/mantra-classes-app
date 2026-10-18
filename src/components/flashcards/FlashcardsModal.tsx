import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPREHENSIVE_FLASHCARDS } from '../../data/flashcardsData';
import { ICSE_SUBJECTS, ICSE_CHAPTERS } from '../../data/icseCurriculum';
import { Flashcard, SubjectId } from '../../types';
import confetti from 'canvas-confetti';
import {
  X,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Shuffle,
  Award,
  Zap,
  Volume2
} from 'lucide-react';

export const FlashcardsModal: React.FC = () => {
  const {
    isFlashcardsOpen,
    setIsFlashcardsOpen,
    activeFlashcardTopic,
    masteredFlashcards,
    toggleMasteredFlashcard,
    addXp,
    activeBoard,
    activeGrade
  } = useApp();

  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterMode, setFilterMode] = useState<'all' | 'learning'>('all');
  const [deck, setDeck] = useState<Flashcard[]>([]);

  // Initialize filter from activeFlashcardTopic
  useEffect(() => {
    if (activeFlashcardTopic?.subjectId) {
      setSelectedSubject(activeFlashcardTopic.subjectId);
    }
    if (activeFlashcardTopic?.chapterId) {
      setSelectedChapter(activeFlashcardTopic.chapterId);
    }
  }, [activeFlashcardTopic, isFlashcardsOpen]);

  // Filter cards based on subject, chapter, and mode
  useEffect(() => {
    let filtered = COMPREHENSIVE_FLASHCARDS;

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(c => c.subjectId === selectedSubject);
    }
    if (selectedChapter !== 'all') {
      filtered = filtered.filter(c => c.chapterId === selectedChapter);
    }
    if (filterMode === 'learning') {
      filtered = filtered.filter(c => !masteredFlashcards.includes(c.id));
    }

    setDeck(filtered);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedSubject, selectedChapter, filterMode, masteredFlashcards]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFlashcardsOpen) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      } else if (e.code === 'Escape') {
        setIsFlashcardsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlashcardsOpen, deck.length, currentIndex]);

  if (!isFlashcardsOpen) return null;

  const currentCard = deck[currentIndex];
  const masteredInDeck = deck.filter(c => masteredFlashcards.includes(c.id)).length;
  const progressPercent = deck.length > 0 ? Math.round((masteredInDeck / deck.length) * 100) : 0;
  const isCurrentMastered = currentCard ? masteredFlashcards.includes(currentCard.id) : false;

  const handleNext = () => {
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleToggleMaster = () => {
    if (!currentCard) return;
    const wasMastered = isCurrentMastered;
    toggleMasteredFlashcard(currentCard.id);

    if (!wasMastered) {
      addXp(10, 'Flashcard Mastered');
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
              🎴
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Quizlet & Anki Spaced Repetition
                </span>
                <span className="text-xs text-indigo-200">
                  {deck.length} Flashcards
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white">
                3D Interactive Concept & Formula Flashcards
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsFlashcardsOpen(false)}
            className="p-2 rounded-xl text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
            {/* Subject Selector */}
            <select
              value={selectedSubject}
              onChange={e => {
                setSelectedSubject(e.target.value as any);
                setSelectedChapter('all');
              }}
              className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold text-slate-800 outline-none shadow-xs"
            >
              <option value="all">All Subjects ({COMPREHENSIVE_FLASHCARDS.length})</option>
              {ICSE_SUBJECTS.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            {/* Filter Mode */}
            <div className="inline-flex rounded-xl bg-slate-200 p-0.5 font-bold">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  filterMode === 'all'
                    ? 'bg-white text-indigo-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Cards
              </button>
              <button
                onClick={() => setFilterMode('learning')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  filterMode === 'learning'
                    ? 'bg-white text-indigo-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Still Learning
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleShuffle}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold transition-all shadow-xs"
              title="Shuffle Cards"
            >
              <Shuffle className="w-3.5 h-3.5 text-slate-500" />
              <span>Shuffle</span>
            </button>

            {/* Progress Badge */}
            <div className="flex items-center space-x-1.5 font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2.5 py-1 rounded-xl">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{masteredInDeck} / {deck.length} Mastered ({progressPercent}%)</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-1.5 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Main Card Viewport */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center items-center overflow-y-auto min-h-[340px]">
          {deck.length === 0 ? (
            <div className="text-center py-12 max-w-sm">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 text-2xl">
                🎉
              </div>
              <h3 className="text-base font-bold text-slate-900">All Cards Mastered!</h3>
              <p className="text-xs text-slate-500 mt-1">
                You've mastered every flashcard in this filter! Switch to "All Cards" or select another subject to keep studying.
              </p>
              <button
                onClick={() => setFilterMode('all')}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Show All Cards
              </button>
            </div>
          ) : (
            <div className="w-full max-w-xl">
              {/* Card Meta Indicator */}
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-2">
                <span className="uppercase tracking-wider text-[11px] text-indigo-600">
                  {currentCard.subjectId.toUpperCase()} • {currentCard.category}
                </span>
                <span>
                  Card {currentIndex + 1} of {deck.length}
                </span>
              </div>

              {/* 3D Interactive Flip Card */}
              <div
                onClick={() => setIsFlipped(prev => !prev)}
                className={`cursor-pointer relative min-h-[260px] sm:min-h-[290px] rounded-3xl p-6 sm:p-8 transition-all duration-300 select-none shadow-lg border-2 ${
                  isFlipped
                    ? 'bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white border-indigo-700 ring-4 ring-indigo-500/20'
                    : 'bg-gradient-to-br from-white to-slate-50 text-slate-900 border-slate-200 hover:border-indigo-400 hover:shadow-xl'
                }`}
              >
                {/* Front Side */}
                {!isFlipped ? (
                  <div className="flex flex-col justify-between h-full space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                        Concept / Question
                      </span>
                      {isCurrentMastered && (
                        <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Mastered</span>
                        </span>
                      )}
                    </div>

                    <div className="my-auto py-4">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                        {currentCard.front}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400 font-semibold">
                      <div className="flex items-center space-x-1.5">
                        <RotateCw className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Click card or press <b>Spacebar</b> to reveal answer</span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {(currentCard.difficulty || 'Core Concept').toUpperCase()}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Back Side */
                  <div className="flex flex-col justify-between h-full space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        Key Concept & Solution
                      </span>
                      <span className="text-[11px] text-indigo-300">
                        Click to flip back
                      </span>
                    </div>

                    <div className="my-auto py-2 space-y-3">
                      <p className="text-base sm:text-lg text-indigo-100 font-medium leading-relaxed">
                        {currentCard.back}
                      </p>

                      {currentCard.formula && (
                        <div className="p-3 rounded-2xl bg-slate-950/70 border border-amber-400/40 font-mono text-amber-300 text-sm font-bold shadow-inner">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                            Formula / High-Yield Rule:
                          </span>
                          {currentCard.formula}
                        </div>
                      )}

                      {(currentCard.mnemonic || currentCard.mnemonicOrTip) && (
                        <div className="p-2.5 rounded-xl bg-indigo-800/40 border border-indigo-600/50 text-xs text-amber-200 font-medium">
                          💡 <b>Memory Tip:</b> {currentCard.mnemonic || currentCard.mnemonicOrTip}
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-indigo-800/60 flex items-center justify-between text-xs text-indigo-300">
                      <span>Uma Ma'am's Revision Tip</span>
                      <span className="text-amber-400 font-bold">+10 XP for mastery</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Card Action Controls */}
              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
                  title="Previous Card"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-2 flex-1 justify-center">
                  <button
                    onClick={handleToggleMaster}
                    className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-5 py-2.5 rounded-2xl font-black text-xs transition-all active:scale-95 shadow-md ${
                      isCurrentMastered
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-white hover:bg-emerald-50 text-emerald-700 border-2 border-emerald-500'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isCurrentMastered ? 'Mastered ✨' : 'Mark as Mastered (+10 XP)'}</span>
                  </button>
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentIndex === deck.length - 1}
                  className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                  title="Next Card"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="kbd px-2 py-0.5 rounded bg-slate-200 font-mono text-[11px] font-bold">Space</span>
            <span>Flip</span>
            <span className="kbd px-2 py-0.5 rounded bg-slate-200 font-mono text-[11px] font-bold">← / →</span>
            <span>Navigate</span>
          </div>
          <button
            onClick={() => setIsFlashcardsOpen(false)}
            className="font-bold text-slate-600 hover:text-slate-900"
          >
            Close Flashcards
          </button>
        </div>
      </div>
    </div>
  );
};

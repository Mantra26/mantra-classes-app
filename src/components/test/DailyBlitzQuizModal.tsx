import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ICSE_QUESTION_BANK } from '../../data/questionBank';
import { Question } from '../../types';
import confetti from 'canvas-confetti';
import {
  X,
  Zap,
  Clock,
  Flame,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ArrowRight
} from 'lucide-react';

export const DailyBlitzQuizModal: React.FC = () => {
  const {
    isBlitzOpen,
    setIsBlitzOpen,
    addXp,
    setView,
    activeGrade,
    activeBoard
  } = useApp();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [comboStreak, setComboStreak] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  // Initialize random 5 questions when modal opens
  useEffect(() => {
    if (isBlitzOpen) {
      resetGame();
    }
  }, [isBlitzOpen, activeGrade]);

  const resetGame = () => {
    // Pick questions matching grade if possible, else random
    const pool = ICSE_QUESTION_BANK.filter(
      q => q.gradeLevel === activeGrade || !q.gradeLevel
    );
    const shuffled = [...(pool.length >= 5 ? pool : ICSE_QUESTION_BANK)].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 5));
    setCurrentIdx(0);
    setSecondsRemaining(60);
    setSelectedAnswerIndex(null);
    setIsAnswerRevealed(false);
    setScore(0);
    setComboStreak(0);
    setMaxCombo(0);
    setIsFinished(false);
    setXpEarned(0);
  };

  // Timer countdown
  useEffect(() => {
    if (!isBlitzOpen || isFinished) return;

    if (secondsRemaining <= 0) {
      finishGame(score, maxCombo);
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isBlitzOpen, isFinished, secondsRemaining, score, maxCombo]);

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswerRevealed || isFinished) return;

    setSelectedAnswerIndex(optionIndex);
    setIsAnswerRevealed(true);

    const currQ = questions[currentIdx];
    const isCorrect = optionIndex === (currQ.correctOptionIndex ?? 0);

    let newScore = score;
    let newCombo = comboStreak;

    if (isCorrect) {
      newScore += 1;
      newCombo += 1;
      setScore(newScore);
      setComboStreak(newCombo);
      setMaxCombo(prev => Math.max(prev, newCombo));
    } else {
      setComboStreak(0);
    }

    setTimeout(() => {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(prev => prev + 1);
        setSelectedAnswerIndex(null);
        setIsAnswerRevealed(false);
      } else {
        finishGame(newScore, Math.max(maxCombo, newCombo));
      }
    }, 800);
  };

  const finishGame = (finalScore: number, finalMaxCombo: number) => {
    setIsFinished(true);
    // XP Calculation: Base 20 + 6 per correct question + 5 per combo bonus
    const earned = 20 + finalScore * 6 + finalMaxCombo * 5;
    setXpEarned(earned);
    addXp(earned, '60-Second Daily Rapid Blitz Completed');

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  if (!isBlitzOpen) return null;

  const currentQ = questions[currentIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col">
        {/* Blitz Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center font-black shadow-md">
              <Zap className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider bg-slate-950/20 px-2 py-0.5 rounded-full inline-block">
                Byju's & Quizizz Rapid Mode
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-950">
                60-Second Daily Rapid Blitz Quiz
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsBlitzOpen(false)}
            className="p-2 rounded-xl text-slate-900 hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live HUD Bar */}
        {!isFinished && (
          <div className="px-5 py-3 bg-slate-900 text-white flex items-center justify-between text-xs font-bold">
            {/* Countdown Clock */}
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className={`font-mono text-sm font-black ${secondsRemaining <= 15 ? 'text-rose-400' : 'text-amber-400'}`}>
                {secondsRemaining}s
              </span>
            </div>

            {/* Combo Streak */}
            <div className="flex items-center space-x-1 text-orange-400 font-extrabold">
              <Flame className="w-4 h-4 fill-orange-400" />
              <span>{comboStreak > 1 ? `${comboStreak}x Streak Combo!` : 'Combo 1x'}</span>
            </div>

            {/* Question Counter */}
            <div className="text-slate-400 font-semibold">
              Question {currentIdx + 1} / {questions.length}
            </div>
          </div>
        )}

        {/* Timer Bar */}
        {!isFinished && (
          <div className="w-full bg-slate-800 h-1.5 overflow-hidden">
            <div
              className={`h-1.5 transition-all duration-1000 ${
                secondsRemaining <= 15
                  ? 'bg-rose-500'
                  : secondsRemaining <= 30
                  ? 'bg-amber-400'
                  : 'bg-emerald-400'
              }`}
              style={{ width: `${(secondsRemaining / 60) * 100}%` }}
            />
          </div>
        )}

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          {isFinished ? (
            /* Finished Summary Screen */
            <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center mx-auto shadow-xl">
                <Trophy className="w-10 h-10 fill-slate-950" />
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-wider text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                  Blitz Challenge Completed!
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  Score: {score} / {questions.length} Correct
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Time Remaining: {secondsRemaining}s • Highest Streak: {maxCombo}x
                </p>
              </div>

              {/* XP Reward Card */}
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 max-w-sm mx-auto flex items-center justify-center space-x-3 text-amber-950 font-black">
                <Zap className="w-6 h-6 text-amber-600 fill-amber-500" />
                <span className="text-xl">+{xpEarned} Scholar XP Awarded!</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={resetGame}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Play Another Blitz</span>
                </button>

                <button
                  onClick={() => {
                    setIsBlitzOpen(false);
                    setView('leaderboard');
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
                >
                  <Trophy className="w-4 h-4" />
                  <span>View Leaderboard</span>
                </button>
              </div>
            </div>
          ) : currentQ ? (
            /* Active Question Screen */
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  {currentQ.topic}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-2 leading-relaxed">
                  {currentQ.text}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {(currentQ.options || []).map((optText, optIdx) => {
                  const isSelected = selectedAnswerIndex === optIdx;
                  const isCorrect = optIdx === (currentQ.correctOptionIndex ?? 0);

                  let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/50';

                  if (isAnswerRevealed) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400/30';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-50 border-rose-500 text-rose-900';
                    } else {
                      btnStyle = 'opacity-40 border-slate-200';
                    }
                  }

                  const optLetter = String.fromCharCode(65 + optIdx);

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      disabled={isAnswerRevealed}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm flex items-center justify-between transition-all ${btnStyle}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs font-black shrink-0">
                          {optLetter}
                        </span>
                        <span>{optText}</span>
                      </div>

                      {isAnswerRevealed && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isAnswerRevealed && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">Loading questions...</div>
          )}
        </div>
      </div>
    </div>
  );
};

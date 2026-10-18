import React from 'react';
import { useApp } from '../../context/AppContext';
import { TopicWeakness } from '../../types';
import {
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Target,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const WeakAreasWidget: React.FC = () => {
  const { testAttempts, startRemedialTest, goToChapterDetail } = useApp();

  // Aggregate all weak areas from past test attempts
  const allWeaknesses: { weakness: TopicWeakness; attemptId: string; attemptTitle: string }[] = [];
  testAttempts.forEach(attempt => {
    if (attempt.weakAreas && attempt.weakAreas.length > 0) {
      attempt.weakAreas.forEach(w => {
        allWeaknesses.push({
          weakness: w,
          attemptId: attempt.id,
          attemptTitle: attempt.testTitle
        });
      });
    }
  });

  if (allWeaknesses.length === 0) {
    return (
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/70 rounded-2xl p-6 text-slate-800 shadow-xs">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-emerald-950 text-base">Great Concept Mastery!</h3>
            <p className="text-xs text-emerald-800">
              No severe weakness identified in recent tests. Keep taking custom mocks to maintain your streak.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Get most recent test with weak areas for 1-click remedial launch
  const latestAttemptWithWeakness = testAttempts.find(a => a.weakAreas && a.weakAreas.length > 0);

  return (
    <div className="bg-white border-2 border-amber-200/80 rounded-2xl p-5 shadow-xs relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-amber-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-300 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-slate-900 text-base">
                Topics & Questions Where You Should Work Hard
              </h3>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                Action Required
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Diagnostic AI detected {allWeaknesses.length} concepts where marks were lost. Practice these to push your score to 95%+.
            </p>
          </div>
        </div>

        {latestAttemptWithWeakness && (
          <button
            onClick={() => startRemedialTest(latestAttemptWithWeakness.id)}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-sm transition-all active:scale-95 whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Launch 1-Click Remedial Test</span>
          </button>
        )}
      </div>

      {/* Weak Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {allWeaknesses.slice(0, 4).map((item, idx) => {
          const { weakness } = item;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 hover:bg-amber-50/40 border border-slate-200/80 hover:border-amber-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    {weakness.chapterTitle}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      weakness.difficultySuggested === 'Tough'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {weakness.difficultySuggested} Level
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>{weakness.topic}</span>
                </h4>

                <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                  <span className="font-semibold text-slate-700">Missed concept: </span>
                  {weakness.missedConcepts.join(', ')}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-[11px] text-amber-800 font-medium">
                  Recommendation: {weakness.recommendedAction}
                </span>
                <button
                  onClick={() => goToChapterDetail(weakness.chapterId)}
                  className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 ml-2 flex-shrink-0"
                >
                  <span>Revise</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

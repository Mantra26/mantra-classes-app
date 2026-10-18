import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ICSE_SUBJECTS } from '../../data/icseCurriculum';
import { SubjectId } from '../../types';
import {
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  Trash2,
  Eye,
  Award,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const PerformanceAnalytics: React.FC = () => {
  const {
    testAttempts,
    deleteTestAttempt,
    openScorecardForAttempt,
    startRemedialTest,
    goToChapterDetail,
    filteredSubjects
  } = useApp();

  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<SubjectId | 'all'>('all');

  const filteredAttempts = selectedSubjectFilter === 'all'
    ? testAttempts
    : testAttempts.filter(a => a.subjectId === selectedSubjectFilter);

  // Overall stats
  const totalTests = testAttempts.length;
  const avgPercentage = totalTests > 0
    ? Math.round((testAttempts.reduce((sum, a) => sum + a.percentage, 0) / totalTests) * 10) / 10
    : 0;
  const avgAccuracy = totalTests > 0
    ? Math.round(testAttempts.reduce((sum, a) => sum + a.accuracy, 0) / totalTests)
    : 0;

  // Aggregate all weak topics
  const allWeakAreas = testAttempts.flatMap(a => (a.weakAreas || []).map(w => ({ ...w, attemptId: a.id })));

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              Diagnostic Analytics
            </span>
            <span className="text-xs text-slate-400">Class 7 ICSE Evaluation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Performance Analytics & Scorecard Archives
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1">
            Track your ICSE examination scores over time, inspect error patterns, and drill down on topics that need hard work.
          </p>
        </div>

        {allWeakAreas.length > 0 && (
          <button
            onClick={() => startRemedialTest(testAttempts[0].id)}
            className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 whitespace-nowrap self-start md:self-auto"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Launch Remedial Test</span>
          </button>
        )}
      </div>

      {/* Top 3 Diagnostic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{avgPercentage}%</div>
            <div className="text-xs font-semibold text-slate-500">Cumulative Percentage</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{avgAccuracy}%</div>
            <div className="text-xs font-semibold text-slate-500">Average Accuracy Rate</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{allWeakAreas.length}</div>
            <div className="text-xs font-semibold text-slate-500">Flagged Weak Concepts</div>
          </div>
        </div>
      </div>

      {/* Topics Where Student Should Work Hard */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Mastery Analysis: Topics to Work Hard On
            </h3>
            <p className="text-xs text-slate-500">
              Specific topics with wrong answers detected across all test attempts
            </p>
          </div>
          <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
            Action Priority
          </span>
        </div>

        {allWeakAreas.length === 0 ? (
          <div className="text-center py-6 text-slate-400 text-xs">
            No weak topics recorded yet. Take tests to generate real-time diagnostic insights!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Subject & Chapter</th>
                  <th className="py-2.5 px-3">Weak Topic / Concept</th>
                  <th className="py-2.5 px-3">Difficulty</th>
                  <th className="py-2.5 px-3">Action Plan</th>
                  <th className="py-2.5 px-3 text-right">Revise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allWeakAreas.map((w, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-indigo-700">
                      {w.chapterTitle}
                    </td>
                    <td className="py-3 px-3 text-slate-900 font-bold">
                      {w.topic}
                      <span className="block text-[11px] font-normal text-slate-500">
                        {w.missedConcepts[0]}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          w.difficultySuggested === 'Tough'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {w.difficultySuggested}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 max-w-xs text-xs">
                      {w.recommendedAction}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => goToChapterDetail(w.chapterId)}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                      >
                        Study &gt;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Historical Test Attempts Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Historical Test Attempts & Scorecards</h3>
            <p className="text-xs text-slate-500">Inspect full question-by-question review or delete test attempts</p>
          </div>

          {/* Filter by subject */}
          <div className="flex space-x-1">
            <button
              onClick={() => setSelectedSubjectFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                selectedSubjectFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              All
            </button>
            {filteredSubjects.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedSubjectFilter(s.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  selectedSubjectFilter === s.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {s.code}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredAttempts.map(attempt => (
            <div
              key={attempt.id}
              className="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                    {attempt.testType}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(attempt.completedAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  {attempt.testTitle}
                </h4>
                <div className="text-xs text-slate-500 flex items-center gap-3">
                  <span>Score: <b>{attempt.scoredMarks}/{attempt.totalMarks}</b></span>
                  <span>Accuracy: <b>{attempt.accuracy}%</b></span>
                  <span>Grade: <b className="text-slate-700">{attempt.grade}</b></span>
                </div>
              </div>

              <div className="flex items-center space-x-2 self-end sm:self-center">
                <div className="text-lg font-black text-indigo-700 px-3 py-1 rounded-xl bg-white border border-slate-200">
                  {attempt.percentage}%
                </div>

                <button
                  onClick={() => openScorecardForAttempt(attempt)}
                  className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center space-x-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Review Scorecard</span>
                </button>

                <button
                  onClick={() => deleteTestAttempt(attempt.id)}
                  title="Delete attempt"
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

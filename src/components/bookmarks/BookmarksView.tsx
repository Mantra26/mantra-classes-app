import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ICSE_QUESTION_BANK } from '../../data/questionBank';
import {
  Bookmark,
  Trash2,
  Edit3,
  Check,
  Play,
  Sparkles,
  HelpCircle,
  Clock,
  BookOpen
} from 'lucide-react';

export const BookmarksView: React.FC = () => {
  const { bookmarks, toggleBookmark, updateBookmarkNotes, startCustomTest } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState('');

  const bookmarkedQuestions = bookmarks.map(b => {
    const q = ICSE_QUESTION_BANK.find(quest => quest.id === b.questionId);
    return {
      bookmark: b,
      question: q
    };
  }).filter(item => item.question !== undefined);

  const handleStartPractice = () => {
    if (bookmarkedQuestions.length === 0) return;
    const questions = bookmarkedQuestions.map(item => item.question!);
    const chapterIds = Array.from(new Set(questions.map(q => q.chapterId)));
    const subjectIds = Array.from(new Set(questions.map(q => q.subjectId)));

    startCustomTest({
      title: 'Practice Drill: Bookmarked Tough Questions',
      selectedSubjects: subjectIds,
      selectedChapterIds: chapterIds,
      questionCount: questions.length,
      difficultyRatio: 'mostly_tough',
      questionTypes: ['mcq', 'true_false', 'fill_blank', 'short_answer', 'long_answer'],
      durationMinutes: Math.max(15, questions.length * 2)
    });
  };

  const handleSaveNotes = (questionId: string) => {
    updateBookmarkNotes(questionId, notesDraft);
    setEditingId(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Revision Vault
            </span>
            <span className="text-xs text-slate-400">Class 7 ICSE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Saved Tough Questions & Revision Notes
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1">
            Revisit intricate numericals, tricky grammar conversions, and conceptual biology questions you starred during practice.
          </p>
        </div>

        {bookmarkedQuestions.length > 0 && (
          <button
            onClick={handleStartPractice}
            className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 whitespace-nowrap self-start sm:self-auto"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Practice These ({bookmarkedQuestions.length} Qs)</span>
          </button>
        )}
      </div>

      {bookmarkedQuestions.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center">
            <Bookmark className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Saved Questions Yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Click the bookmark ribbon icon on any tough question during a test or in your scorecard to save it here for last-minute exam revision.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarkedQuestions.map(({ bookmark, question }) => {
            if (!question) return null;
            const isEditing = editingId === question.id;

            return (
              <div
                key={bookmark.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4 hover:border-amber-300 transition-all"
              >
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
                      {question.chapterTitle}
                    </span>
                    <span className="text-xs text-slate-400">• {question.topic}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        question.difficulty === 'Tough'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {question.difficulty}
                    </span>

                    <button
                      onClick={() => toggleBookmark(question.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                  {question.text}
                </div>

                {/* Mantra Hint */}
                <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 font-medium">
                  <span className="font-bold text-amber-900">💡 Uma Ma'am's Hint: </span>
                  {question.mantraHint}
                </div>

                {/* Student Personal Revision Notes */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Your Personal Revision Note:</span>
                    {!isEditing && (
                      <button
                        onClick={() => {
                          setEditingId(question.id);
                          setNotesDraft(bookmark.studentNotes || '');
                        }}
                        className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-semibold"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>{bookmark.studentNotes ? 'Edit Note' : 'Add Note'}</span>
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-2">
                      <textarea
                        rows={2}
                        value={notesDraft}
                        onChange={e => setNotesDraft(e.target.value)}
                        placeholder="Write personal memory tips, formula reminders, or tricky signs..."
                        className="w-full p-3 rounded-xl border border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none text-xs text-slate-800"
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveNotes(question.id)}
                          className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center space-x-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>Save Note</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    bookmark.studentNotes && (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 italic">
                        "{bookmark.studentNotes}"
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

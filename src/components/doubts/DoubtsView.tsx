import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ICSE_CHAPTERS } from '../../data/icseCurriculum';
import {
  HelpCircle,
  Plus,
  CheckCircle2,
  Clock,
  Trash2,
  Sparkles,
  Send,
  MessageSquare
} from 'lucide-react';

export const DoubtsView: React.FC = () => {
  const {
    doubts,
    addDoubtNote,
    toggleDoubtStatus,
    deleteDoubtNote
  } = useApp();

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState(ICSE_CHAPTERS[0].id);
  const [topicInput, setTopicInput] = useState('');
  const [noteInput, setNoteInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    const ch = ICSE_CHAPTERS.find(c => c.id === selectedChapterId);
    addDoubtNote(selectedChapterId, topicInput || ch?.title || 'General Doubt', noteInput);
    setTopicInput('');
    setNoteInput('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              Personalized Guidance Desk
            </span>
            <span className="text-xs text-slate-400">Direct with Uma Shukla</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Doubts & Conceptual Clarifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1">
            Ask specific questions regarding difficult steps, definitions, or exam questions. Uma Ma'am reviews every query to ensure 100% clarity.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Close Form' : 'Ask New Doubt'}</span>
        </button>
      </div>

      {/* Add Doubt Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border-2 border-indigo-200 p-6 shadow-md space-y-4 animate-in fade-in duration-200"
        >
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            <span>Submit a Doubt to Uma Ma'am</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Select Chapter:
              </label>
              <select
                value={selectedChapterId}
                onChange={e => setSelectedChapterId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-xs sm:text-sm text-slate-800 font-medium"
              >
                {ICSE_CHAPTERS.map(ch => (
                  <option key={ch.id} value={ch.id}>
                    {ch.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Specific Topic or Question No.:
              </label>
              <input
                type="text"
                value={topicInput}
                onChange={e => setTopicInput(e.target.value)}
                placeholder="e.g., Integer Signs in Q4 or Normal Angle in Reflection"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-xs sm:text-sm text-slate-800 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Your Question in Detail:
            </label>
            <textarea
              rows={3}
              required
              value={noteInput}
              onChange={e => setNoteInput(e.target.value)}
              placeholder="Explain where you got stuck or what step is confusing..."
              className="w-full p-3.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-xs sm:text-sm text-slate-800 font-medium"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Query</span>
            </button>
          </div>
        </form>
      )}

      {/* Doubts List */}
      <div className="space-y-4">
        {doubts.map(item => {
          const isResolved = item.status === 'resolved';

          return (
            <div
              key={item.id}
              className={`p-5 sm:p-6 rounded-3xl border transition-all space-y-3 ${
                isResolved
                  ? 'bg-white border-slate-200'
                  : 'bg-indigo-50/30 border-indigo-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
                    {item.chapterTitle}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">• {item.questionOrTopic}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleDoubtStatus(item.id)}
                    className={`text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 transition-colors ${
                      isResolved
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isResolved ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Resolved by Uma Ma'am</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Under Review</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => deleteDoubtNote(item.id)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    title="Delete doubt"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-sm font-medium text-slate-800 leading-relaxed">
                {item.noteText}
              </div>

              {/* Mentor Feedback Simulation */}
              {isResolved && (
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 font-medium space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold text-amber-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                    <span>Uma Shukla's Clarification:</span>
                  </div>
                  <p className="leading-relaxed text-slate-700">
                    Excellent inquiry! Remember to isolate the sign before expanding the bracket in Class 7 ICSE tests. Review our solved examples in Chapter 1 video at timestamp 11:30.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

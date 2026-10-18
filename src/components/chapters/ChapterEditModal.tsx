import React, { useState, useEffect } from 'react';
import { Chapter } from '../../types';
import {
  X,
  Save,
  Plus,
  Trash2,
  BookOpen,
  Sparkles,
  Lock,
  Unlock,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface ChapterEditModalProps {
  isOpen: boolean;
  chapter: Chapter | null;
  onClose: () => void;
  onSave: (chapterId: string, updates: Partial<Chapter>) => void;
}

export const ChapterEditModal: React.FC<ChapterEditModalProps> = ({
  isOpen,
  chapter,
  onClose,
  onSave
}) => {
  if (!isOpen || !chapter) return null;

  const [title, setTitle] = useState(chapter.title);
  const [chapterNumber, setChapterNumber] = useState(chapter.chapterNumber);
  const [summary, setSummary] = useState(chapter.summary);
  const [keyConcepts, setKeyConcepts] = useState<string[]>(chapter.keyConcepts || []);
  const [newConcept, setNewConcept] = useState('');
  const [formulas, setFormulas] = useState<{ term: string; definition: string }[]>(
    chapter.keyFormulasOrTerms || []
  );
  const [newTerm, setNewTerm] = useState('');
  const [newDef, setNewDef] = useState('');
  const [isLocked, setIsLocked] = useState(chapter.isLocked || false);
  const [mindMapSummary, setMindMapSummary] = useState(chapter.mindMapSummary || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (chapter) {
      setTitle(chapter.title);
      setChapterNumber(chapter.chapterNumber);
      setSummary(chapter.summary);
      setKeyConcepts(chapter.keyConcepts || []);
      setFormulas(chapter.keyFormulasOrTerms || []);
      setIsLocked(chapter.isLocked || false);
      setMindMapSummary(chapter.mindMapSummary || '');
      setSavedSuccess(false);
    }
  }, [chapter]);

  const handleAddConcept = () => {
    if (!newConcept.trim()) return;
    setKeyConcepts(prev => [...prev, newConcept.trim()]);
    setNewConcept('');
  };

  const handleRemoveConcept = (index: number) => {
    setKeyConcepts(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddFormula = () => {
    if (!newTerm.trim() || !newDef.trim()) return;
    setFormulas(prev => [...prev, { term: newTerm.trim(), definition: newDef.trim() }]);
    setNewTerm('');
    setNewDef('');
  };

  const handleRemoveFormula = (index: number) => {
    setFormulas(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Chapter title is required.');
      return;
    }

    const updates: Partial<Chapter> = {
      title: title.trim(),
      chapterNumber: Number(chapterNumber) || 1,
      summary: summary.trim(),
      keyConcepts,
      keyFormulasOrTerms: formulas,
      isLocked,
      mindMapSummary: mindMapSummary.trim() || undefined
    };

    onSave(chapter.id, updates);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  Director Content Editor
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {chapter.id}</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                Edit Curriculum: {chapter.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {savedSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center space-x-2 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>Chapter syllabus and content successfully updated in system storage!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-1 space-y-1">
              <label className="text-xs font-bold text-slate-700">Chapter No.</label>
              <input
                type="number"
                min="1"
                max="50"
                value={chapterNumber}
                onChange={e => setChapterNumber(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="sm:col-span-3 space-y-1">
              <label className="text-xs font-bold text-slate-700">Chapter Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g. Integers & Operations"
              />
            </div>
          </div>

          {/* Chapter Summary */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Syllabus Summary & Lesson Overview</label>
            <textarea
              rows={3}
              value={summary}
              onChange={e => setSummary(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none resize-none leading-relaxed"
              placeholder="Provide a thorough pedagogical description of the concepts taught in this unit..."
            />
          </div>

          {/* Key Concepts */}
          <div className="space-y-2 border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Core Pedagogical Concepts ({keyConcepts.length})</span>
              </label>
              <span className="text-[11px] text-slate-400">High-yield study points shown to students</span>
            </div>

            <div className="space-y-2">
              {keyConcepts.map((concept, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700"
                >
                  <span className="leading-relaxed flex-1">{concept}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveConcept(idx)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newConcept}
                onChange={e => setNewConcept(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddConcept();
                  }
                }}
                placeholder="Add a new key concept bullet point..."
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddConcept}
                className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl font-bold text-xs flex items-center space-x-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Formulas / Grammar Rules / Terms */}
          <div className="space-y-2 border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                Key Formulas, Definitions & Grammar Rules ({formulas.length})
              </label>
              <span className="text-[11px] text-slate-400">Important terms highlighted in the revision guide</span>
            </div>

            <div className="space-y-2">
              {formulas.map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-slate-800"
                >
                  <div className="flex-1">
                    <span className="font-bold text-amber-900">{f.term}: </span>
                    <span className="text-slate-600">{f.definition}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFormula(idx)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1">
              <input
                type="text"
                value={newTerm}
                onChange={e => setNewTerm(e.target.value)}
                placeholder="Term / Rule (e.g. Lat Lakar)"
                className="sm:col-span-2 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                type="text"
                value={newDef}
                onChange={e => setNewDef(e.target.value)}
                placeholder="Formula or Definition description..."
                className="sm:col-span-2 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddFormula}
                className="sm:col-span-1 px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-bold text-xs flex items-center justify-center space-x-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Rule</span>
              </button>
            </div>
          </div>

          {/* Student Access Lock Toggle */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  isLocked ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  {isLocked ? 'Module Locked for Free Users' : 'Module Open for Demo Access'}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {isLocked
                    ? 'Students must have an authorized Pro Pass to unlock this unit.'
                    : 'Any registered student can access lesson notes and take trial diagnostic.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsLocked(!isLocked)}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                isLocked
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
              }`}
            >
              {isLocked ? '🔒 Locked' : '🔓 Unlocked'}
            </button>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-100 transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Curriculum Updates</span>
          </button>
        </div>
      </div>
    </div>
  );
};

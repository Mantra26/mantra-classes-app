import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ICSE_SUBJECTS } from '../../data/icseCurriculum';
import { ICSE_QUESTION_BANK } from '../../data/questionBank';
import { ChapterResource } from '../../types';
import { PptSlideViewerModal } from './PptSlideViewerModal';
import {
  ChevronLeft,
  BookOpen,
  Sparkles,
  PlayCircle,
  FlaskConical,
  GraduationCap,
  FileText,
  HelpCircle,
  CheckCircle2,
  Send,
  Lock,
  ArrowRight,
  Presentation,
  Download,
  X
} from 'lucide-react';

export const ChapterDetailView: React.FC = () => {
  const {
    selectedChapterId,
    filteredChapters,
    setView,
    startChapterTest,
    setActiveVideo,
    setActiveLabType,
    user,
    openPaymentModal,
    addDoubtNote,
    currentRole,
    activeGrade,
    activeBoard
  } = useApp();

  const [doubtText, setDoubtText] = useState('');
  const [doubtSubmitted, setDoubtSubmitted] = useState(false);
  const [activePptModal, setActivePptModal] = useState<ChapterResource | null>(null);

  const chapter = filteredChapters.find(c => c.id === selectedChapterId) || filteredChapters[0];
  const subject = ICSE_SUBJECTS.find(s => s.id === chapter?.subjectId);
  const questions = ICSE_QUESTION_BANK.filter(q => q.chapterId === chapter?.id);

  if (!chapter) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <p className="text-slate-500 font-medium">No chapter selected or found for this class.</p>
        <button
          onClick={() => setView('subjects')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold"
        >
          Back to Subjects
        </button>
      </div>
    );
  }

  const handleAskDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtText.trim()) return;
    addDoubtNote(chapter.id, chapter.title, doubtText);
    setDoubtText('');
    setDoubtSubmitted(true);
    setTimeout(() => setDoubtSubmitted(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Back Navigation */}
      <button
        onClick={() => setView('subjects')}
        className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Subjects & Lessons</span>
      </button>

      {/* Chapter Hero Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
              {subject?.name} • Chapter {chapter.chapterNumber}
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              {activeBoard} {activeGrade === '11' || activeGrade === '12' ? `Class ${activeGrade} Commerce` : `Grade ${activeGrade}`} English Medium
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {chapter.title}
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            {chapter.summary}
          </p>
        </div>

        <button
          onClick={() => startChapterTest(chapter.id)}
          className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-200 transition-all active:scale-95 whitespace-nowrap self-start md:self-auto"
        >
          <GraduationCap className="w-5 h-5" />
          <span>Take Chapter Test ({questions.length} Qs)</span>
        </button>
      </div>

      {/* Video, PPT & Interactive Graphical Presentations Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 fill-amber-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Video Lectures, PPT Slides & Visual Labs</h3>
              <p className="text-xs text-slate-500">Materials published by Director Uma Shukla & verified faculty</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapter.resources.map((res, rIdx) => {
            const isVideo = res.type === 'video';
            const isLab = res.type === 'graphical_lab';
            const isPpt = res.type === 'ppt_presentation';

            return (
              <div
                key={rIdx}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        isVideo
                          ? 'bg-rose-50 text-rose-700 border border-rose-100'
                          : isPpt
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                          : isLab
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}
                    >
                      {isVideo ? 'HD Video Lecture' : isPpt ? 'PPT Presentation' : isLab ? 'Interactive Lab' : 'Formula Sheet'}
                    </span>
                    <div className="flex items-center space-x-1.5">
                      {res.approvalStatus === 'pending_approval' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                          Pending Review
                        </span>
                      )}
                      {res.approvalStatus === 'rejected' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                          Needs Revision
                        </span>
                      )}
                      <span className="text-xs text-slate-400 font-mono">
                        {res.durationOrPages}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-indigo-600 transition-colors">
                    {res.title}
                  </h4>
                  {res.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                      {res.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100">
                  {isVideo && (
                    <button
                      onClick={() => setActiveVideo(res)}
                      className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-xs"
                    >
                      <PlayCircle className="w-4 h-4 text-amber-400" />
                      <span>Watch Video Lecture</span>
                    </button>
                  )}

                  {isPpt && (
                    <button
                      onClick={() => setActivePptModal(res)}
                      className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs transition-all shadow-xs"
                    >
                      <Presentation className="w-4 h-4 text-amber-300" />
                      <span>View Full PPT Slides ({res.slides?.length || 6} Slides)</span>
                    </button>
                  )}

                  {isLab && (
                    <button
                      onClick={() => res.labType && setActiveLabType(res.labType)}
                      className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition-all shadow-xs"
                    >
                      <FlaskConical className="w-4 h-4" />
                      <span>Launch Visual Lab</span>
                    </button>
                  )}

                  {!isVideo && !isLab && !isPpt && (
                    <button
                      onClick={() => alert(`Downloading ${res.title}...`)}
                      className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                    >
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <span>Download Notes</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Concepts Checklist */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-900 text-base">Key Concepts to Master for ICSE Grade 7</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {chapter.keyConcepts.map((concept, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3 text-xs sm:text-sm text-slate-800"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{concept}</span>
            </div>
          ))}
        </div>
      </div>

      {/* High-Yield Formulas & Definitions Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-base">Essential Terms & Exam Definitions</h3>
          <span className="text-xs text-slate-400">Class 7 ICSE Board Standard</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px]">
                <th className="py-2.5 px-3">Term / Formula</th>
                <th className="py-2.5 px-3">ICSE Definition & Explanation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {chapter.keyFormulasOrTerms.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-bold text-indigo-700 whitespace-nowrap">
                    {item.term}
                  </td>
                  <td className="py-3 px-3 text-slate-700 leading-relaxed">
                    {item.definition}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ask Doubt to Uma Shukla Box */}
      <div className="bg-gradient-to-br from-indigo-50/70 via-white to-amber-50/60 rounded-3xl border border-indigo-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Have a Doubt in this Chapter?</h3>
            <p className="text-xs text-slate-500">
              Submit your specific question directly to Uma Shukla for personal guidance and feedback.
            </p>
          </div>
        </div>

        {doubtSubmitted ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Your doubt has been submitted to Uma Ma'am! You can track its reply in the "Doubts" tab.</span>
          </div>
        ) : (
          <form onSubmit={handleAskDoubt} className="space-y-3">
            <textarea
              rows={3}
              value={doubtText}
              onChange={e => setDoubtText(e.target.value)}
              placeholder="e.g., Ma'am, in this chapter could you explain why the sign changes when transposing across the equal sign?"
              className="w-full p-3.5 rounded-2xl border border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 text-xs sm:text-sm font-medium transition-all"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!doubtText.trim()}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Doubt</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Real Multi-Slide PPT Presentation Modal */}
      <PptSlideViewerModal
        pptResource={activePptModal}
        onClose={() => setActivePptModal(null)}
      />
    </div>
  );
};

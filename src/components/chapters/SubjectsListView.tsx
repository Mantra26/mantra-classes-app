import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ICSE_SUBJECTS, ICSE_CHAPTERS } from '../../data/icseCurriculum';
import { SubjectId } from '../../types';
import {
  BookOpen,
  ChevronRight,
  Sparkles,
  FlaskConical,
  PlayCircle,
  GraduationCap,
  ArrowRight
} from 'lucide-react';

export const SubjectsListView: React.FC = () => {
  const {
    selectedSubjectId,
    setSelectedSubjectId,
    goToChapterDetail,
    startSubjectTest,
    activeGrade,
    activeBoard,
    filteredSubjects,
    filteredChapters
  } = useApp();

  const [filterSubject, setFilterSubject] = useState<SubjectId>(selectedSubjectId || filteredSubjects[0]?.id || 'mathematics');

  const currentSubject = filteredSubjects.find(s => s.id === filterSubject) || filteredSubjects[0] || ICSE_SUBJECTS[0];
  const chapters = filteredChapters.filter(c => c.subjectId === currentSubject.id);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              {activeBoard} {activeGrade === '11' || activeGrade === '12' ? `Class ${activeGrade} Commerce` : `Grade ${activeGrade}`} Curriculum
            </span>
            <span className="text-xs text-slate-400">English Medium Syllabus</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Subjects & Chapter Study Guides
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1">
            {activeGrade === '11' || activeGrade === '12'
              ? `Master Class ${activeGrade} CBSE Commerce subjects: Accountancy, Business Studies, and Economics with NCERT-aligned notes, 6-slide PPT decks, and video masterclasses.`
              : `Explore Grade ${activeGrade} subjects including Computer Applications with in-depth notes, high-yield definitions, video lectures, and slide presentations.`}
          </p>
        </div>

        <button
          onClick={() => startSubjectTest(filterSubject)}
          className="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 whitespace-nowrap self-start md:self-auto"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Take Full {currentSubject.name} Mock</span>
        </button>
      </div>

      {/* Subject Horizontal Selector Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {filteredSubjects.map(sub => {
          const isSelected = filterSubject === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => {
                setFilterSubject(sub.id);
                setSelectedSubjectId(sub.id);
              }}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <span>{sub.name}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {sub.chapterCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Chapters Grid for Selected Subject */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{currentSubject.name} Chapters</h3>
            <p className="text-xs text-slate-500">{currentSubject.description}</p>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {chapters.length} Lessons Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {chapters.map(ch => {
            const hasVideo = ch.resources.some(r => r.type === 'video');
            const hasLab = ch.resources.some(r => r.type === 'graphical_lab');

            return (
              <div
                key={ch.id}
                onClick={() => goToChapterDetail(ch.id)}
                className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:border-indigo-400 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                      Chapter {ch.chapterNumber}
                    </span>
                    <div className="flex items-center space-x-1.5">
                      {hasLab && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-0.5">
                          <FlaskConical className="w-3 h-3 text-emerald-600" />
                          Lab
                        </span>
                      )}
                      {hasVideo && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-100 flex items-center gap-0.5">
                          <PlayCircle className="w-3 h-3 text-rose-600" />
                          Video
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-base mb-2">
                    {ch.title}
                  </h4>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                    {ch.summary}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    {ch.keyConcepts.slice(0, 2).map((conc, cIdx) => (
                      <div key={cIdx} className="text-[11px] text-slate-600 flex items-start space-x-1.5">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span className="line-clamp-1">{conc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-800">
                  <span>Explore Study Guide & Notes</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

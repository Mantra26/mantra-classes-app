import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ICSE_SUBJECTS, ICSE_CHAPTERS } from '../../data/icseCurriculum';
import { ICSE_QUESTION_BANK } from '../../data/questionBank';
import { SubjectId, QuestionType, CustomTestConfig } from '../../types';
import {
  Sparkles,
  CheckSquare,
  Square,
  Clock,
  Layers,
  Zap,
  BookmarkPlus,
  Trash2,
  Play,
  RotateCcw,
  CheckCircle2,
  Info
} from 'lucide-react';

export const CustomTestBuilder: React.FC = () => {
  const {
    startCustomTest,
    customPresets,
    saveCustomPreset,
    deleteCustomPreset,
    activeGrade,
    activeBoard,
    filteredSubjects,
    filteredChapters
  } = useApp();

  // Builder State
  const [testTitle, setTestTitle] = useState(
    activeGrade === '11' || activeGrade === '12'
      ? `Class ${activeGrade} Commerce Mock Challenge`
      : `Grade ${activeGrade} ${activeBoard} Mock Exam`
  );

  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>(() => {
    return filteredSubjects.length > 0 ? [filteredSubjects[0].id] : ['accountancy'];
  });

  const [selectedChapterIds, setSelectedChapterIds] = useState<string[]>(() => {
    const firstSub = filteredSubjects[0]?.id;
    const initialChapters = filteredChapters.filter(c => c.subjectId === firstSub);
    return initialChapters.slice(0, 3).map(c => c.id);
  });

  // Re-align subject & chapter selection when board or grade changes
  React.useEffect(() => {
    if (filteredSubjects.length > 0) {
      const validSubs = selectedSubjects.filter(subId => filteredSubjects.some(s => s.id === subId));
      if (validSubs.length === 0) {
        const newFirst = filteredSubjects[0].id;
        setSelectedSubjects([newFirst]);
        const chaps = filteredChapters.filter(c => c.subjectId === newFirst);
        setSelectedChapterIds(chaps.slice(0, 3).map(c => c.id));
      } else {
        // Keep valid ones and make sure at least one chapter is selected
        const validChaps = selectedChapterIds.filter(cid => filteredChapters.some(c => c.id === cid));
        if (validChaps.length === 0) {
          const chaps = filteredChapters.filter(c => validSubs.includes(c.subjectId));
          setSelectedChapterIds(chaps.slice(0, 3).map(c => c.id));
        } else {
          setSelectedChapterIds(validChaps);
        }
      }
      setTestTitle(
        activeGrade === '11' || activeGrade === '12'
          ? `Class ${activeGrade} Commerce Mock Challenge`
          : `Grade ${activeGrade} ${activeBoard} Mock Exam`
      );
    }
  }, [activeGrade, activeBoard, filteredSubjects, filteredChapters]);

  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([
    'mcq',
    'true_false',
    'fill_blank',
    'short_answer',
    'long_answer'
  ]);
  const [difficultyRatio, setDifficultyRatio] = useState<'balanced' | 'mostly_average' | 'mostly_tough'>('balanced');
  const [durationMinutes, setDurationMinutes] = useState<number>(25);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [presetSaveMsg, setPresetSaveMsg] = useState('');

  // Toggle subject
  const toggleSubject = (subId: SubjectId) => {
    if (selectedSubjects.includes(subId)) {
      if (selectedSubjects.length === 1) return; // keep at least 1
      setSelectedSubjects(selectedSubjects.filter(s => s !== subId));
      // remove chapters belonging to this subject
      const subjectChapters = filteredChapters.filter(c => c.subjectId === subId).map(c => c.id);
      setSelectedChapterIds(selectedChapterIds.filter(id => !subjectChapters.includes(id)));
    } else {
      setSelectedSubjects([...selectedSubjects, subId]);
      // auto add first chapter of added subject
      const firstChap = filteredChapters.find(c => c.subjectId === subId);
      if (firstChap && !selectedChapterIds.includes(firstChap.id)) {
        setSelectedChapterIds([...selectedChapterIds, firstChap.id]);
      }
    }
  };

  // Toggle chapter
  const toggleChapter = (chapterId: string) => {
    if (selectedChapterIds.includes(chapterId)) {
      if (selectedChapterIds.length === 1) return; // Keep at least one chapter
      setSelectedChapterIds(selectedChapterIds.filter(id => id !== chapterId));
    } else {
      setSelectedChapterIds([...selectedChapterIds, chapterId]);
    }
  };

  // Select / Deselect all visible chapters
  const selectAllChapters = () => {
    const visibleChapters = filteredChapters.filter(c => selectedSubjects.includes(c.subjectId)).map(c => c.id);
    setSelectedChapterIds(Array.from(new Set([...selectedChapterIds, ...visibleChapters])));
  };

  const deselectAllChapters = () => {
    // Keep at least the first chapter
    const first = filteredChapters.find(c => selectedSubjects.includes(c.subjectId));
    setSelectedChapterIds(first ? [first.id] : []);
  };

  // Toggle question types
  const toggleQuestionType = (type: QuestionType) => {
    if (questionTypes.includes(type)) {
      if (questionTypes.length === 1) return;
      setQuestionTypes(questionTypes.filter(t => t !== type));
    } else {
      setQuestionTypes([...questionTypes, type]);
    }
  };

  // Calculate matching question count in real time
  const matchingQuestions = ICSE_QUESTION_BANK.filter(q => {
    const matchSub = selectedSubjects.includes(q.subjectId);
    const matchChap = selectedChapterIds.includes(q.chapterId);
    const matchType = questionTypes.includes(q.type);
    return matchSub && matchChap && matchType;
  });

  const handleLaunch = () => {
    const config: CustomTestConfig = {
      title: testTitle || 'Custom Multi-Chapter Assessment',
      selectedSubjects,
      selectedChapterIds,
      questionCount,
      difficultyRatio,
      questionTypes,
      durationMinutes
    };
    startCustomTest(config);
  };

  const handleSavePreset = () => {
    const newPreset: CustomTestConfig = {
      title: testTitle || 'My Custom Configuration',
      selectedSubjects,
      selectedChapterIds,
      questionCount,
      difficultyRatio,
      questionTypes,
      durationMinutes
    };
    saveCustomPreset(newPreset);
    setPresetSaveMsg('Custom test preset saved to your profile!');
    setTimeout(() => setPresetSaveMsg(''), 3000);
  };

  const loadPreset = (preset: CustomTestConfig) => {
    setTestTitle(preset.title);
    setSelectedSubjects(preset.selectedSubjects);
    setSelectedChapterIds(preset.selectedChapterIds);
    setQuestionCount(preset.questionCount);
    setDifficultyRatio(preset.difficultyRatio);
    setQuestionTypes(preset.questionTypes);
    setDurationMinutes(preset.durationMinutes);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>Personalized Test Engine</span>
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              {activeBoard} {activeGrade === '11' || activeGrade === '12' ? `Class ${activeGrade} Commerce` : `Grade ${activeGrade}`} English Medium
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Custom Multi-Chapter Test Builder
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1">
            Build your own mock exam: select exact chapters from one or multiple subjects, tune question formats, choose tough vs average difficulty balance, and test yourself on your weak spots.
          </p>
        </div>

        {/* Live Matching Pool Counter */}
        <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-center min-w-[140px] self-start sm:self-auto">
          <div className="text-2xl font-black text-indigo-700">{matchingQuestions.length}</div>
          <div className="text-[11px] font-semibold text-indigo-900">Questions Available</div>
        </div>
      </div>

      {/* Preset Pills if any saved */}
      {customPresets.length > 0 && (
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>Saved Test Presets ({customPresets.length})</span>
            <span className="text-[11px] font-normal text-slate-400">Click to quickly load</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {customPresets.map(preset => (
              <div
                key={preset.id}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-indigo-400 transition-all"
              >
                <button
                  type="button"
                  onClick={() => loadPreset(preset)}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {preset.title} ({preset.questionCount}Q • {preset.durationMinutes}m)
                </button>
                <button
                  type="button"
                  onClick={() => preset.id && deleteCustomPreset(preset.id)}
                  className="text-slate-300 hover:text-rose-500 transition-colors p-0.5"
                  title="Delete preset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Builder Form Sections */}
      <div className="space-y-6">
        {/* Step 1: Test Name & Subjects */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
            <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              1
            </span>
            <h3 className="text-base font-bold text-slate-900">Name Your Test & Pick Subjects</h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Custom Test Title
              </label>
              <input
                type="text"
                value={testTitle}
                onChange={e => setTestTitle(e.target.value)}
                placeholder="e.g., Mathematics & Physics Combined Mock Exam"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-900 font-semibold text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                Select Subjects to Combine:
              </label>
              <div className="flex flex-wrap gap-2">
                {filteredSubjects.map(subject => {
                  const isSelected = selectedSubjects.includes(subject.id);
                  return (
                    <button
                      key={subject.id}
                      type="button"
                      onClick={() => toggleSubject(subject.id)}
                      className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-500/20'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>{subject.name}</span>
                      {isSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Chapter Selector */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                2
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">Select Specific Chapters</h3>
                <span className="text-xs text-slate-400">
                  {selectedChapterIds.length} Chapters Selected
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={selectAllChapters}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                Select All
              </button>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={deselectAllChapters}
                className="text-xs font-medium text-slate-500 hover:text-slate-700"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Group chapters by selected subject */}
          <div className="space-y-4">
            {selectedSubjects.map(subId => {
              const sub = filteredSubjects.find(s => s.id === subId) || ICSE_SUBJECTS.find(s => s.id === subId);
              const chapters = filteredChapters.filter(c => c.subjectId === subId);

              return (
                <div key={subId} className="space-y-2">
                  <div className="text-xs font-bold text-indigo-800 bg-indigo-50/60 px-3 py-1 rounded-lg flex items-center justify-between">
                    <span>{sub?.name}</span>
                    <span className="text-[11px] font-normal text-slate-500">{chapters.length} Lessons</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {chapters.map(ch => {
                      const isSelected = selectedChapterIds.includes(ch.id);
                      return (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => toggleChapter(ch.id)}
                          className={`p-3 rounded-2xl border text-left transition-all flex items-start justify-between gap-2 ${
                            isSelected
                              ? 'bg-indigo-50/70 border-indigo-500 text-indigo-950 font-bold shadow-xs'
                              : 'bg-slate-50/50 hover:bg-slate-100 border-slate-200 text-slate-700'
                          }`}
                        >
                          <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase">
                              Ch {ch.chapterNumber}
                            </div>
                            <div className="text-xs sm:text-sm leading-snug">{ch.title}</div>
                          </div>
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Question Formats & Difficulty Balance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Question Formats */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                3
              </span>
              <h3 className="text-base font-bold text-slate-900">Question Formats</h3>
            </div>

            <div className="space-y-2">
              {[
                { type: 'mcq' as QuestionType, label: 'Multiple Choice (MCQ)', desc: '4 options, conceptual reasoning' },
                { type: 'true_false' as QuestionType, label: 'True / False', desc: 'Binary logic evaluation' },
                { type: 'fill_blank' as QuestionType, label: 'Fill in the Blanks', desc: 'Precise formula / terms typing' },
                { type: 'short_answer' as QuestionType, label: 'Short Answer (2-3 Marks)', desc: 'Reasoning and definitions' },
                { type: 'long_answer' as QuestionType, label: 'Long Answer (5 Marks)', desc: 'Structured multi-part problems' },
              ].map(f => {
                const isSelected = questionTypes.includes(f.type);
                return (
                  <button
                    key={f.type}
                    type="button"
                    onClick={() => toggleQuestionType(f.type)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-indigo-50/70 border-indigo-400 font-bold text-indigo-950'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <div className="text-xs sm:text-sm">{f.label}</div>
                      <div className="text-[11px] font-normal text-slate-500">{f.desc}</div>
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty & Timing */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
              <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                4
              </span>
              <h3 className="text-base font-bold text-slate-900">Difficulty & Test Timing</h3>
            </div>

            <div className="space-y-4">
              {/* Difficulty Ratio */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  Difficulty Level Balance:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'mostly_average', label: 'Average (70%)', tag: 'Confidence Builder' },
                    { id: 'balanced', label: 'Balanced (50:50)', tag: 'Exam Standard' },
                    { id: 'mostly_tough', label: 'Tough (70%)', tag: 'High Scorer Drill' },
                  ].map(d => {
                    const isSelected = difficultyRatio === d.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDifficultyRatio(d.id as any)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-400/20'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className="text-xs">{d.label}</div>
                        <div className="text-[10px] text-slate-400">{d.tag}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Number of Questions */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>Number of Questions:</span>
                  <span className="text-indigo-600 font-extrabold">{questionCount} Questions</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 15, 20].map(cnt => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setQuestionCount(cnt)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        questionCount === cnt
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {cnt} Qs
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Minutes */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>Duration:</span>
                  <span className="text-indigo-600 font-extrabold">{durationMinutes} Minutes</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[15, 25, 40, 60].map(mins => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDurationMinutes(mins)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        durationMinutes === mins
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {mins} Mins
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="bg-white rounded-3xl border-2 border-indigo-100 p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-slate-900">
              Exam Summary: {questionCount} Questions from {selectedChapterIds.length} Chapters
            </div>
            <div className="text-xs text-slate-500">
              Duration: {durationMinutes} mins • {questionTypes.length} formats • Difficulty: {difficultyRatio}
            </div>
            {presetSaveMsg && (
              <div className="text-xs font-bold text-emerald-600 mt-1">{presetSaveMsg}</div>
            )}
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSavePreset}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-4 py-3 rounded-2xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
            >
              <BookmarkPlus className="w-4 h-4" />
              <span>Save Preset</span>
            </button>

            <button
              type="button"
              onClick={handleLaunch}
              disabled={matchingQuestions.length === 0}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-md shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Generate & Start Exam</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

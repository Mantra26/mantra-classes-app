import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ICSE_SUBJECTS } from '../../data/icseCurriculum';
import { ICSE_QUESTION_BANK } from '../../data/questionBank';
import {
  ChapterResource,
  SubjectId,
  PptSlide,
  GradeLevel,
  FacultyTestPaper,
  Question
} from '../../types';
import { PptSlideViewerModal } from '../chapters/PptSlideViewerModal';
import {
  FileText,
  Video,
  Presentation,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  Layers,
  Award,
  Sparkles,
  BookOpen,
  ChevronRight,
  X,
  UserCheck,
  ShieldAlert,
  Send,
  HelpCircle,
  Check
} from 'lucide-react';

export const FacultyPortal: React.FC = () => {
  const {
    facultyMembers,
    activeFacultyId,
    setActiveFacultyId,
    activeFacultyMember,
    facultyTests,
    submitFacultyTest,
    deleteFacultyTest,
    chapters,
    submitFacultyResource,
    deleteChapterResource,
    toggleRole,
    setActiveVideo
  } = useApp();

  // Active view tabs within faculty portal
  const [activeTab, setActiveTab] = useState<'all' | 'tests' | 'ppts' | 'videos'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Modals
  const [showTestModal, setShowTestModal] = useState(false);
  const [showPptModal, setShowPptModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [previewPpt, setPreviewPpt] = useState<ChapterResource | null>(null);
  const [previewTest, setPreviewTest] = useState<FacultyTestPaper | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  // Test form state
  const [testGrade, setTestGrade] = useState<GradeLevel>('7');
  const [testSubjectId, setTestSubjectId] = useState<SubjectId>(
    activeFacultyMember?.assignedSubjects[0] || 'computers'
  );
  const [testTitle, setTestTitle] = useState('');
  const [testInstructions, setTestInstructions] = useState(
    'Answer all questions. Show complete step-by-step working. Submit for faculty review before the due date.'
  );
  const [testDuration, setTestDuration] = useState(25);
  const [testTotalMarks, setTestTotalMarks] = useState(10);
  const [testPassingMarks, setTestPassingMarks] = useState(6);
  const [testDueDate, setTestDueDate] = useState('');
  const [selectedQIds, setSelectedQIds] = useState<string[]>([]);

  // PPT form state
  const [pptSubjectId, setPptSubjectId] = useState<SubjectId>(
    activeFacultyMember?.assignedSubjects[0] || 'computers'
  );
  const [pptChapterId, setPptChapterId] = useState('');
  const [pptTitle, setPptTitle] = useState('');
  const [pptSlidesCount, setPptSlidesCount] = useState('6 Slides');
  const [pptUrl, setPptUrl] = useState('https://docs.google.com/presentation/d/e/demo/pub');
  const [pptDescription, setPptDescription] = useState('');

  // Video form state
  const [videoSubjectId, setVideoSubjectId] = useState<SubjectId>(
    activeFacultyMember?.assignedSubjects[0] || 'computers'
  );
  const [videoChapterId, setVideoChapterId] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDuration, setVideoDuration] = useState('20 mins');
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/Fw09z85oV-k');
  const [videoDescription, setVideoDescription] = useState('');

  // Filtered chapters for selectors
  const availablePptChapters = chapters.filter(c => c.subjectId === pptSubjectId);
  const availableVideoChapters = chapters.filter(c => c.subjectId === videoSubjectId);

  // Collect all uploads by this faculty member (or all faculty uploads)
  const myTests = facultyTests.filter(
    t => t.facultyId === activeFacultyId || t.createdBy.includes(activeFacultyMember?.name || '')
  );

  const myResources: {
    resource: ChapterResource;
    chapterId: string;
    chapterTitle: string;
    subjectId: SubjectId;
  }[] = [];

  chapters.forEach(ch => {
    ch.resources.forEach(r => {
      if (
        r.facultyId === activeFacultyId ||
        r.uploadedBy?.includes(activeFacultyMember?.name || '')
      ) {
        myResources.push({
          resource: r,
          chapterId: ch.id,
          chapterTitle: ch.title,
          subjectId: ch.subjectId
        });
      }
    });
  });

  // Handle Create Test Submission
  const handleSubmitTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testTitle.trim()) return;

    const availableSubjectQuestions = ICSE_QUESTION_BANK.filter(q => q.subjectId === testSubjectId);
    const chosenQuestions =
      selectedQIds.length > 0
        ? ICSE_QUESTION_BANK.filter(q => selectedQIds.includes(q.id))
        : availableSubjectQuestions.slice(0, 4);

    const subObj = ICSE_SUBJECTS.find(s => s.id === testSubjectId);

    const newTest: FacultyTestPaper = {
      id: `test-fac-${Date.now()}`,
      title: testTitle.trim(),
      instructions: testInstructions.trim(),
      targetGrade: testGrade,
      subjectId: testSubjectId,
      subjectName: subObj?.name || 'Subject',
      chapterTitle: chosenQuestions[0]?.chapterTitle || 'Curriculum Assessment',
      durationMinutes: Number(testDuration) || 25,
      totalMarks: Number(testTotalMarks) || 10,
      passingMarks: Number(testPassingMarks) || 6,
      dueDate: testDueDate || new Date(Date.now() + 4 * 24 * 3600 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      createdBy: `${activeFacultyMember?.name || 'Faculty Member'} (Faculty)`,
      facultyId: activeFacultyId,
      facultyName: activeFacultyMember?.name || 'Faculty Member',
      questions: chosenQuestions,
      status: 'active',
      approvalStatus: 'pending_approval'
    };

    submitFacultyTest(newTest);
    setShowTestModal(false);
    setTestTitle('');
    setSelectedQIds([]);
    setToastMessage(`Test paper "${newTest.title}" submitted to Director Uma Shukla for review!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Handle Upload PPT Submission
  const handleSubmitPpt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pptTitle.trim()) return;

    const targetChapterId = pptChapterId || availablePptChapters[0]?.id;
    const targetChap = chapters.find(c => c.id === targetChapterId);

    const generatedSlides: PptSlide[] = [
      {
        slideNumber: 1,
        title: pptTitle.trim(),
        categoryTag: 'ICSE LESSON OVERVIEW',
        bullets: [
          `Key concept introduction for ${targetChap?.title || 'Chapter'}.`,
          'Council for Indian School Certificate Examinations (CISCE) Class 7 syllabus aligned.',
          'Essential learning outcomes, definitions, and technical vocabulary breakdown.'
        ],
        keyHighlight: 'Carefully study each diagram and definition to build conceptual foundations.',
        examMantra: 'Mantra: Clear definitions with keywords guarantee maximum marks.'
      },
      {
        slideNumber: 2,
        title: 'Core Principles & Mechanism Breakdown',
        categoryTag: 'DEEP DIVE CONCEPTS',
        bullets: [
          'Primary classification and fundamental governing laws.',
          'Step-by-step schematic of the underlying scientific/mathematical mechanism.',
          'Practical real-world applications and everyday ICSE exemplars.'
        ],
        keyHighlight: 'Focus on cause-and-effect relationships during revision.',
        examMantra: 'Mantra: Link textbook concepts to real-world applications.'
      },
      {
        slideNumber: 3,
        title: 'Comparative Analysis & Differentiations Table',
        categoryTag: 'HIGH-SCORING TABULAR STUDY',
        bullets: [
          'High-yield differences frequently tested in ICSE Board questions.',
          'Side-by-side contrast of key terms with exact point criteria.',
          'Clear basis of comparison for full 3-mark differentiation questions.'
        ],
        tableData: {
          headers: ['Parameter', 'Category A', 'Category B'],
          rows: [
            ['Definition', 'Primary property / operation', 'Secondary contrasting property'],
            ['Occurrence / Units', 'Standard SI / CGS notation', 'Derived or complementary form'],
            ['ICSE Example', 'Core textbook case study', 'Contrasting exemplar']
          ]
        },
        examMantra: 'Tabular answers are scored with maximum efficiency by examiners.'
      },
      {
        slideNumber: 4,
        title: 'Step-by-Step Solved Problem & Working',
        categoryTag: 'SOLVED EXAM EXEMPLAR',
        bullets: [
          'Step 1: Write Given Values clearly with appropriate symbols.',
          'Step 2: State the formula or theorem explicitly.',
          'Step 3: Show systematic algebraic or logical substitution.',
          'Step 4: Box your final answer with proper units.'
        ],
        keyHighlight: 'Step Marking Rubric: Formula (1 Mark) + Substitution (1 Mark) + Answer (1 Mark).',
        examMantra: 'Never skip intermediate steps; partial marks are always awarded.'
      },
      {
        slideNumber: 5,
        title: 'Common Student Mistakes & Traps to Avoid',
        categoryTag: 'EXAM TRAPS & PITFALLS',
        bullets: [
          'Careless calculation or algebraic sign errors under timer pressure.',
          'Failing to write SI units or proper scientific nomenclature.',
          'Confusing similar terms or omitting essential qualifying statements.'
        ],
        diagramBox: {
          label: 'Caution Checklist',
          items: [
            { term: 'Trap 1', explanation: 'Read the question twice before writing answers.' },
            { term: 'Trap 2', explanation: 'Verify all calculations during the final 5 minutes.' }
          ]
        },
        examMantra: 'Re-checking prevents careless 1-mark deductions that spoil distinction.'
      },
      {
        slideNumber: 6,
        title: `${activeFacultyMember?.name || 'Faculty'}'s Chapter Mastery Mantra`,
        categoryTag: 'FACULTY REVISION CHECKLIST',
        bullets: [
          'Revise all chapter summary cards and definitions twice every week.',
          'Solve the benchmark test paper in the Assigned Tests portal.',
          'Inspect the diagnostic weak-areas radar on your scorecard.',
          'Ask questions directly at the Doubt Desk for prompt clarification.'
        ],
        keyHighlight: 'Consistent targeted effort produces outstanding ICSE results.',
        examMantra: 'Practice with confidence, accuracy, and clear structured presentation.'
      }
    ];

    const newRes: ChapterResource = {
      type: 'ppt_presentation',
      title: pptTitle.trim(),
      durationOrPages: pptSlidesCount || '6 Slides',
      slideCount: 6,
      slides: generatedSlides,
      pptUrl: pptUrl || 'https://docs.google.com/presentation/d/e/demo/pub',
      description:
        pptDescription.trim() ||
        'Comprehensive multi-slide presentation covering definitions, comparative tables, and exam guidelines.',
      approvalStatus: 'pending_approval',
      facultyId: activeFacultyId,
      facultyName: activeFacultyMember?.name || 'Faculty Member',
      chapterId: targetChapterId,
      chapterTitle: targetChap?.title || 'Chapter Lesson',
      subjectId: pptSubjectId
    };

    submitFacultyResource(targetChapterId, newRes);
    setShowPptModal(false);
    setPptTitle('');
    setPptDescription('');
    setToastMessage(`PPT Presentation submitted to Director Uma Shukla for review!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Handle Upload Video Submission
  const handleSubmitVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim()) return;

    const targetChapterId = videoChapterId || availableVideoChapters[0]?.id;
    const targetChap = chapters.find(c => c.id === targetChapterId);

    const newRes: ChapterResource = {
      type: 'video',
      title: videoTitle.trim(),
      durationOrPages: videoDuration.trim() || '20 mins',
      videoUrl: videoUrl.trim() || 'https://www.youtube.com/embed/Fw09z85oV-k',
      description:
        videoDescription.trim() ||
        'Detailed lecture presentation explaining core concepts and step-by-step problem-solving.',
      approvalStatus: 'pending_approval',
      facultyId: activeFacultyId,
      facultyName: activeFacultyMember?.name || 'Faculty Member',
      chapterId: targetChapterId,
      chapterTitle: targetChap?.title || 'Chapter Lesson',
      subjectId: videoSubjectId
    };

    submitFacultyResource(targetChapterId, newRes);
    setShowVideoModal(false);
    setVideoTitle('');
    setVideoDescription('');
    setToastMessage(`Video Lecture submitted to Director Uma Shukla for review!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Status Filter Helper
  const filterByStatus = (status?: string) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'pending') return status === 'pending_approval';
    if (statusFilter === 'approved') return !status || status === 'approved';
    if (statusFilter === 'rejected') return status === 'rejected';
    return true;
  };

  const filteredTests = myTests.filter(t => filterByStatus(t.approvalStatus));
  const filteredPpts = myResources
    .filter(r => r.resource.type === 'ppt_presentation')
    .filter(r => filterByStatus(r.resource.approvalStatus));
  const filteredVideos = myResources
    .filter(r => r.resource.type === 'video')
    .filter(r => filterByStatus(r.resource.approvalStatus));

  const totalPending =
    myTests.filter(t => t.approvalStatus === 'pending_approval').length +
    myResources.filter(r => r.resource.approvalStatus === 'pending_approval').length;

  const totalApproved =
    myTests.filter(t => !t.approvalStatus || t.approvalStatus === 'approved').length +
    myResources.filter(r => !r.resource.approvalStatus || r.resource.approvalStatus === 'approved').length;

  const totalRejected =
    myTests.filter(t => t.approvalStatus === 'rejected').length +
    myResources.filter(r => r.resource.approvalStatus === 'rejected').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-indigo-600 text-white shadow-xl flex items-center space-x-2 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Faculty Profile Banner & Selector */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="relative flex-shrink-0">
              <img
                src={
                  activeFacultyMember?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                }
                alt={activeFacultyMember?.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-indigo-500/30 shadow-lg"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Faculty Member Portal</span>
                </span>
                <span className="text-xs text-slate-400">
                  Director: <strong>Uma Shukla</strong>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {activeFacultyMember?.name || 'Faculty Member'}
              </h2>
              <p className="text-xs sm:text-sm text-indigo-200 font-medium">
                {activeFacultyMember?.designation || 'Senior Faculty'}
              </p>

              {/* Assigned Subjects & Grades Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-400 mr-1">Assigned:</span>
                {activeFacultyMember?.assignedSubjects.map(subId => {
                  const s = ICSE_SUBJECTS.find(sub => sub.id === subId);
                  return (
                    <span
                      key={subId}
                      className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-white/10 text-white border border-white/15"
                    >
                      {s?.name || subId}
                    </span>
                  );
                })}
                {activeFacultyMember?.assignedGrades.map(g => (
                  <span
                    key={g}
                    className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-indigo-600/60 text-indigo-200 border border-indigo-400/30"
                  >
                    Grade {g}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Switch Faculty Member Selector (Quick testing across multiple teachers) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Switch Faculty Identity:
              </label>
              <select
                value={activeFacultyId}
                onChange={e => setActiveFacultyId(e.target.value)}
                className="bg-slate-900 text-white text-xs font-bold rounded-xl px-3 py-1.5 border border-slate-700 outline-none w-full cursor-pointer"
              >
                {facultyMembers.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.designation.split(' - ')[0]})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={toggleRole}
              className="px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-colors text-center"
            >
              Switch Role
            </button>
          </div>
        </div>
      </div>

      {/* Academic Moderation Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 shadow-xs flex items-start space-x-3.5">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-xs sm:text-sm font-bold text-amber-950">
            Mantra Classes Academic Moderation & Approval Workflow
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            All curriculum contributions (<strong>Test Papers</strong>, <strong>PPT Slide Decks</strong>, and <strong>Video Lectures</strong>) submitted by faculty are immediately routed to <strong>Director Uma Shukla</strong> for syllabus compliance verification. Once approved, they are automatically published to the students enrolled in those grades.
          </p>
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <button
          onClick={() => {
            setSelectedQIds([]);
            setShowTestModal(true);
          }}
          className="p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-md flex items-center justify-between group transition-all active:scale-95"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold">Upload Test Paper</div>
              <div className="text-[11px] text-indigo-200">Submit for Admin Approval</div>
            </div>
          </div>
          <Plus className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
        </button>

        <button
          onClick={() => {
            setPptChapterId(availablePptChapters[0]?.id || '');
            setShowPptModal(true);
          }}
          className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-md flex items-center justify-between group transition-all active:scale-95"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Presentation className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold">Upload PPT Deck</div>
              <div className="text-[11px] text-emerald-200">6-Slide Curated Presentation</div>
            </div>
          </div>
          <Plus className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
        </button>

        <button
          onClick={() => {
            setVideoChapterId(availableVideoChapters[0]?.id || '');
            setShowVideoModal(true);
          }}
          className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-500 hover:to-violet-600 text-white shadow-md flex items-center justify-between group transition-all active:scale-95"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold">Upload Video Lecture</div>
              <div className="text-[11px] text-purple-200">Embed Lecture Lesson</div>
            </div>
          </div>
          <Plus className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Submissions & Approval Tracker Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span>My Submissions & Moderation Status</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Track the review and release status of your curriculum contributions
            </p>
          </div>

          {/* Status Filter Badges */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                statusFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({myTests.length + myResources.length})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                statusFilter === 'pending'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-amber-700 hover:bg-amber-100/50'
              }`}
            >
              Pending Review ({totalPending})
            </button>
            <button
              onClick={() => setStatusFilter('approved')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                statusFilter === 'approved'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-700 hover:bg-emerald-100/50'
              }`}
            >
              Approved & Live ({totalApproved})
            </button>
            {totalRejected > 0 && (
              <button
                onClick={() => setStatusFilter('rejected')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                  statusFilter === 'rejected'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-rose-700 hover:bg-rose-100/50'
                }`}
              >
                Needs Revision ({totalRejected})
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs: All, Tests, PPTs, Videos */}
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            All Uploads ({filteredTests.length + filteredPpts.length + filteredVideos.length})
          </button>
          <button
            onClick={() => setActiveTab('tests')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'tests'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Test Papers ({filteredTests.length})
          </button>
          <button
            onClick={() => setActiveTab('ppts')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'ppts'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            PPT Presentations ({filteredPpts.length})
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'videos'
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Video Lectures ({filteredVideos.length})
          </button>
        </div>

        {/* Content Lists */}
        <div className="space-y-4">
          {/* TEST PAPERS */}
          {(activeTab === 'all' || activeTab === 'tests') && filteredTests.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-slate-400">
                Test Papers & Homework
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredTests.map(test => {
                  const isPending = test.approvalStatus === 'pending_approval';
                  const isApproved = !test.approvalStatus || test.approvalStatus === 'approved';
                  const isRejected = test.approvalStatus === 'rejected';

                  return (
                    <div
                      key={test.id}
                      className={`p-4 rounded-2xl border transition-all space-y-3 ${
                        isPending
                          ? 'bg-amber-50/40 border-amber-300'
                          : isRejected
                          ? 'bg-rose-50/40 border-rose-300'
                          : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                            Grade {test.targetGrade}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500">
                            {test.subjectName}
                          </span>
                        </div>

                        {/* Status Badge */}
                        {isPending && (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>Pending Uma Ma'am's Approval</span>
                          </span>
                        )}
                        {isApproved && (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Approved & Live</span>
                          </span>
                        )}
                        {isRejected && (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                            <AlertCircle className="w-3 h-3 text-rose-600" />
                            <span>Revision Requested</span>
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                          {test.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
                          <span>{test.totalMarks} Marks</span>
                          <span>•</span>
                          <span>{test.durationMinutes} mins</span>
                          <span>•</span>
                          <span>{test.questions.length} Questions</span>
                        </div>
                      </div>

                      {/* Rejection Note */}
                      {isRejected && test.rejectionReason && (
                        <div className="p-2.5 rounded-xl bg-rose-100/70 border border-rose-200 text-rose-900 text-xs">
                          <strong className="font-bold block mb-0.5">Director Uma Shukla's Feedback:</strong>
                          <span>"{test.rejectionReason}"</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <button
                          onClick={() => setPreviewTest(test)}
                          className="flex items-center space-x-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Questions</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Withdraw test "${test.title}"?`)) {
                              deleteFacultyTest(test.id);
                            }
                          }}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Withdraw Test"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PPT PRESENTATIONS */}
          {(activeTab === 'all' || activeTab === 'ppts') && filteredPpts.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-slate-400">
                PPT Slide Decks
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredPpts.map(item => {
                  const isPending = item.resource.approvalStatus === 'pending_approval';
                  const isApproved =
                    !item.resource.approvalStatus || item.resource.approvalStatus === 'approved';
                  const isRejected = item.resource.approvalStatus === 'rejected';

                  return (
                    <div
                      key={item.resource.title}
                      className={`p-4 rounded-2xl border transition-all space-y-3 ${
                        isPending
                          ? 'bg-amber-50/40 border-amber-300'
                          : isRejected
                          ? 'bg-rose-50/40 border-rose-300'
                          : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">
                          {item.chapterTitle}
                        </span>

                        {isPending && (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>Pending Review</span>
                          </span>
                        )}
                        {isApproved && (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Approved & Live</span>
                          </span>
                        )}
                        {isRejected && (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                            <AlertCircle className="w-3 h-3 text-rose-600" />
                            <span>Revision Requested</span>
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                          {item.resource.title}
                        </h4>
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                          {item.resource.description}
                        </div>
                      </div>

                      {/* Rejection Note */}
                      {isRejected && item.resource.rejectionReason && (
                        <div className="p-2.5 rounded-xl bg-rose-100/70 border border-rose-200 text-rose-900 text-xs">
                          <strong className="font-bold block mb-0.5">Director Uma Shukla's Feedback:</strong>
                          <span>"{item.resource.rejectionReason}"</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <button
                          onClick={() => setPreviewPpt(item.resource)}
                          className="flex items-center space-x-1 text-xs font-bold text-emerald-600 hover:text-emerald-800"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview 16:9 Slides</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Withdraw PPT "${item.resource.title}"?`)) {
                              deleteChapterResource(item.chapterId, item.resource.title);
                            }
                          }}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Withdraw PPT"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIDEO LECTURES */}
          {(activeTab === 'all' || activeTab === 'videos') && filteredVideos.length > 0 && (
            <div className="space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-slate-400">
                Video Lectures
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredVideos.map(item => {
                  const isPending = item.resource.approvalStatus === 'pending_approval';
                  const isApproved =
                    !item.resource.approvalStatus || item.resource.approvalStatus === 'approved';
                  const isRejected = item.resource.approvalStatus === 'rejected';

                  return (
                    <div
                      key={item.resource.title}
                      className={`p-4 rounded-2xl border transition-all space-y-3 ${
                        isPending
                          ? 'bg-amber-50/40 border-amber-300'
                          : isRejected
                          ? 'bg-rose-50/40 border-rose-300'
                          : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">
                          {item.chapterTitle}
                        </span>

                        {isPending && (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>Pending Review</span>
                          </span>
                        )}
                        {isApproved && (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Approved & Live</span>
                          </span>
                        )}
                        {isRejected && (
                          <span className="inline-flex items-center space-x-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                            <AlertCircle className="w-3 h-3 text-rose-600" />
                            <span>Revision Requested</span>
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                          {item.resource.title}
                        </h4>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Duration: {item.resource.durationOrPages}
                        </div>
                      </div>

                      {/* Rejection Note */}
                      {isRejected && item.resource.rejectionReason && (
                        <div className="p-2.5 rounded-xl bg-rose-100/70 border border-rose-200 text-rose-900 text-xs">
                          <strong className="font-bold block mb-0.5">Director Uma Shukla's Feedback:</strong>
                          <span>"{item.resource.rejectionReason}"</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <button
                          onClick={() => setActiveVideo(item.resource)}
                          className="flex items-center space-x-1 text-xs font-bold text-purple-600 hover:text-purple-800"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Watch Lecture Stream</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Withdraw Video "${item.resource.title}"?`)) {
                              deleteChapterResource(item.chapterId, item.resource.title);
                            }
                          }}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Withdraw Video"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredTests.length === 0 && filteredPpts.length === 0 && filteredVideos.length === 0 && (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-slate-700">No uploads found under this filter</div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Use the buttons above to upload test papers, PPT presentations, or video lectures for review.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ================= MODAL 1: UPLOAD TEST PAPER ================= */}
      {showTestModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Upload Test Paper for Approval</h3>
                  <p className="text-[11px] text-slate-500">
                    Dispatched to Director Uma Shukla's desk for moderation
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowTestModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitTest} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Target Grade</label>
                  <select
                    value={testGrade}
                    onChange={e => setTestGrade(e.target.value as GradeLevel)}
                    className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="12">Class 12 (CBSE Commerce)</option>
                    <option value="11">Class 11 (CBSE Commerce)</option>
                    <option value="7">Grade 7</option>
                    <option value="6">Grade 6</option>
                    <option value="5">Grade 5</option>
                    <option value="4">Grade 4</option>
                    <option value="3">Grade 3</option>
                    <option value="2">Grade 2</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Subject</label>
                  <select
                    value={testSubjectId}
                    onChange={e => setTestSubjectId(e.target.value as SubjectId)}
                    className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {ICSE_SUBJECTS.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Test Title</label>
                <input
                  type="text"
                  required
                  value={testTitle}
                  onChange={e => setTestTitle(e.target.value)}
                  placeholder="e.g. Unit Test: Binary Arithmetic & Logic Gates"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Duration (mins)</label>
                  <input
                    type="number"
                    min={5}
                    max={120}
                    value={testDuration}
                    onChange={e => setTestDuration(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Total Marks</label>
                  <input
                    type="number"
                    min={1}
                    value={testTotalMarks}
                    onChange={e => setTestTotalMarks(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Passing Marks</label>
                  <input
                    type="number"
                    min={1}
                    value={testPassingMarks}
                    onChange={e => setTestPassingMarks(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Due Date</label>
                <input
                  type="date"
                  value={testDueDate}
                  onChange={e => setTestDueDate(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Student Instructions
                </label>
                <textarea
                  rows={2}
                  value={testInstructions}
                  onChange={e => setTestInstructions(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              {/* Select Questions from Question Bank */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Select Questions ({selectedQIds.length} chosen)
                </label>
                <div className="max-h-40 overflow-y-auto border border-slate-200 rounded-xl p-2 space-y-1.5 bg-slate-50">
                  {ICSE_QUESTION_BANK.filter(q => q.subjectId === testSubjectId).map(q => {
                    const isChecked = selectedQIds.includes(q.id);
                    return (
                      <label
                        key={q.id}
                        className={`flex items-start space-x-2.5 p-2 rounded-lg cursor-pointer text-xs transition-colors ${
                          isChecked ? 'bg-indigo-50 border border-indigo-200' : 'hover:bg-slate-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            setSelectedQIds(prev =>
                              isChecked ? prev.filter(id => id !== q.id) : [...prev, q.id]
                            );
                          }}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <span className="font-bold text-slate-800 line-clamp-1">{q.text}</span>
                          <span className="text-[10px] text-slate-500">
                            {q.type.toUpperCase()} • {q.marks} Marks • {q.difficulty}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowTestModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit for Admin Approval</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: UPLOAD PPT ================= */}
      {showPptModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Presentation className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Upload PPT Slide Deck</h3>
                  <p className="text-[11px] text-slate-500">
                    6-Slide presentation submitted to Director Uma Shukla
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPptModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitPpt} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Subject</label>
                  <select
                    value={pptSubjectId}
                    onChange={e => {
                      setPptSubjectId(e.target.value as SubjectId);
                      const chaps = chapters.filter(c => c.subjectId === e.target.value);
                      setPptChapterId(chaps[0]?.id || '');
                    }}
                    className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 outline-none"
                  >
                    {ICSE_SUBJECTS.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Chapter</label>
                  <select
                    value={pptChapterId}
                    onChange={e => setPptChapterId(e.target.value)}
                    className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 outline-none"
                  >
                    {availablePptChapters.map(c => (
                      <option key={c.id} value={c.id}>
                        Ch {c.chapterNumber}: {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Presentation Title</label>
                <input
                  type="text"
                  required
                  value={pptTitle}
                  onChange={e => setPptTitle(e.target.value)}
                  placeholder="e.g. Binary Arithmetic & Conversions Master Slide Deck"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Core Concepts & Summary
                </label>
                <textarea
                  rows={2}
                  value={pptDescription}
                  onChange={e => setPptDescription(e.target.value)}
                  placeholder="Summarize key rules, comparative tables, and exam mantras covered in these slides..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPptModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit PPT for Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 3: UPLOAD VIDEO ================= */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Upload Video Lecture</h3>
                  <p className="text-[11px] text-slate-500">
                    Video lecture stream submitted to Director Uma Shukla
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitVideo} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Subject</label>
                  <select
                    value={videoSubjectId}
                    onChange={e => {
                      setVideoSubjectId(e.target.value as SubjectId);
                      const chaps = chapters.filter(c => c.subjectId === e.target.value);
                      setVideoChapterId(chaps[0]?.id || '');
                    }}
                    className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 outline-none"
                  >
                    {ICSE_SUBJECTS.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Chapter</label>
                  <select
                    value={videoChapterId}
                    onChange={e => setVideoChapterId(e.target.value)}
                    className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 outline-none"
                  >
                    {availableVideoChapters.map(c => (
                      <option key={c.id} value={c.id}>
                        Ch {c.chapterNumber}: {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Video Title</label>
                <input
                  type="text"
                  required
                  value={videoTitle}
                  onChange={e => setVideoTitle(e.target.value)}
                  placeholder="e.g. Binary Subtraction & 2's Complement Explained"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Duration</label>
                  <input
                    type="text"
                    value={videoDuration}
                    onChange={e => setVideoDuration(e.target.value)}
                    placeholder="e.g. 22 mins"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Embed URL</label>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/embed/..."
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={videoDescription}
                  onChange={e => setVideoDescription(e.target.value)}
                  placeholder="Key concepts explained in this video lesson..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowVideoModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Video for Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Questions Modal */}
      {previewTest && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{previewTest.title}</h3>
                <div className="text-xs text-slate-500">
                  Grade {previewTest.targetGrade} • {previewTest.subjectName} • {previewTest.totalMarks} Marks
                </div>
              </div>
              <button
                onClick={() => setPreviewTest(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {previewTest.questions.map((q, idx) => (
                <div key={q.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-indigo-700">Question {idx + 1} ({q.type.toUpperCase()})</span>
                    <span>{q.marks} Marks</span>
                  </div>
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">{q.text}</div>
                  {q.mantraHint && (
                    <div className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                      <strong>Exam Mantra:</strong> {q.mantraHint}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-right pt-2 border-t border-slate-100">
              <button
                onClick={() => setPreviewTest(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 16:9 PPT Slide Viewer Modal */}
      <PptSlideViewerModal pptResource={previewPpt} onClose={() => setPreviewPpt(null)} />
    </div>
  );
};

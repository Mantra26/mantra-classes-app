import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ICSE_SUBJECTS } from '../../data/icseCurriculum';
import { ICSE_QUESTION_BANK } from '../../data/questionBank';
import { ChapterResource, SubjectId, PptSlide, GradeLevel, FacultyTestPaper, StudentTestSubmission, Chapter, SmsGatewayConfig, OtpDispatchLog } from '../../types';
import { storage } from '../../services/storage';
import { otpService } from '../../services/otpService';
import { PptSlideViewerModal } from '../chapters/PptSlideViewerModal';
import { ChapterEditModal } from '../chapters/ChapterEditModal';
import {
  Video,
  FileSpreadsheet,
  Plus,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Send,
  MessageSquare,
  Award,
  Layers,
  ChevronRight,
  X,
  Presentation,
  Check,
  FileText,
  ClipboardCheck,
  UserCheck,
  Play,
  KeyRound,
  ShieldCheck,
  Users,
  Phone,
  ExternalLink,
  EyeOff,
  Lock,
  Search,
  CreditCard,
  QrCode,
  Copy,
  XCircle,
  AlertCircle,
  Edit3,
  Unlock,
  Smartphone,
  MessageCircle
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    chapters,
    addChapterResource,
    deleteChapterResource,
    updateChapter,
    addChapter,
    deleteChapter,
    doubts,
    replyToDoubtNote,
    toggleRole,
    setActiveVideo,
    goToChapterDetail,
    facultyTests,
    createFacultyTest,
    deleteFacultyTest,
    studentSubmissions,
    evaluateSubmission,
    activeGrade,
    facultyMembers,
    addFacultyMember,
    updateFacultyMember,
    deleteFacultyMember,
    approveTestPaper,
    rejectTestPaper,
    approveResource,
    rejectResource,
    pendingApprovalsCount,
    adminPin,
    updateAdminPin,
    facultyPin,
    updateFacultyPin,
    registeredStudents,
    transactions,
    authorizeStudentPayment,
    rejectStudentPayment,
    pendingPaymentsCount
  } = useApp();

  // Modal states
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showPptModal, setShowPptModal] = useState(false);
  const [showTestPaperModal, setShowTestPaperModal] = useState(false);
  const [showAddFacultyModal, setShowAddFacultyModal] = useState(false);
  const [paymentTab, setPaymentTab] = useState<'pending' | 'all'>('pending');
  const [copiedUtrId, setCopiedUtrId] = useState<string | null>(null);
  const [previewPpt, setPreviewPpt] = useState<ChapterResource | null>(null);
  const [previewTest, setPreviewTest] = useState<FacultyTestPaper | null>(null);
  const [previewSheetModal, setPreviewSheetModal] = useState<any | null>(null);
  const [successToast, setSuccessToast] = useState('');

  // Security & PIN Management State
  const [newAdminPin, setNewAdminPin] = useState('');
  const [confirmAdminPin, setConfirmAdminPin] = useState('');
  const [showAdminPinForm, setShowAdminPinForm] = useState(false);
  const [showCurrentPin, setShowCurrentPin] = useState(false);
  const [adminPinError, setAdminPinError] = useState('');

  const [newFacultyPin, setNewFacultyPin] = useState('');
  const [confirmFacultyPin, setConfirmFacultyPin] = useState('');
  const [showFacultyPinForm, setShowFacultyPinForm] = useState(false);
  const [showFacultyCurrentPin, setShowFacultyCurrentPin] = useState(false);
  const [facultyPinError, setFacultyPinError] = useState('');

  // SMS & OTP Gateway Management State
  const [smsGatewayConfig, setSmsGatewayConfig] = useState<SmsGatewayConfig>(() => storage.getSmsGatewayConfig());
  const [otpLogs, setOtpLogs] = useState<OtpDispatchLog[]>(() => storage.getOtpLogs());
  const [testSmsMobile, setTestSmsMobile] = useState('');
  const [testSmsStatus, setTestSmsStatus] = useState('');
  const [showSmsConfigSaved, setShowSmsConfigSaved] = useState(false);
  const [isSendingTestOtp, setIsSendingTestOtp] = useState(false);
  const [lastTestOtp, setLastTestOtp] = useState<{ code: string; mobile: string; whatsappUrl: string; smsUrl: string } | null>(null);

  // Student Directory State
  const [studentSearch, setStudentSearch] = useState('');
  const [studentBoardFilter, setStudentBoardFilter] = useState<'all' | 'ICSE' | 'CBSE' | 'IGCSE'>('all');

  // Faculty form state
  const [facName, setFacName] = useState('');
  const [facDesignation, setFacDesignation] = useState('');
  const [facEmail, setFacEmail] = useState('');
  const [facPhone, setFacPhone] = useState('');
  const [facBio, setFacBio] = useState('');
  const [facSubjects, setFacSubjects] = useState<SubjectId[]>(['computers', 'mathematics']);
  const [facGrades, setFacGrades] = useState<GradeLevel[]>(['6', '7']);

  // Moderation Rejection Modal State
  const [rejectingItem, setRejectingItem] = useState<{
    type: 'test' | 'resource';
    id: string;
    chapterId?: string;
    title: string;
  } | null>(null);
  const [rejectionFeedback, setRejectionFeedback] = useState(
    'Please review and add more ICSE exam-oriented solved steps before publication.'
  );

  // Selected filter
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<SubjectId | 'all'>('all');

  // Curriculum Content Manager & Chapter Editor State
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [showAddChapterModal, setShowAddChapterModal] = useState(false);
  const [curriculumSubjectFilter, setCurriculumSubjectFilter] = useState<SubjectId | 'all'>('all');
  const [curriculumGradeFilter, setCurriculumGradeFilter] = useState<GradeLevel | 'all'>('all');
  const [curriculumBoardFilter, setCurriculumBoardFilter] = useState<'all' | 'ICSE' | 'CBSE' | 'IGCSE'>('all');
  const [curriculumSearch, setCurriculumSearch] = useState('');

  // Add New Chapter Form State
  const [newChapSubjectId, setNewChapSubjectId] = useState<SubjectId>('sanskrit');
  const [newChapGrade, setNewChapGrade] = useState<GradeLevel>('7');
  const [newChapBoard, setNewChapBoard] = useState<'ICSE' | 'CBSE' | 'IGCSE'>('CBSE');
  const [newChapNumber, setNewChapNumber] = useState<number>(1);
  const [newChapTitle, setNewChapTitle] = useState('');
  const [newChapSummary, setNewChapSummary] = useState('');

  const handleCreateNewChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapTitle.trim()) return;
    const newCh: Chapter = {
      id: `${newChapSubjectId}-custom-${Date.now()}`,
      subjectId: newChapSubjectId,
      gradeLevel: newChapGrade,
      board: newChapBoard,
      chapterNumber: Number(newChapNumber) || 1,
      title: newChapTitle.trim(),
      summary: newChapSummary.trim() || 'Curriculum unit created by Director Uma Shukla.',
      keyConcepts: ['Core conceptual foundation and syllabus outline.'],
      keyFormulasOrTerms: [],
      resources: [],
      isLocked: false
    };
    addChapter(newCh);
    setNewChapTitle('');
    setNewChapSummary('');
    setShowAddChapterModal(false);
    setSuccessToast(`New chapter "${newCh.title}" created successfully!`);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const filteredCurriculumChapters = chapters.filter(c => {
    const matchSub = curriculumSubjectFilter === 'all' || c.subjectId === curriculumSubjectFilter;
    const matchGrade = curriculumGradeFilter === 'all' || c.gradeLevel === curriculumGradeFilter || (!c.gradeLevel && curriculumGradeFilter === '7');
    const matchBoard = curriculumBoardFilter === 'all' || c.board === curriculumBoardFilter || (!c.board && curriculumBoardFilter === 'ICSE');
    const matchSearch = !curriculumSearch.trim() ||
      c.title.toLowerCase().includes(curriculumSearch.toLowerCase()) ||
      c.summary.toLowerCase().includes(curriculumSearch.toLowerCase());
    return matchSub && matchGrade && matchBoard && matchSearch;
  });

  // Test Paper Creation Form State
  const [testGrade, setTestGrade] = useState<GradeLevel | 'all'>('7');
  const [testSubjectId, setTestSubjectId] = useState<SubjectId>('computers');
  const [testTitle, setTestTitle] = useState('');
  const [testInstructions, setTestInstructions] = useState('Answer all questions. Show complete step-by-step working for numerical and algorithm problems.');
  const [testDuration, setTestDuration] = useState(25);
  const [testTotalMarks, setTestTotalMarks] = useState(10);
  const [testPassingMarks, setTestPassingMarks] = useState(6);
  const [testDueDate, setTestDueDate] = useState('');
  const [selectedQIds, setSelectedQIds] = useState<string[]>([]);

  // Evaluation Form State
  const [evaluatingSubId, setEvaluatingSubId] = useState<string | null>(null);
  const [evalManualScore, setEvalManualScore] = useState<number>(3);
  const [evalFeedback, setEvalFeedback] = useState<string>('Well attempted! Your conceptual explanation is clear. Pay attention to unit notations and final working steps.');

  // Video Form State
  const [videoSubjectId, setVideoSubjectId] = useState<SubjectId>('physics');
  const [videoChapterId, setVideoChapterId] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDuration, setVideoDuration] = useState('22 mins');
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/Fw09z85oV-k');
  const [videoDescription, setVideoDescription] = useState('');

  // PPT Form State
  const [pptSubjectId, setPptSubjectId] = useState<SubjectId>('biology');
  const [pptChapterId, setPptChapterId] = useState('');
  const [pptTitle, setPptTitle] = useState('');
  const [pptSlides, setPptSlides] = useState('6 Slides');
  const [pptUrl, setPptUrl] = useState('https://docs.google.com/presentation/d/e/demo/pub');
  const [pptDescription, setPptDescription] = useState('');

  // Doubt Reply state
  const [replyingDoubtId, setReplyingDoubtId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Collect all resources across chapters
  const allResources: { resource: ChapterResource; chapterId: string; chapterTitle: string; subjectId: SubjectId }[] = [];
  chapters.forEach(ch => {
    ch.resources.forEach(r => {
      allResources.push({
        resource: r,
        chapterId: ch.id,
        chapterTitle: ch.title,
        subjectId: ch.subjectId
      });
    });
  });

  const totalVideos = allResources.filter(r => r.resource.type === 'video').length;
  const totalPpts = allResources.filter(r => r.resource.type === 'ppt_presentation').length;
  const pendingDoubts = doubts.filter(d => d.status === 'pending').length;

  const filteredResources = selectedSubjectFilter === 'all'
    ? allResources
    : allResources.filter(r => r.subjectId === selectedSubjectFilter);

  // Available chapters for selected subject in modals
  const availableVideoChapters = chapters.filter(c => c.subjectId === videoSubjectId);
  const availablePptChapters = chapters.filter(c => c.subjectId === pptSubjectId);

  // Handle Add Video
  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const targetChapterId = videoChapterId || availableVideoChapters[0]?.id;
    if (!targetChapterId || !videoTitle.trim()) return;

    const newRes: ChapterResource = {
      type: 'video',
      title: videoTitle.trim(),
      durationOrPages: videoDuration || '20 mins',
      videoUrl: videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: videoDescription.trim() || 'Comprehensive ICSE lecture explaining step-by-step principles and solved problems by Uma Shukla.',
      uploadedBy: 'Uma Shukla (Director)',
      uploadedAt: new Date().toISOString()
    };

    addChapterResource(targetChapterId, newRes);
    setShowVideoModal(false);
    setVideoTitle('');
    setVideoDescription('');
    setSuccessToast(`Video lecture successfully published to ${availableVideoChapters.find(c => c.id === targetChapterId)?.title}!`);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  // Handle Add PPT with multi-slide generator
  const handleAddPpt = (e: React.FormEvent) => {
    e.preventDefault();
    const targetChapterId = pptChapterId || availablePptChapters[0]?.id;
    if (!targetChapterId || !pptTitle.trim()) return;

    const targetChap = chapters.find(c => c.id === targetChapterId);

    // Generate rich slides
    const generatedSlides: PptSlide[] = [
      {
        slideNumber: 1,
        title: pptTitle.trim(),
        categoryTag: 'ICSE CLASS 7 MASTER SLIDE DECK',
        bullets: [
          `Subject: ${ICSE_SUBJECTS.find(s => s.id === pptSubjectId)?.name} • Chapter: ${targetChap?.title}`,
          'Curated specifically for ICSE English Medium Board standards.',
          'Includes core definitions, comparative tables, and exam criteria.',
          'Lead Faculty: Uma Shukla (Director, Mantra Classes)'
        ],
        keyHighlight: 'Target: 95%+ Board Scoring Strategy',
        examMantra: 'Always underline scientific keywords in written terminal exams.'
      },
      {
        slideNumber: 2,
        title: 'Fundamental Definitions & Essential Laws',
        categoryTag: 'HIGH-YIELD THEORY',
        bullets: [
          'Master key formulas and precise textbook terminology.',
          'Units must be specified in SI/CGS metric units on every calculation line.',
          'Definitions should be committed to memory with exact ICSE phraseology.'
        ],
        diagramBox: {
          label: 'Teacher\'s Essential Terms',
          items: [
            { term: 'Key Law 1', explanation: 'State definition in full without paraphrasing keywords.' },
            { term: 'Key Law 2', explanation: 'Ensure all units are converted to standard metric before computing.' }
          ]
        },
        examMantra: 'Examiners deduct marks for missing units even if numerical arithmetic is correct.'
      },
      {
        slideNumber: 3,
        title: 'Comparative Concept Differentiation Table',
        categoryTag: 'EXAM COMPARISON MATRIX',
        bullets: [
          'Always construct a neat pencil-drawn table for 3-mark differentiation questions.',
          'Provide at least 3 distinct, non-overlapping points of distinction.'
        ],
        tableData: {
          headers: ['Distinguishing Parameter', 'Core Category A', 'Core Category B'],
          rows: [
            ['Operational Principle', 'Direct primary mechanism', 'Secondary or derived response'],
            ['Metric Representation', 'Standard SI base unit', 'Derived composite unit'],
            ['ICSE Board Marks', 'Section A Compulsory (1 Mark)', 'Section B Structured (3 Marks)']
          ]
        },
        examMantra: 'Tabular answers are scored with maximum efficiency by ICSE examiners.'
      },
      {
        slideNumber: 4,
        title: 'Step-by-Step Solved ICSE Exemplar Problem',
        categoryTag: 'SOLVED EXAM QUESTION',
        bullets: [
          'Step 1: Write Given Values clearly with appropriate symbols.',
          'Step 2: State the formula / theorem explicitly.',
          'Step 3: Show algebraic substitution systematically.',
          'Step 4: Box your final numerical answer with units.'
        ],
        keyHighlight: 'Step Marking Rubric: Formula (1 Mark) + Substitution (1 Mark) + Boxed Answer (1 Mark).',
        examMantra: 'Never skip intermediate steps; partial marks are always awarded for working.'
      },
      {
        slideNumber: 5,
        title: 'Examiner Warning: Common Mistakes to Avoid',
        categoryTag: 'EXAM TRAPS & PITFALLS',
        bullets: [
          'Careless negative sign multiplication in nested brackets.',
          'Misidentifying glancing angle with the angle of incidence.',
          'Mixing up living xylem parenchyma with dead xylem vessels.',
          'Forgetting that speed is distance divided by time in consistent units.'
        ],
        diagramBox: {
          label: 'Alert Points',
          items: [
            { term: 'Pitfall 1', explanation: 'Do not hurry through the question reading period.' },
            { term: 'Pitfall 2', explanation: 'Re-check calculations before submitting the test paper.' }
          ]
        },
        examMantra: 'Spend 5 minutes re-reading your paper to catch easily avoidable sign errors.'
      },
      {
        slideNumber: 6,
        title: 'Uma Shukla\'s Final Chapter Mastery Mantra',
        categoryTag: 'DIRECTOR REVISION CHECKLIST',
        bullets: [
          'Revise all chapter summary cards on the Mantra Classes App twice a week.',
          'Take the Chapter Diagnostic Test to test your retention under timer pressure.',
          'Review incorrect answers in your Scorecard to eliminate root-cause weaknesses.',
          'Clear any lingering doubts at the Direct Doubt Desk with Uma Ma\'am.'
        ],
        keyHighlight: 'Consistent practice turns average marks into board distinction scores!',
        examMantra: 'Believe in your preparation and stay calm during examination hours.'
      }
    ];

    const newRes: ChapterResource = {
      type: 'ppt_presentation',
      title: pptTitle.trim(),
      durationOrPages: pptSlides || '6 Slides',
      slideCount: 6,
      slides: generatedSlides,
      pptUrl: pptUrl || 'https://docs.google.com/presentation/d/e/demo/pub',
      description: pptDescription.trim() || 'Comprehensive multi-slide presentation covering definitions, comparative tables, and exam guidelines.',
      uploadedBy: 'Uma Shukla (Director)',
      uploadedAt: new Date().toISOString()
    };

    addChapterResource(targetChapterId, newRes);
    setShowPptModal(false);
    setPptTitle('');
    setPptDescription('');
    setSuccessToast(`PPT presentation successfully published to ${targetChap?.title || 'Chapter'}!`);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  // Handle Create Test Paper
  const handleCreateTestPaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testTitle.trim()) return;

    const availableSubjectQuestions = ICSE_QUESTION_BANK.filter(q => q.subjectId === testSubjectId);
    const chosenQuestions = selectedQIds.length > 0
      ? ICSE_QUESTION_BANK.filter(q => selectedQIds.includes(q.id))
      : availableSubjectQuestions.slice(0, 4);

    const subObj = ICSE_SUBJECTS.find(s => s.id === testSubjectId);

    const newTest: FacultyTestPaper = {
      id: `test-${testSubjectId}-${Date.now()}`,
      title: testTitle.trim(),
      instructions: testInstructions.trim(),
      targetGrade: testGrade,
      subjectId: testSubjectId,
      subjectName: subObj?.name || 'Subject',
      chapterTitle: chosenQuestions[0]?.chapterTitle || 'Core Syllabus Assessment',
      durationMinutes: Number(testDuration) || 25,
      totalMarks: Number(testTotalMarks) || 10,
      passingMarks: Number(testPassingMarks) || 6,
      dueDate: testDueDate || new Date(Date.now() + 4 * 24 * 3600 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      createdBy: 'Uma Shukla (Faculty)',
      questions: chosenQuestions,
      status: 'active'
    };

    createFacultyTest(newTest);
    setShowTestPaperModal(false);
    setTestTitle('');
    setSelectedQIds([]);
    setSuccessToast(`Test paper "${newTest.title}" published to Grade ${testGrade} students!`);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  // Handle Release Evaluation
  const handleReleaseEvaluation = (subId: string) => {
    evaluateSubmission(subId, Number(evalManualScore) || 0, evalFeedback.trim());
    setEvaluatingSubId(null);
    setSuccessToast('Scorecard & personalized guidance released to student!');
    setTimeout(() => setSuccessToast(''), 4000);
  };

  // Handle Doubt Reply
  const handleSendReply = (doubtId: string) => {
    if (!replyText.trim()) return;
    replyToDoubtNote(doubtId, replyText.trim());
    setReplyingDoubtId(null);
    setReplyText('');
    setSuccessToast('Mentor clarification successfully sent to student!');
    setTimeout(() => setSuccessToast(''), 4000);
  };

  // Handle Add Faculty Member
  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facName.trim()) return;

    addFacultyMember({
      id: `fac-${Date.now()}`,
      name: facName.trim(),
      designation: facDesignation.trim() || 'Senior Subject Mentor',
      email: facEmail.trim() || `${facName.toLowerCase().replace(/\s+/g, '.')}@mantraclasses.com`,
      phone: facPhone.trim() || '+91 98000 00000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      assignedSubjects: facSubjects.length > 0 ? facSubjects : ['mathematics'],
      assignedGrades: facGrades.length > 0 ? facGrades : ['7'],
      status: 'active',
      joinedAt: new Date().toISOString(),
      addedBy: 'Uma Shukla (Director)',
      bio: facBio.trim() || 'Dedicated ICSE educator focused on conceptual clarity and exam performance.'
    });

    setShowAddFacultyModal(false);
    setFacName('');
    setFacDesignation('');
    setFacEmail('');
    setFacPhone('');
    setFacBio('');
    setSuccessToast(`Faculty member "${facName}" registered successfully!`);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  // Handle Confirm Rejection with Feedback
  const handleConfirmRejection = () => {
    if (!rejectingItem) return;
    if (rejectingItem.type === 'test') {
      rejectTestPaper(rejectingItem.id, rejectionFeedback);
    } else if (rejectingItem.type === 'resource' && rejectingItem.chapterId) {
      rejectResource(rejectingItem.chapterId, rejectingItem.id, rejectionFeedback);
    }
    setRejectingItem(null);
    setSuccessToast('Revision feedback dispatched to faculty member.');
    setTimeout(() => setSuccessToast(''), 4000);
  };

  // Handle Update Admin PIN
  const handleUpdateAdminPin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminPinError('');

    const clean = newAdminPin.trim();
    if (clean.length < 4) {
      setAdminPinError('Admin PIN must be at least 4 digits');
      return;
    }
    if (clean !== confirmAdminPin.trim()) {
      setAdminPinError('PINs do not match. Please re-enter.');
      return;
    }

    const ok = updateAdminPin(clean);
    if (ok) {
      setSuccessToast('Director Admin PIN updated successfully! The new PIN is now active.');
      setNewAdminPin('');
      setConfirmAdminPin('');
      setShowAdminPinForm(false);
      setTimeout(() => setSuccessToast(''), 4000);
    } else {
      setAdminPinError('Failed to update PIN. Please enter a valid PIN.');
    }
  };

  // Handle Update Faculty PIN
  const handleUpdateFacultyPin = (e: React.FormEvent) => {
    e.preventDefault();
    setFacultyPinError('');

    const clean = newFacultyPin.trim();
    if (clean.length < 4) {
      setFacultyPinError('Faculty PIN must be at least 4 digits');
      return;
    }
    if (clean !== confirmFacultyPin.trim()) {
      setFacultyPinError('PINs do not match. Please re-enter.');
      return;
    }

    const ok = updateFacultyPin(clean);
    if (ok) {
      setSuccessToast(`Faculty Authorization PIN updated successfully to ${clean}!`);
      setNewFacultyPin('');
      setConfirmFacultyPin('');
      setShowFacultyPinForm(false);
      setTimeout(() => setSuccessToast(''), 4000);
    } else {
      setFacultyPinError('Failed to update Faculty PIN.');
    }
  };

  // Handle SMS Gateway Config Update
  const handleSaveSmsConfig = (e: React.FormEvent) => {
    e.preventDefault();
    storage.saveSmsGatewayConfig(smsGatewayConfig);
    setShowSmsConfigSaved(true);
    setSuccessToast('SMS Gateway settings updated successfully!');
    setTimeout(() => setShowSmsConfigSaved(false), 4000);
    setTimeout(() => setSuccessToast(''), 4000);
  };

  // Handle Send Test OTP
  const handleSendTestOtp = async () => {
    setTestSmsStatus('');
    const clean = testSmsMobile.replace(/\D/g, '');
    if (clean.length !== 10) {
      setTestSmsStatus('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    setIsSendingTestOtp(true);
    try {
      const res = await otpService.sendOtp(clean, 'Director Uma Shukla (Test)');
      setOtpLogs(storage.getOtpLogs());
      setLastTestOtp({
        code: res.code || '',
        mobile: clean,
        whatsappUrl: res.whatsappUrl,
        smsUrl: res.smsUrl
      });
      // Proactively open WhatsApp Web / App so message arrives directly
      try {
        window.open(res.whatsappUrl, '_blank');
      } catch (err) {
        console.warn('Popup blocked, button available below', err);
      }
      setTestSmsStatus(`✓ OTP Code: ${res.code} generated for +91 ${clean}. Click the green button below to send/view in WhatsApp.`);
    } catch {
      setTestSmsStatus('Failed to send test OTP. Check network connectivity.');
    } finally {
      setIsSendingTestOtp(false);
    }
  };

  const pendingSubmissions = studentSubmissions.filter(s => s.status === 'submitted');
  const pendingTestPapers = facultyTests.filter(t => t.approvalStatus === 'pending_approval');
  const pendingResources: {
    resource: ChapterResource;
    chapterId: string;
    chapterTitle: string;
    subjectId: SubjectId;
  }[] = [];
  chapters.forEach(ch => {
    ch.resources.forEach(r => {
      if (r.approvalStatus === 'pending_approval') {
        pendingResources.push({
          resource: r,
          chapterId: ch.id,
          chapterTitle: ch.title,
          subjectId: ch.subjectId
        });
      }
    });
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Toast */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-xl flex items-center space-x-2 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{successToast}</span>
        </div>
      )}

      {/* Top Admin Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Faculty Control Portal • Director Uma Shukla</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Uma Shukla Educator Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Create and assign test papers to Grades 2–7, evaluate student submissions with personalized feedback, publish video lectures and PPT slide decks, and answer student questions.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => {
                setSelectedQIds([]);
                setShowTestPaperModal(true);
              }}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Create & Assign Test Paper</span>
            </button>

            <button
              onClick={() => {
                setVideoChapterId(availableVideoChapters[0]?.id || '');
                setShowVideoModal(true);
              }}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <Video className="w-4 h-4 fill-slate-950" />
              <span>Add Video</span>
            </button>

            <button
              onClick={() => {
                setPptChapterId(availablePptChapters[0]?.id || '');
                setShowPptModal(true);
              }}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <Presentation className="w-4 h-4" />
              <span>Add PPT</span>
            </button>

            <button
              onClick={() => setShowAddFacultyModal(true)}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <UserCheck className="w-4 h-4" />
              <span>+ Add Faculty</span>
            </button>

            <button
              onClick={toggleRole}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-colors"
            >
              <span>Student View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">{registeredStudents.length}</div>
            <div className="text-[11px] font-semibold text-slate-500">Enrolled Students</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">{facultyTests.length}</div>
            <div className="text-[11px] font-semibold text-slate-500">Assigned Tests</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">{pendingSubmissions.length}</div>
            <div className="text-[11px] font-semibold text-slate-500">To Evaluate</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">{totalVideos}</div>
            <div className="text-[11px] font-semibold text-slate-500">Video Lectures</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">{totalPpts}</div>
            <div className="text-[11px] font-semibold text-slate-500">PPT Decks</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900">{pendingDoubts}</div>
            <div className="text-[11px] font-semibold text-slate-500">Pending Doubts</div>
          </div>
        </div>

        {/* 7th Metric: Pending Approvals */}
        <div
          className={`p-4 rounded-2xl border shadow-xs flex items-center space-x-3 ${
            pendingApprovalsCount > 0
              ? 'bg-amber-500/10 border-amber-300 ring-2 ring-amber-400/20'
              : 'bg-white border-slate-200/90'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              pendingApprovalsCount > 0
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'bg-amber-50 text-amber-600'
            }`}
          >
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xl font-black text-slate-900">{pendingApprovalsCount}</span>
              {pendingApprovalsCount > 0 && (
                <span className="text-[10px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-200 text-amber-900">
                  Action
                </span>
              )}
            </div>
            <div className="text-[11px] font-semibold text-slate-500">Pending Approvals</div>
          </div>
        </div>

        {/* 8th Metric: Student Fee Authorizations */}
        <div
          className={`p-4 rounded-2xl border shadow-xs flex items-center space-x-3 ${
            pendingPaymentsCount > 0
              ? 'bg-emerald-500/15 border-emerald-400 ring-2 ring-emerald-500/30'
              : 'bg-white border-slate-200/90'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              pendingPaymentsCount > 0
                ? 'bg-emerald-600 text-white font-black animate-pulse'
                : 'bg-emerald-50 text-emerald-600'
            }`}
          >
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xl font-black text-slate-900">{pendingPaymentsCount}</span>
              {pendingPaymentsCount > 0 && (
                <span className="text-[10px] font-black uppercase px-1.5 py-0.2 rounded bg-emerald-200 text-emerald-950">
                  New UTR
                </span>
              )}
            </div>
            <div className="text-[11px] font-semibold text-slate-500">Fee Auth Desk</div>
          </div>
        </div>
      </div>

      {/* ================= SECTION 0: FACULTY CURRICULUM APPROVALS & MODERATION DESK ================= */}
      <div
        className={`rounded-3xl border p-5 sm:p-6 shadow-xs space-y-4 transition-all ${
          pendingApprovalsCount > 0
            ? 'bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 border-amber-300 ring-2 ring-amber-400/20'
            : 'bg-white border-slate-200/90'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-black ${
                pendingApprovalsCount > 0 ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'
              }`}
            >
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-900">
                  Faculty Approvals & Academic Moderation Desk
                </h3>
                {pendingApprovalsCount > 0 && (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                    {pendingApprovalsCount} Action Required
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Review, verify, and release Test Papers, PPT Slides, and Video Lectures submitted by faculty members
              </p>
            </div>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            Director Review Desk
          </span>
        </div>

        {pendingApprovalsCount === 0 ? (
          <div className="py-6 text-center text-slate-500 text-xs flex flex-col items-center justify-center space-y-1.5">
            <CheckCircle2 className="w-7 h-7 text-emerald-500" />
            <span className="font-bold text-slate-700">All Faculty Uploads Reviewed & Approved</span>
            <span className="text-slate-400">
              When faculty members submit new test papers, PPT decks, or video lectures, they will appear here for your review and approval.
            </span>
          </div>
        ) : (
          <div className="space-y-4">
            {/* PENDING TEST PAPERS */}
            {pendingTestPapers.length > 0 && (
              <div className="space-y-2.5">
                <div className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Pending Test Papers ({pendingTestPapers.length})</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {pendingTestPapers.map(test => (
                    <div
                      key={test.id}
                      className="p-4 rounded-2xl bg-white border border-amber-300 shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                            Grade {test.targetGrade}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500">{test.subjectName}</span>
                        </div>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                          Submitted by {test.facultyName || test.createdBy}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{test.title}</h4>
                        <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
                          <span>{test.totalMarks} Marks</span>
                          <span>•</span>
                          <span>{test.durationMinutes} mins</span>
                          <span>•</span>
                          <span>{test.questions.length} Questions</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{test.instructions}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <button
                          onClick={() => setPreviewTest(test)}
                          className="flex items-center space-x-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Questions</span>
                        </button>

                        <div className="flex items-center space-x-1.5">
                          <button
                            onClick={() =>
                              setRejectingItem({
                                type: 'test',
                                id: test.id,
                                title: test.title
                              })
                            }
                            className="px-2.5 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
                          >
                            Request Changes
                          </button>
                          <button
                            onClick={() => {
                              approveTestPaper(test.id);
                              setSuccessToast(
                                `Test paper "${test.title}" approved and published live to Grade ${test.targetGrade} students!`
                              );
                              setTimeout(() => setSuccessToast(''), 4000);
                            }}
                            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve & Publish</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PENDING RESOURCES (PPTS & VIDEOS) */}
            {pendingResources.length > 0 && (
              <div className="space-y-2.5">
                <div className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                  <Presentation className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pending Presentations & Videos ({pendingResources.length})</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {pendingResources.map(item => {
                    const isPpt = item.resource.type === 'ppt_presentation';
                    return (
                      <div
                        key={item.resource.title}
                        className="p-4 rounded-2xl bg-white border border-amber-300 shadow-xs space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">
                            {item.chapterTitle}
                          </span>
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                            By {item.resource.facultyName || item.resource.uploadedBy}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center space-x-2 mb-0.5">
                            <span
                              className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                                isPpt ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                              }`}
                            >
                              {isPpt ? 'PPT Presentation' : 'Video Lecture'}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {item.resource.durationOrPages}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                            {item.resource.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                            {item.resource.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          {isPpt ? (
                            <button
                              onClick={() => setPreviewPpt(item.resource)}
                              className="flex items-center space-x-1 text-xs font-bold text-emerald-600 hover:text-emerald-800"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Preview 16:9 Slides</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => setActiveVideo(item.resource)}
                              className="flex items-center space-x-1 text-xs font-bold text-purple-600 hover:text-purple-800"
                            >
                              <Play className="w-3.5 h-3.5" />
                              <span>Watch Lecture</span>
                            </button>
                          )}

                          <div className="flex items-center space-x-1.5">
                            <button
                              onClick={() =>
                                setRejectingItem({
                                  type: 'resource',
                                  id: item.resource.id || item.resource.title,
                                  chapterId: item.chapterId,
                                  title: item.resource.title
                                })
                              }
                              className="px-2.5 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
                            >
                              Request Changes
                            </button>
                            <button
                              onClick={() => {
                                approveResource(
                                  item.chapterId,
                                  item.resource.id || item.resource.title
                                );
                                setSuccessToast(
                                  `Resource "${item.resource.title}" approved and added to ${item.chapterTitle}!`
                                );
                                setTimeout(() => setSuccessToast(''), 4000);
                              }}
                              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve & Publish</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================= SECTION: FACULTY DIRECTORY & MANAGEMENT ================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Faculty Directory & Management</h3>
              <p className="text-xs text-slate-500">
                Register faculty members, assign subjects and grades, and monitor permissions
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddFacultyModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Faculty Member</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {facultyMembers.map(fac => (
            <div
              key={fac.id}
              className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-blue-200 transition-all space-y-3"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={
                    fac.avatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                  }
                  alt={fac.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-500/20"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{fac.name}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{fac.designation}</p>
                  <span className="inline-block mt-0.5 text-[9px] font-black uppercase px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                    {fac.status}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-2">
                <div className="text-[11px] truncate">
                  <span className="text-slate-400">Email:</span> {fac.email}
                </div>
                <div className="text-[11px]">
                  <span className="text-slate-400">Phone:</span> {fac.phone}
                </div>

                <div className="flex flex-wrap items-center gap-1 pt-1">
                  {fac.assignedSubjects.map(subId => {
                    const s = ICSE_SUBJECTS.find(sub => sub.id === subId);
                    return (
                      <span
                        key={subId}
                        className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[9px] font-bold text-slate-700"
                      >
                        {s?.name || subId}
                      </span>
                    );
                  })}
                  {fac.assignedGrades.map(g => (
                    <span
                      key={g}
                      className="px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-200 text-[9px] font-black text-indigo-700"
                    >
                      Gr {g}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-400">
                  Added: {new Date(fac.joinedAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => {
                    if (confirm(`Remove faculty member "${fac.name}"?`)) {
                      deleteFacultyMember(fac.id);
                    }
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Remove Faculty"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SECTION: STUDENT DIRECTORY & MOBILE REGISTRY ================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-900">Enrolled Students & Mobile Directory</h3>
                <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {registeredStudents.length} Students Enrolled
                </span>
              </div>
              <p className="text-xs text-slate-500">
                View student mobile contact numbers, enrolled board & grade, school name, and academic test performance
              </p>
            </div>
          </div>

          {/* Search & Board Filter */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={studentSearch}
                onChange={e => setStudentSearch(e.target.value)}
                placeholder="Search name or mobile..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <select
              value={studentBoardFilter}
              onChange={e => setStudentBoardFilter(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-700 bg-white"
            >
              <option value="all">All Boards</option>
              <option value="ICSE">ICSE</option>
              <option value="CBSE">CBSE</option>
              <option value="IGCSE">IGCSE</option>
            </select>
          </div>
        </div>

        {/* Students Cards Grid */}
        {(() => {
          const filteredStudents = registeredStudents.filter(stu => {
            const matchesQuery =
              !studentSearch ||
              stu.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
              stu.mobileNumber?.includes(studentSearch);
            const matchesBoard = studentBoardFilter === 'all' || stu.board === studentBoardFilter;
            return matchesQuery && matchesBoard;
          });

          if (filteredStudents.length === 0) {
            return (
              <div className="py-8 text-center text-slate-500 text-xs">
                No students match your search criteria.
              </div>
            );
          }

          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredStudents.map(stu => (
                <div
                  key={stu.id || stu.mobileNumber}
                  className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all space-y-3 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <img
                        src={stu.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt={stu.name}
                        className="w-11 h-11 rounded-xl object-cover ring-2 ring-blue-500/20"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{stu.name}</h4>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          <span className="text-[10px] font-black uppercase px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">
                            {stu.board || 'ICSE'}
                          </span>
                          <span className="text-[10px] font-bold text-slate-600">
                            {stu.grade || `Grade ${stu.gradeLevel || '7'}`}
                          </span>
                          {stu.paymentStatus === 'authorized' ? (
                            <span className="text-[10px] font-black uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                              ✓ PRO Authorized
                            </span>
                          ) : stu.paymentStatus === 'pending_authorization' ? (
                            <span className="text-[10px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
                              ⏳ UTR Pending (₹{stu.pendingAmount || 499})
                            </span>
                          ) : stu.demoMockTestTaken ? (
                            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                              Demo Test Used
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-blue-100 text-blue-700">
                              1 Free Demo Left
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Prominent Student Mobile & Contact Buttons */}
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Student Mobile
                      </span>
                      <span className="text-xs font-black text-slate-900 font-mono tracking-wide">
                        📱 +91 {stu.mobileNumber || 'Not provided'}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 pt-1 border-t border-slate-100">
                      {stu.mobileNumber ? (
                        <>
                          <a
                            href={`tel:${stu.mobileNumber}`}
                            className="flex-1 flex items-center justify-center space-x-1 py-1.5 px-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold transition-colors"
                          >
                            <Phone className="w-3 h-3 text-emerald-600" />
                            <span>Call</span>
                          </a>
                          <a
                            href={`https://wa.me/91${stu.mobileNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center space-x-1 py-1.5 px-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-[11px] font-bold shadow-xs transition-colors"
                          >
                            <span>WhatsApp</span>
                          </a>
                        </>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">No mobile recorded</span>
                      )}
                    </div>
                  </div>

                  {/* Academic Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-white border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400">Tests Attempted</div>
                      <div className="font-extrabold text-slate-800">{stu.totalTestsTaken || 0}</div>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400">Avg. Score</div>
                      <div className="font-extrabold text-indigo-600">{stu.averageScorePercentage ? `${stu.averageScorePercentage}%` : 'N/A'}</div>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-100 pt-2">
                    <span className="truncate max-w-[180px]">{stu.schoolName || "Mantra Classes"}</span>
                    <span>Joined: {stu.joinedAt ? new Date(stu.joinedAt).toLocaleDateString() : 'Active'}</span>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* ================= SECTION: STUDENT PAYMENT AUTHORIZATIONS & MODULE ACTIVATION DESK ================= */}
      <div id="payment-authorizations-desk" className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-900">
                  Student Payment Authorizations & Module Activation Desk
                </h3>
                {pendingPaymentsCount > 0 ? (
                  <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
                    {pendingPaymentsCount} Awaiting Authorization
                  </span>
                ) : (
                  <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    All Authorized
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Inspect student mobile numbers & UTR reference numbers to authorize paid course modules on Director Uma Shukla's SBI UPI (8707794159@ptyes)
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPaymentTab('pending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                paymentTab === 'pending'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Pending Verification ({transactions.filter(t => t.status === 'PENDING').length})
            </button>
            <button
              onClick={() => setPaymentTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                paymentTab === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Transactions ({transactions.length})
            </button>
          </div>
        </div>

        {/* Transactions Grid */}
        {(() => {
          const list = paymentTab === 'pending'
            ? transactions.filter(t => t.status === 'PENDING')
            : transactions;

          if (list.length === 0) {
            return (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700">
                  {paymentTab === 'pending' ? 'No Pending Payment Authorizations' : 'No Transactions Recorded'}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {paymentTab === 'pending'
                    ? 'All student UPI submissions have been authorized. When students submit a new UTR, it will appear here immediately.'
                    : 'Transactions made by students will appear in this audit log.'}
                </p>
              </div>
            );
          }

          return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {list.map(tx => {
                const isPending = tx.status === 'PENDING';
                const isSuccess = tx.status === 'SUCCESS';
                const isFailed = tx.status === 'FAILED';

                return (
                  <div
                    key={tx.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                      isPending
                        ? 'bg-amber-50/30 border-amber-300 ring-2 ring-amber-400/20'
                        : isSuccess
                        ? 'bg-white border-slate-200 hover:border-emerald-300'
                        : 'bg-rose-50/20 border-rose-200'
                    }`}
                  >
                    <div>
                      {/* Top Bar: Plan & Status */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-slate-900 text-base">{tx.planName}</h4>
                            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              ₹{tx.amount}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            Receipt ID: {tx.receiptNumber} • {new Date(tx.timestamp).toLocaleString()}
                          </span>
                        </div>

                        <div>
                          {isPending && (
                            <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center space-x-1 animate-pulse">
                              <Clock className="w-3 h-3 text-amber-600" />
                              <span>Pending Auth</span>
                            </span>
                          )}
                          {isSuccess && (
                            <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center space-x-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Authorized PRO</span>
                            </span>
                          )}
                          {isFailed && (
                            <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300 flex items-center space-x-1">
                              <XCircle className="w-3 h-3 text-rose-600" />
                              <span>Rejected</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Student Info & Mobile Number */}
                      <div className="p-3 rounded-xl bg-white border border-slate-200/90 space-y-2 mb-3 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500 font-medium">Student Name:</span>
                          <span className="text-xs font-bold text-slate-900">{tx.studentName || 'Registered Student'}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500 font-medium">Student Mobile:</span>
                          <span className="text-xs font-black font-mono text-slate-900">
                            📱 +91 {tx.studentMobile || 'Not provided'}
                          </span>
                        </div>

                        {tx.studentMobile && (
                          <div className="flex items-center space-x-2 pt-1 border-t border-slate-100">
                            <a
                              href={`tel:${tx.studentMobile}`}
                              className="flex-1 flex items-center justify-center space-x-1 py-1.5 px-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold transition-colors"
                            >
                              <Phone className="w-3 h-3 text-emerald-600" />
                              <span>Call Student</span>
                            </a>
                            <a
                              href={`https://wa.me/91${tx.studentMobile}?text=${encodeURIComponent(
                                `Hello ${tx.studentName || 'Student'}, this is Director Uma Shukla from Mantra Classes regarding your payment of ₹${tx.amount} (UTR: ${tx.utrNumber}).`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center space-x-1 py-1.5 px-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-[11px] font-bold shadow-2xs transition-colors"
                            >
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        )}
                      </div>

                      {/* UTR Reference Row with 1-Click Copy */}
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase text-slate-500">Bank UTR / Transaction No:</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(tx.utrNumber);
                              setCopiedUtrId(tx.id);
                              setTimeout(() => setCopiedUtrId(null), 2000);
                            }}
                            className="flex items-center space-x-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800"
                          >
                            {copiedUtrId === tx.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedUtrId === tx.id ? 'Copied' : 'Copy UTR'}</span>
                          </button>
                        </div>
                        <div className="font-mono text-sm font-black text-indigo-950 tracking-wider select-all">
                          {tx.utrNumber}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Cross-check in SBI / PhonePe / Paytm passbook for payee: <b>8707794159@ptyes</b>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons for Director */}
                    <div className="pt-2 border-t border-slate-100">
                      {isPending ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              authorizeStudentPayment(tx.id);
                              setSuccessToast(`Payment authorized! ${tx.studentName || 'Student'} has been granted full module access.`);
                            }}
                            className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all active:scale-95"
                          >
                            <Check className="w-4 h-4" />
                            <span>✓ Authorize & Activate Module</span>
                          </button>

                          <button
                            onClick={() => {
                              const reason = prompt('Reason for rejecting UTR (e.g. UTR not matched in bank statement):', 'UTR not matched in bank statement');
                              if (reason) {
                                rejectStudentPayment(tx.id, reason);
                                setSuccessToast('Payment rejected and student notified.');
                              }
                            }}
                            className="flex items-center space-x-1 py-2.5 px-3 rounded-xl border border-rose-300 hover:bg-rose-50 text-rose-700 font-bold text-xs transition-colors"
                          >
                            <X className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>
                            {isSuccess ? `Authorized by: ${tx.authorizedBy || 'Director Uma Shukla'}` : `Rejected: ${tx.authorizedBy || 'Admin'}`}
                          </span>
                          {tx.authorizedAt && (
                            <span className="text-[10px] text-slate-400">
                              {new Date(tx.authorizedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>

      {/* ================= SECTION: DIRECTOR SECURITY & PIN ACCESS CONTROL DESK ================= */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 rounded-3xl p-5 sm:p-6 text-white shadow-xl space-y-5 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white">Director Security & Passkey Management</h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Staff Protection
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Manage authorization PINs. Students are strictly restricted to the Student Portal and cannot access educator workspaces without this PIN.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Director Admin PIN */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-amber-400">Director (Admin) Access PIN</span>
                <p className="text-[11px] text-slate-300">Controls access to Director Uma Shukla's full admin panel</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm font-bold tracking-widest px-2.5 py-1 rounded-lg bg-black/40 border border-white/10">
                  {showCurrentPin ? adminPin : '••••'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowCurrentPin(!showCurrentPin)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
                  title={showCurrentPin ? 'Hide PIN' : 'Reveal PIN'}
                >
                  {showCurrentPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {!showAdminPinForm ? (
              <button
                type="button"
                onClick={() => {
                  setShowAdminPinForm(true);
                  setAdminPinError('');
                  setNewAdminPin('');
                  setConfirmAdminPin('');
                }}
                className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center justify-center space-x-1.5"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Reset Director PIN</span>
              </button>
            ) : (
              <form onSubmit={handleUpdateAdminPin} className="space-y-2.5 pt-2 border-t border-white/10">
                {adminPinError && (
                  <div className="p-2 rounded-lg bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-semibold">
                    {adminPinError}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">New PIN (4-8 digits)</label>
                    <input
                      type="password"
                      required
                      maxLength={8}
                      value={newAdminPin}
                      onChange={e => setNewAdminPin(e.target.value)}
                      placeholder="New PIN"
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">Confirm New PIN</label>
                    <input
                      type="password"
                      required
                      maxLength={8}
                      value={confirmAdminPin}
                      onChange={e => setConfirmAdminPin(e.target.value)}
                      placeholder="Confirm PIN"
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAdminPinForm(false)}
                    className="w-1/3 py-1.5 px-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-slate-300 font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-sm transition-all"
                  >
                    Save New Director PIN
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Card 2: Faculty Member PIN */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase text-purple-400">Faculty Authorization PIN</span>
                <p className="text-[11px] text-slate-300">PIN shared with verified teachers to enter Faculty workspace</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm font-bold tracking-widest px-2.5 py-1 rounded-lg bg-black/40 border border-white/10">
                  {showFacultyCurrentPin ? facultyPin : '••••'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowFacultyCurrentPin(!showFacultyCurrentPin)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
                  title={showFacultyCurrentPin ? 'Hide PIN' : 'Reveal PIN'}
                >
                  {showFacultyCurrentPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {!showFacultyPinForm ? (
              <button
                type="button"
                onClick={() => {
                  setShowFacultyPinForm(true);
                  setFacultyPinError('');
                  setNewFacultyPin('');
                  setConfirmFacultyPin('');
                }}
                className="w-full py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center space-x-1.5"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Reset Faculty PIN</span>
              </button>
            ) : (
              <form onSubmit={handleUpdateFacultyPin} className="space-y-2.5 pt-2 border-t border-white/10">
                {facultyPinError && (
                  <div className="p-2 rounded-lg bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-semibold">
                    {facultyPinError}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">New PIN (4-8 digits)</label>
                    <input
                      type="password"
                      required
                      maxLength={8}
                      value={newFacultyPin}
                      onChange={e => setNewFacultyPin(e.target.value)}
                      placeholder="New PIN"
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-300 mb-1">Confirm New PIN</label>
                    <input
                      type="password"
                      required
                      maxLength={8}
                      value={confirmFacultyPin}
                      onChange={e => setConfirmFacultyPin(e.target.value)}
                      placeholder="Confirm PIN"
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowFacultyPinForm(false)}
                    className="w-1/3 py-1.5 px-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-slate-300 font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-1.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black shadow-sm transition-all"
                  >
                    Save Faculty PIN
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ================= SECTION: SMS & WHATSAPP MOBILE OTP GATEWAY ================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-900">
                  SMS & WhatsApp Mobile OTP Gateway
                </h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Dispatches real verification codes directly to students' mobile phones upon login. Plaintext codes and auto-fill buttons are permanently blocked on student screens.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left: Gateway Configuration Form */}
          <form onSubmit={handleSaveSmsConfig} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Gateway Dispatch Engine
              </span>
              {showSmsConfigSaved && (
                <span className="text-emerald-600 font-bold flex items-center space-x-1 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Settings Saved</span>
                </span>
              )}
            </div>

            <div>
              <label className="block font-bold text-slate-600 mb-1">Dispatch Method:</label>
              <select
                value={smsGatewayConfig.provider}
                onChange={e => setSmsGatewayConfig({ ...smsGatewayConfig, provider: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800"
              >
                <option value="whatsapp_direct">WhatsApp Direct & Device SMS (Recommended - 100% Free & Instant)</option>
                <option value="fast2sms">Fast2SMS Indian Gateway (HTTP Automated Dispatch)</option>
                <option value="custom_webhook">Custom Webhook API (Cloudflare / AWS / Firebase)</option>
              </select>
            </div>

            {smsGatewayConfig.provider === 'fast2sms' && (
              <div className="space-y-1">
                <label className="block font-bold text-slate-600">Fast2SMS Authorization API Key:</label>
                <input
                  type="password"
                  value={smsGatewayConfig.apiKey || ''}
                  onChange={e => setSmsGatewayConfig({ ...smsGatewayConfig, apiKey: e.target.value })}
                  placeholder="Paste Fast2SMS API Key"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono text-xs text-slate-800"
                />
                <p className="text-[10px] text-slate-400">
                  Calls Fast2SMS OTP route to deliver direct cellular SMS messages in India.
                </p>
              </div>
            )}

            {smsGatewayConfig.provider === 'custom_webhook' && (
              <div className="space-y-1">
                <label className="block font-bold text-slate-600">Webhook Endpoint URL:</label>
                <input
                  type="url"
                  value={smsGatewayConfig.webhookUrl || ''}
                  onChange={e => setSmsGatewayConfig({ ...smsGatewayConfig, webhookUrl: e.target.value })}
                  placeholder="https://api.yourdomain.com/send-sms"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono text-xs text-slate-800"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Update Gateway Settings
            </button>
          </form>

          {/* Right: Live Test Dispatch Tool */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3.5 text-xs">
            <div className="flex items-center space-x-2 border-b border-emerald-200 pb-2">
              <MessageCircle className="w-4 h-4 text-emerald-700" />
              <span className="font-bold text-emerald-950 uppercase tracking-wider text-[11px]">
                Live Mobile OTP Test Dispatch
              </span>
            </div>

            <p className="text-slate-600 leading-relaxed text-[11px]">
              Verify that mobile OTP dispatch delivers properly to your personal phone before classroom rollout:
            </p>

            <div className="space-y-2">
              <div className="flex space-x-2">
                <span className="inline-flex items-center px-3 rounded-xl border border-emerald-300 bg-white text-slate-700 font-mono font-bold text-xs">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={testSmsMobile}
                  onChange={e => setTestSmsMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="9812345678"
                  className="flex-1 px-3 py-2 rounded-xl border border-emerald-300 bg-white font-mono font-bold text-xs text-slate-900"
                />
                <button
                  type="button"
                  disabled={isSendingTestOtp || testSmsMobile.length !== 10}
                  onClick={handleSendTestOtp}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-xs shadow-sm transition-all shrink-0"
                >
                  {isSendingTestOtp ? 'Sending...' : 'Send Test OTP'}
                </button>
              </div>

              {testSmsStatus && (
                <div className="p-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 text-xs font-semibold animate-fadeIn">
                  {testSmsStatus}
                </div>
              )}

              {lastTestOtp && (
                <div className="p-3.5 rounded-2xl bg-white border-2 border-emerald-500 shadow-sm space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700">Generated OTP for +91 {lastTestOtp.mobile}:</span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Valid 5 Mins
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-xl font-black font-mono tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-300">
                      {lastTestOtp.code}
                    </div>
                    <a
                      href={lastTestOtp.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Open in WhatsApp</span>
                    </a>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Click "Open in WhatsApp" to deliver this message directly to WhatsApp Web/App, or use code <strong>{lastTestOtp.code}</strong>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live OTP Dispatch Audit Logs */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-600">
              Recent Verification Dispatches & Audit Log
            </span>
            <span className="text-[11px] font-bold text-slate-400">
              Showing last {otpLogs.length} attempts
            </span>
          </div>

          {otpLogs.length === 0 ? (
            <div className="py-4 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-2xl">
              No OTP dispatches logged yet. When students enter mobile numbers, audit entries will appear here.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Recipient Mobile</th>
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">OTP Code</th>
                    <th className="py-2.5 px-3">Channel</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {otpLogs.slice(0, 10).map((log, idx) => (
                    <tr key={log.id || idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2 px-3 font-mono font-bold text-slate-900">
                        {log.maskedMobile}
                      </td>
                      <td className="py-2 px-3 text-slate-700">
                        {log.studentName}
                      </td>
                      <td className="py-2 px-3">
                        <span className="font-mono font-black text-xs px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {log.code || '123456'}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-800">
                          {log.channel === 'whatsapp' ? 'WhatsApp' : log.channel === 'sms_gateway' ? 'SMS Gateway' : log.channel === 'admin_bypass' ? 'Educator Bypass' : 'Mobile SMS'}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                            log.status === 'verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : log.status === 'dispatched'
                              ? 'bg-indigo-100 text-indigo-800'
                              : log.status === 'expired'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right text-[11px] text-slate-400 font-mono">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ================= SECTION 1: EVALUATIONS & GRADING DESK ================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Student Test Submissions & Grading Desk
              </h3>
              <p className="text-xs text-slate-500">
                Review subjective answers, award marks, write personalized mentor guidance, and release scorecards
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            {studentSubmissions.length} Total Submissions
          </span>
        </div>

        {studentSubmissions.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs">
            No student submissions received yet. When students complete assigned tests, their answers will appear here for evaluation.
          </div>
        ) : (
          <div className="space-y-4">
            {studentSubmissions.map(sub => {
              const isPending = sub.status === 'submitted';
              const isEvaluating = evaluatingSubId === sub.id;

              return (
                <div
                  key={sub.id}
                  className={`p-5 rounded-2xl border space-y-3 transition-all ${
                    isPending
                      ? 'bg-amber-50/30 border-amber-300 ring-2 ring-amber-400/10'
                      : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                        {sub.studentName}
                      </span>
                      {sub.studentMobile && (
                        <a
                          href={`tel:${sub.studentMobile}`}
                          className="inline-flex items-center space-x-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                          title="Call student"
                        >
                          <Phone className="w-3 h-3 text-emerald-600" />
                          <span>{sub.studentMobile}</span>
                        </a>
                      )}
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                        Grade {sub.studentGrade}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                          isPending ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isPending ? 'Needs Faculty Evaluation' : 'Evaluated & Released'}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400">
                      Submitted: {new Date(sub.submittedAt).toLocaleDateString()} at {new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                      {sub.testTitle}
                    </h4>
                    <div className="flex items-center space-x-3 text-xs text-slate-500 mt-0.5">
                      <span>Objective Auto-Score: <strong className="text-slate-800">{sub.autoScore} M</strong></span>
                      {sub.manualScore !== undefined && (
                        <span>Subjective Score: <strong className="text-emerald-700">+{sub.manualScore} M</strong></span>
                      )}
                      <span>Total Marks: <strong className="text-slate-800">{sub.totalMarks} M</strong></span>
                    </div>
                  </div>

                  {/* Student's Answers Display */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Student's Submitted Responses:
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(sub.answers).map(([qId, ans], idx) => (
                        <div key={qId} className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                          <div className="flex items-center justify-between text-slate-600 font-bold">
                            <span>Q{idx + 1} ({qId})</span>
                            <span className="text-[10px] text-indigo-600">
                              {ans.marksAwarded !== undefined ? `${ans.marksAwarded} Marks` : 'Pending Mark'}
                            </span>
                          </div>
                          <div className="font-mono text-slate-700 whitespace-pre-wrap bg-slate-50 p-2 rounded-lg border border-slate-100 text-[11px]">
                            {ans.userText || (ans.userMcqIndex !== undefined ? `Option: ${String.fromCharCode(65 + ans.userMcqIndex)}` : String(ans.userBoolean))}
                          </div>
                          {ans.uploadedAttachment && (
                            <div className="mt-2 p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-between">
                              <div className="flex items-center space-x-2.5 min-w-0">
                                {ans.uploadedAttachment.type === 'image' ? (
                                  <img
                                    src={ans.uploadedAttachment.dataUrl}
                                    alt="Student sheet"
                                    className="w-12 h-12 object-cover rounded-lg border border-indigo-200 cursor-pointer"
                                    onClick={() => setPreviewSheetModal(ans.uploadedAttachment)}
                                  />
                                ) : (
                                  <div className="w-12 h-12 rounded-lg bg-indigo-200 text-indigo-800 font-bold text-xs flex items-center justify-center shrink-0">
                                    PDF
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <div className="font-bold text-xs text-slate-800 truncate">{ans.uploadedAttachment.name}</div>
                                  <div className="text-[10px] text-indigo-600 font-medium">Uploaded Answer Sheet</div>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => setPreviewSheetModal(ans.uploadedAttachment)}
                                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-2xs transition-colors shrink-0"
                              >
                                View Sheet
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mentor Feedback Display if evaluated */}
                  {sub.facultyFeedback && !isEvaluating && (
                    <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                      <span className="font-bold text-emerald-800">Uma Shukla's Official Feedback:</span>
                      <p className="italic">"{sub.facultyFeedback}"</p>
                    </div>
                  )}

                  {/* Evaluation Button / Form */}
                  {isPending && !isEvaluating && (
                    <button
                      onClick={() => {
                        setEvaluatingSubId(sub.id);
                        setEvalManualScore(Math.max(1, sub.totalMarks - (sub.autoScore || 0)));
                      }}
                      className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center space-x-1.5"
                    >
                      <ClipboardCheck className="w-4 h-4" />
                      <span>Grade Subjective Answers & Write Feedback</span>
                    </button>
                  )}

                  {isEvaluating && (
                    <div className="p-4 rounded-2xl bg-white border border-indigo-200 space-y-3 pt-3 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-indigo-900">
                          Faculty Evaluation Desk for {sub.studentName}
                        </span>
                        <button
                          onClick={() => setEvaluatingSubId(null)}
                          className="text-xs text-slate-400 hover:text-slate-600"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">
                            Subjective Marks to Award (Max {sub.totalMarks - (sub.autoScore || 0)} M):
                          </label>
                          <input
                            type="number"
                            min={0}
                            max={sub.totalMarks - (sub.autoScore || 0)}
                            value={evalManualScore}
                            onChange={e => setEvalManualScore(Number(e.target.value))}
                            className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">
                            Total Scored Result:
                          </label>
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-black text-emerald-600">
                            {(sub.autoScore || 0) + evalManualScore} / {sub.totalMarks} Marks
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">
                          Teacher's Feedback & Exam Tip for {sub.studentName}:
                        </label>
                        <textarea
                          rows={3}
                          value={evalFeedback}
                          onChange={e => setEvalFeedback(e.target.value)}
                          placeholder="Write constructive guidance, highlight strengths and areas for improvement..."
                          className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-100 outline-none"
                        />
                      </div>

                      <div className="flex justify-end space-x-2 pt-1">
                        <button
                          onClick={() => setEvaluatingSubId(null)}
                          className="px-3 py-1.5 rounded-xl text-xs text-slate-600 hover:bg-slate-100 font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleReleaseEvaluation(sub.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center space-x-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Release Scorecard to Student</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= SECTION 2: ASSIGNED FACULTY TEST PAPERS ================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Active Faculty Test Papers & Homework
              </h3>
              <p className="text-xs text-slate-500">
                Tests appearing in students' respective login accounts by grade
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedQIds([]);
              setShowTestPaperModal(true);
            }}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Assign New Test Paper</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {facultyTests.map(test => (
            <div
              key={test.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-violet-100 text-violet-800">
                    Grade {test.targetGrade}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {test.subjectName}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                  {test.title}
                </h4>

                <div className="flex items-center space-x-3 text-[11px] text-slate-500">
                  <span>{test.totalMarks} Marks</span>
                  <span>•</span>
                  <span>{test.durationMinutes} mins</span>
                  <span>•</span>
                  <span>{test.questions.length} Questions</span>
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {test.instructions}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/70">
                <span className="text-[10px] text-slate-400">
                  Due: {new Date(test.dueDate).toLocaleDateString()}
                </span>
                <button
                  onClick={() => {
                    if (confirm(`Delete test "${test.title}"?`)) {
                      deleteFacultyTest(test.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Test Paper"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SECTION: CURRICULUM & LESSON CONTENT MANAGER ================= */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                Full Curriculum Authority
              </span>
              <span className="text-xs text-slate-400">Director Uma Shukla</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Curriculum & Lesson Content Manager
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-0.5">
              Inspect all subjects (including Sanskrit, Social Studies, EVS, Science, Math & Commerce) and edit chapter summaries, core concepts, formulas, and lock status.
            </p>
          </div>

          <button
            onClick={() => setShowAddChapterModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 shrink-0 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Chapter</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Board Filter */}
          <div className="w-32">
            <select
              value={curriculumBoardFilter}
              onChange={e => setCurriculumBoardFilter(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">All Boards</option>
              <option value="ICSE">ICSE</option>
              <option value="CBSE">CBSE</option>
              <option value="IGCSE">Cambridge IGCSE</option>
            </select>
          </div>

          {/* Subject Filter */}
          <div className="flex-1 min-w-[200px]">
            <select
              value={curriculumSubjectFilter}
              onChange={e => setCurriculumSubjectFilter(e.target.value as any)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">All Subjects ({ICSE_SUBJECTS.length})</option>
              {ICSE_SUBJECTS.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Grade Filter */}
          <div className="w-36">
            <select
              value={curriculumGradeFilter}
              onChange={e => setCurriculumGradeFilter(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">All Grades</option>
              {['2', '3', '4', '5', '6', '7', '11', '12'].map(g => (
                <option key={g} value={g}>
                  {g === '11' || g === '12' ? `Class ${g} Commerce` : `Grade ${g}`}
                </option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={curriculumSearch}
              onChange={e => setCurriculumSearch(e.target.value)}
              placeholder="Search chapter title or keyword..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Chapters Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto p-1">
          {filteredCurriculumChapters.length === 0 ? (
            <div className="col-span-full p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs font-medium">
              No chapters match the selected filters.
            </div>
          ) : (
            filteredCurriculumChapters.map(ch => {
              const subject = ICSE_SUBJECTS.find(s => s.id === ch.subjectId);
              const chapterQuestions = ICSE_QUESTION_BANK.filter(q => q.chapterId === ch.id);

              return (
                <div
                  key={ch.id}
                  className="p-5 rounded-3xl bg-slate-50/80 hover:bg-white border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                        {subject?.name || ch.subjectId} • Ch {ch.chapterNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 ${
                          ch.isLocked
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {ch.isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                        <span>{ch.isLocked ? 'Locked (Pro)' : 'Open Demo'}</span>
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {ch.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {ch.summary}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-white border border-slate-200/80 text-[11px] text-center">
                      <div>
                        <div className="font-bold text-slate-900">{ch.keyConcepts?.length || 0}</div>
                        <div className="text-[10px] text-slate-400">Concepts</div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{ch.keyFormulasOrTerms?.length || 0}</div>
                        <div className="text-[10px] text-slate-400">Rules/Terms</div>
                      </div>
                      <div>
                        <div className="font-bold text-indigo-600">{chapterQuestions.length}</div>
                        <div className="text-[10px] text-slate-400">Questions</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-2 border-t border-slate-100 mt-3">
                    <button
                      onClick={() => setEditingChapter(ch)}
                      className="flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xs transition-all active:scale-95"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Content</span>
                    </button>

                    <button
                      onClick={() => goToChapterDetail(ch.id)}
                      className="flex items-center justify-center space-x-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs transition-colors"
                      title="Inspect in Student Mode"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ================= SECTION 3: COURSEWARE & DOUBTS DESK ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Published Chapter Resources Manager */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Published Videos, PPTs & Courseware
                </h3>
                <p className="text-xs text-slate-500">
                  Manage digital learning material accessible by students and parents
                </p>
              </div>

              {/* Subject filter */}
              <select
                value={selectedSubjectFilter}
                onChange={e => setSelectedSubjectFilter(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 outline-none"
              >
                <option value="all">All Subjects ({allResources.length})</option>
                {ICSE_SUBJECTS.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Resources List */}
            <div className="space-y-3">
              {filteredResources.map((item, idx) => {
                const { resource, chapterId, chapterTitle } = item;
                const isVideo = resource.type === 'video';
                const isPpt = resource.type === 'ppt_presentation';
                const isLab = resource.type === 'graphical_lab';

                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                            isVideo
                              ? 'bg-rose-100 text-rose-800'
                              : isPpt
                              ? 'bg-indigo-100 text-indigo-800 font-bold'
                              : isLab
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isVideo ? 'Video Lecture' : isPpt ? 'PPT Presentation' : isLab ? 'Visual Lab' : 'Notes PDF'}
                        </span>
                        <span className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {chapterTitle}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {resource.durationOrPages}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                        {resource.title}
                      </h4>

                      <p className="text-xs text-slate-500 line-clamp-1">
                        {resource.description || 'No description provided.'}
                      </p>

                      <div className="text-[10px] text-slate-400">
                        Author: <b>{resource.uploadedBy || 'Uma Shukla'}</b>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-center">
                      {isVideo && (
                        <button
                          onClick={() => setActiveVideo(resource)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Watch Video</span>
                        </button>
                      )}

                      {isPpt && (
                        <button
                          onClick={() => setPreviewPpt(resource)}
                          className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center space-x-1 shadow-xs"
                        >
                          <Presentation className="w-3.5 h-3.5 text-amber-300" />
                          <span>Preview Slides</span>
                        </button>
                      )}

                      <button
                        onClick={() => goToChapterDetail(chapterId)}
                        className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors"
                      >
                        <span>Open Lesson</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete "${resource.title}" from ${chapterTitle}?`)) {
                            deleteChapterResource(chapterId, resource.title);
                          }
                        }}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete material"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Student Doubts Inquiries Desk */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Student Doubts Desk</h3>
                <p className="text-xs text-slate-500">Inquiries submitted by Grade 7 students</p>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                {doubts.length} Inquiries
              </span>
            </div>

            <div className="space-y-3">
              {doubts.map(d => {
                const isPending = d.status === 'pending';
                const isReplying = replyingDoubtId === d.id;

                return (
                  <div
                    key={d.id}
                    className={`p-4 rounded-2xl border space-y-2 transition-all ${
                      isPending ? 'bg-amber-50/40 border-amber-300' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white text-indigo-700 border border-slate-200">
                          {d.studentName || 'Aarav Sharma'}
                        </span>
                        {d.studentMobile && (
                          <a
                            href={`tel:${d.studentMobile}`}
                            className="inline-flex items-center space-x-0.5 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                            title="Call student"
                          >
                            <Phone className="w-2.5 h-2.5 text-emerald-600" />
                            <span>{d.studentMobile}</span>
                          </a>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isPending ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isPending ? 'Action Required' : 'Resolved'}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-800">
                      {d.chapterTitle} • {d.questionOrTopic}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "{d.noteText}"
                    </p>

                    {d.mentorReply && (
                      <div className="p-3 rounded-xl bg-white border border-emerald-200 text-xs text-emerald-950 font-medium">
                        <span className="font-bold text-emerald-800">Uma Ma'am's Reply: </span>
                        {d.mentorReply}
                      </div>
                    )}

                    {isPending && !isReplying && (
                      <button
                        onClick={() => {
                          setReplyingDoubtId(d.id);
                          setReplyText('');
                        }}
                        className="w-full py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors"
                      >
                        Reply as Uma Shukla
                      </button>
                    )}

                    {isReplying && (
                      <div className="space-y-2 pt-2 border-t border-amber-200">
                        <textarea
                          rows={3}
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                          placeholder="Type your explanation/concept guidance for the student..."
                          className="w-full p-2.5 rounded-xl border border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none text-xs text-slate-800"
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setReplyingDoubtId(null)}
                            className="px-3 py-1 rounded-lg text-xs text-slate-500 hover:bg-slate-200"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSendReply(d.id)}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1"
                          >
                            <Send className="w-3 h-3" />
                            <span>Send & Resolve</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL: ADD VIDEO LECTURE ================= */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Add Video Lecture</h3>
                  <p className="text-xs text-slate-500">By Uma Shukla for Grade 7 ICSE</p>
                </div>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVideo} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-slate-500 mb-1">Subject:</label>
                  <select
                    value={videoSubjectId}
                    onChange={e => {
                      const sub = e.target.value as SubjectId;
                      setVideoSubjectId(sub);
                      const firstChap = chapters.find(c => c.subjectId === sub);
                      setVideoChapterId(firstChap ? firstChap.id : '');
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                  >
                    {ICSE_SUBJECTS.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-500 mb-1">Chapter:</label>
                  <select
                    value={videoChapterId}
                    onChange={e => setVideoChapterId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                  >
                    {availableVideoChapters.map(c => (
                      <option key={c.id} value={c.id}>Ch {c.chapterNumber}: {c.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Lecture Title:</label>
                <input
                  type="text"
                  required
                  value={videoTitle}
                  onChange={e => setVideoTitle(e.target.value)}
                  placeholder="e.g. Master Laws of Motion & Graph Solved Examples with Uma Shukla"
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-slate-500 mb-1">Duration:</label>
                  <input
                    type="text"
                    value={videoDuration}
                    onChange={e => setVideoDuration(e.target.value)}
                    placeholder="e.g. 24 mins"
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-500 mb-1">Video URL / Embed:</label>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/embed/..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Lecture Description & Takeaways:</label>
                <textarea
                  rows={3}
                  value={videoDescription}
                  onChange={e => setVideoDescription(e.target.value)}
                  placeholder="Summarize key topics covered, exam weightage, and teacher advice..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowVideoModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-md"
                >
                  Publish Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD PPT PRESENTATION ================= */}
      {showPptModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Presentation className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Add PPT / Slide Presentation</h3>
                  <p className="text-xs text-slate-500">By Uma Shukla for Grade 7 ICSE</p>
                </div>
              </div>
              <button
                onClick={() => setShowPptModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPpt} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-slate-500 mb-1">Subject:</label>
                  <select
                    value={pptSubjectId}
                    onChange={e => {
                      const sub = e.target.value as SubjectId;
                      setPptSubjectId(sub);
                      const firstChap = chapters.find(c => c.subjectId === sub);
                      setPptChapterId(firstChap ? firstChap.id : '');
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                  >
                    {ICSE_SUBJECTS.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-500 mb-1">Chapter:</label>
                  <select
                    value={pptChapterId}
                    onChange={e => setPptChapterId(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                  >
                    {availablePptChapters.map(c => (
                      <option key={c.id} value={c.id}>Ch {c.chapterNumber}: {c.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">Presentation Title:</label>
                <input
                  type="text"
                  required
                  value={pptTitle}
                  onChange={e => setPptTitle(e.target.value)}
                  placeholder="e.g. Plant and Animal Tissues: 28-Slide Complete Visual Deck"
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-slate-500 mb-1">Slide Count:</label>
                  <input
                    type="text"
                    value={pptSlides}
                    onChange={e => setPptSlides(e.target.value)}
                    placeholder="e.g. 6 Slides"
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-500 mb-1">Slide Deck / PDF URL:</label>
                  <input
                    type="text"
                    value={pptUrl}
                    onChange={e => setPptUrl(e.target.value)}
                    placeholder="https://docs.google.com/presentation/d/..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">PPT Description & Summary:</label>
                <textarea
                  rows={3}
                  value={pptDescription}
                  onChange={e => setPptDescription(e.target.value)}
                  placeholder="Visual slide deck covering diagrams, comparative tables, and board exam bullet points..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPptModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md"
                >
                  Publish PPT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: CREATE & ASSIGN TEST PAPER ================= */}
      {showTestPaperModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Create & Assign Test Paper</h3>
                  <p className="text-xs text-slate-500">Assign exam homework to student accounts by grade</p>
                </div>
              </div>
              <button
                onClick={() => setShowTestPaperModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTestPaper} className="space-y-4 text-xs overflow-y-auto pr-1 flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">Target Grade:</label>
                  <select
                    value={testGrade}
                    onChange={e => setTestGrade(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white"
                  >
                    <option value="12">Class 12 (CBSE Commerce)</option>
                    <option value="11">Class 11 (CBSE Commerce)</option>
                    <option value="7">Grade 7</option>
                    <option value="6">Grade 6</option>
                    <option value="5">Grade 5</option>
                    <option value="4">Grade 4</option>
                    <option value="3">Grade 3</option>
                    <option value="2">Grade 2</option>
                    <option value="all">All Grades / Classes</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">Subject:</label>
                  <select
                    value={testSubjectId}
                    onChange={e => setTestSubjectId(e.target.value as SubjectId)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white"
                  >
                    {ICSE_SUBJECTS.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-600 mb-1">Test Title:</label>
                <input
                  type="text"
                  required
                  value={testTitle}
                  onChange={e => setTestTitle(e.target.value)}
                  placeholder="e.g. Weekly Benchmark: Binary Arithmetic & Computer Systems"
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">Duration (mins):</label>
                  <input
                    type="number"
                    min={5}
                    max={180}
                    value={testDuration}
                    onChange={e => setTestDuration(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">Total Marks:</label>
                  <input
                    type="number"
                    min={1}
                    value={testTotalMarks}
                    onChange={e => setTestTotalMarks(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">Passing Marks:</label>
                  <input
                    type="number"
                    min={1}
                    value={testPassingMarks}
                    onChange={e => setTestPassingMarks(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-600 mb-1">Instructions for Students:</label>
                <textarea
                  rows={2}
                  value={testInstructions}
                  onChange={e => setTestInstructions(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              {/* Question Selection Checklist */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block font-bold uppercase text-slate-600">
                    Select Questions from ICSE Question Bank ({ICSE_QUESTION_BANK.filter(q => q.subjectId === testSubjectId).length} Available):
                  </label>
                  <span className="text-[11px] text-indigo-600 font-semibold">
                    {selectedQIds.length} Selected (Auto-picks 4 if none selected)
                  </span>
                </div>

                <div className="max-h-48 overflow-y-auto space-y-2 border border-slate-200 rounded-2xl p-2.5 bg-slate-50">
                  {ICSE_QUESTION_BANK.filter(q => q.subjectId === testSubjectId).map(q => {
                    const isChecked = selectedQIds.includes(q.id);
                    return (
                      <label
                        key={q.id}
                        className={`p-2.5 rounded-xl border flex items-start space-x-2.5 cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-indigo-50 border-indigo-300 text-indigo-950'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={e => {
                            if (e.target.checked) {
                              setSelectedQIds(prev => [...prev, q.id]);
                            } else {
                              setSelectedQIds(prev => prev.filter(id => id !== q.id));
                            }
                          }}
                          className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <div className="flex-1 text-xs">
                          <div className="flex items-center space-x-2 mb-0.5">
                            <span className="font-bold uppercase text-[10px] px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700">
                              {q.type.replace('_', ' ')}
                            </span>
                            <span className="text-[10px] font-semibold text-amber-700">
                              {q.marks} {q.marks > 1 ? 'Marks' : 'Mark'}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {q.chapterTitle}
                            </span>
                          </div>
                          <p className="line-clamp-2 text-slate-800 font-medium">
                            {q.text}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowTestPaperModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-md flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish to Students</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD FACULTY MEMBER ================= */}
      {showAddFacultyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Add New Faculty Member</h3>
                  <p className="text-[11px] text-slate-500">
                    Authorize an educator to upload test papers, PPTs, and video lectures
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddFacultyModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddFaculty} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={facName}
                    onChange={e => setFacName(e.target.value)}
                    placeholder="e.g. Prof. Suresh Chandra"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Designation</label>
                  <input
                    type="text"
                    required
                    value={facDesignation}
                    onChange={e => setFacDesignation(e.target.value)}
                    placeholder="e.g. Senior Faculty - Mathematics & Science"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Official Email</label>
                  <input
                    type="email"
                    value={facEmail}
                    onChange={e => setFacEmail(e.target.value)}
                    placeholder="suresh.chandra@mantraclasses.com"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={facPhone}
                    onChange={e => setFacPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Assigned Subjects Checkboxes */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Assigned Teaching Subjects ({facSubjects.length} selected)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  {ICSE_SUBJECTS.map(s => {
                    const isSelected = facSubjects.includes(s.id);
                    return (
                      <label
                        key={s.id}
                        className={`flex items-center space-x-1.5 p-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                          isSelected ? 'bg-indigo-100 text-indigo-900' : 'hover:bg-slate-200/60 text-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {
                            setFacSubjects(prev =>
                              isSelected ? prev.filter(id => id !== s.id) : [...prev, s.id]
                            );
                          }}
                          className="rounded text-indigo-600"
                        />
                        <span className="truncate">{s.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Assigned Grades Checkboxes */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Assigned Teaching Grades ({facGrades.length} selected)
                </label>
                <div className="flex flex-wrap gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  {(['12', '11', '7', '6', '5', '4', '3', '2'] as GradeLevel[]).map(g => {
                    const isSelected = facGrades.includes(g);
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => {
                          setFacGrades(prev =>
                            isSelected ? prev.filter(item => item !== g) : [...prev, g]
                          );
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {g === '11' || g === '12' ? `Class ${g}` : `Grade ${g}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Brief Bio / Academic Background
                </label>
                <textarea
                  rows={2}
                  value={facBio}
                  onChange={e => setFacBio(e.target.value)}
                  placeholder="Experience, ICSE specialization, and teaching accomplishments..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddFacultyModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center space-x-1.5"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Register Faculty Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: REJECTION / REVISION FEEDBACK ================= */}
      {rejectingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <X className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Request Revision / Feedback</h3>
                  <p className="text-[10px] text-slate-500 line-clamp-1">{rejectingItem.title}</p>
                </div>
              </div>
              <button
                onClick={() => setRejectingItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                Provide specific pedagogical guidance or corrections for the submitting faculty member.
              </p>
              <textarea
                rows={3}
                value={rejectionFeedback}
                onChange={e => setRejectionFeedback(e.target.value)}
                placeholder="Explain what needs adjustment before approval..."
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setRejectingItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRejection}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Revision Request</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inspect Test Questions Modal for Admin */}
      {previewTest && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{previewTest.title}</h3>
                <div className="text-xs text-slate-500">
                  Grade {previewTest.targetGrade} • {previewTest.subjectName} • {previewTest.totalMarks} Marks • Submitted by {previewTest.facultyName || previewTest.createdBy}
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
                    <span>{q.marks} Marks • {q.difficulty}</span>
                  </div>
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">{q.text}</div>
                  {q.mantraHint && (
                    <div className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                      <strong>Exam Mantra:</strong> {q.mantraHint}
                    </div>
                  )}
                  {q.explanation && (
                    <div className="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200">
                      <strong>Sample Solution / Criteria:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => setPreviewTest(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  approveTestPaper(previewTest.id);
                  setPreviewTest(null);
                  setSuccessToast(`Test paper "${previewTest.title}" approved and released to students!`);
                  setTimeout(() => setSuccessToast(''), 4000);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Approve & Release to Students</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PPT Slide Preview Modal for Admin */}
      <PptSlideViewerModal
        pptResource={previewPpt}
        onClose={() => setPreviewPpt(null)}
      />

      {/* Answer Sheet Zoom Modal */}
      {previewSheetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="text-xs font-bold">{previewSheetModal.name}</span>
              <button
                type="button"
                onClick={() => setPreviewSheetModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-auto flex items-center justify-center bg-slate-100 max-h-[80vh]">
              {previewSheetModal.type === 'image' ? (
                <img
                  src={previewSheetModal.dataUrl}
                  alt="Enlarged student answer sheet"
                  className="max-h-[75vh] object-contain rounded-xl shadow-md"
                />
              ) : (
                <iframe
                  src={previewSheetModal.dataUrl}
                  title="PDF Sheet Preview"
                  className="w-full h-[70vh] rounded-xl"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chapter Curriculum Editor Modal for Admin */}
      <ChapterEditModal
        isOpen={!!editingChapter}
        chapter={editingChapter}
        onClose={() => setEditingChapter(null)}
        onSave={(chapterId, updates) => {
          updateChapter(chapterId, updates);
          setSuccessToast('Chapter curriculum content updated successfully!');
          setTimeout(() => setSuccessToast(''), 3000);
        }}
      />

      {/* Add New Chapter Modal */}
      {showAddChapterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-400/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Create New Curriculum Chapter</h3>
                  <p className="text-xs text-slate-300">Add a new unit under any board and subject</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddChapterModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewChapter} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Subject</label>
                  <select
                    value={newChapSubjectId}
                    onChange={e => setNewChapSubjectId(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {ICSE_SUBJECTS.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Board</label>
                  <select
                    value={newChapBoard}
                    onChange={e => setNewChapBoard(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="ICSE">ICSE</option>
                    <option value="CBSE">CBSE</option>
                    <option value="IGCSE">Cambridge IGCSE</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Grade</label>
                  <select
                    value={newChapGrade}
                    onChange={e => setNewChapGrade(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {['2', '3', '4', '5', '6', '7', '11', '12'].map(g => (
                      <option key={g} value={g}>{g === '11' || g === '12' ? `Class ${g} Com` : `Grade ${g}`}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-bold text-slate-700">Chapter Number</label>
                  <input
                    type="number"
                    min="1"
                    value={newChapNumber}
                    onChange={e => setNewChapNumber(parseInt(e.target.value) || 1)}
                    className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Chapter Title</label>
                <input
                  type="text"
                  required
                  value={newChapTitle}
                  onChange={e => setNewChapTitle(e.target.value)}
                  placeholder="e.g. Sanskrit Vyakaran Sandhi Prakaranam"
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Chapter Summary</label>
                <textarea
                  rows={3}
                  value={newChapSummary}
                  onChange={e => setNewChapSummary(e.target.value)}
                  placeholder="Overview of topics and learning objectives covered..."
                  className="w-full mt-1 p-3 rounded-xl border border-slate-200 text-xs outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddChapterModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md"
                >
                  Create & Save Chapter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

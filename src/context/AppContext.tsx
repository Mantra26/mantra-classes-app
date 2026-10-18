import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  UserProfile,
  TestAttempt,
  Bookmark,
  DoubtNote,
  CustomTestConfig,
  PaymentTransaction,
  SubjectId,
  Subject,
  Question,
  UserAnswer,
  TopicWeakness,
  ChapterResource,
  Chapter,
  UserRole,
  GradeLevel,
  FacultyTestPaper,
  StudentTestSubmission,
  FacultyMember,
  ApprovalStatus,
  EducationBoard,
  LabType
} from '../types';
import { storage } from '../services/storage';
import { ICSE_QUESTION_BANK } from '../data/questionBank';
import { ICSE_CHAPTERS, ICSE_SUBJECTS } from '../data/icseCurriculum';
import confetti from 'canvas-confetti';

export type ViewState =
  | 'dashboard'
  | 'subjects'
  | 'chapter-detail'
  | 'test-series'
  | 'custom-builder'
  | 'assigned-tests'
  | 'analytics'
  | 'payment'
  | 'bookmarks'
  | 'doubts'
  | 'admin'
  | 'faculty';

export interface ActiveTestState {
  title: string;
  testType: 'subject-wise' | 'lesson-wise' | 'custom' | 'remedial';
  subjectId?: SubjectId;
  chapterIds: string[];
  durationMinutes: number;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, UserAnswer>;
  flaggedQuestionIds: Record<string, boolean>;
  remainingSeconds: number;
  isCompleted: boolean;
}

interface AppContextType {
  // Navigation & UI state
  view: ViewState;
  setView: (v: ViewState) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  toggleRole: () => void;
  selectedSubjectId: SubjectId | null;
  setSelectedSubjectId: (id: SubjectId | null) => void;
  selectedChapterId: string | null;
  setSelectedChapterId: (id: string | null) => void;
  activeVideo: ChapterResource | null;
  setActiveVideo: (res: ChapterResource | null) => void;
  activeLabType: LabType | null;
  setActiveLabType: (lab: LabType | null) => void;

  // Chapters & Dynamic Admin Resources
  chapters: Chapter[];
  addChapterResource: (chapterId: string, resource: ChapterResource) => void;
  deleteChapterResource: (chapterId: string, resourceTitle: string) => void;

  // Staff & Student Auth
  isStaffModalOpen: boolean;
  setIsStaffModalOpen: (open: boolean) => void;
  loginStudent: (studentData: Partial<UserProfile>) => void;
  logoutStudent: () => void;
  verifyStaffPinAndSwitch: (role: UserRole, pin: string) => boolean;
  returnToStudentPortal: () => void;
  adminPin: string;
  updateAdminPin: (newPin: string) => boolean;
  facultyPin: string;
  updateFacultyPin: (newPin: string) => boolean;
  registeredStudents: UserProfile[];

  // Data & Models
  user: UserProfile;
  updateUser: (fields: Partial<UserProfile>) => void;
  testAttempts: TestAttempt[];
  deleteTestAttempt: (id: string) => void;
  bookmarks: Bookmark[];
  toggleBookmark: (questionId: string, notes?: string) => void;
  updateBookmarkNotes: (questionId: string, notes: string) => void;
  doubts: DoubtNote[];
  addDoubtNote: (
    chapterId: string,
    topic: string,
    note: string,
    options?: {
      recipientRole?: 'faculty' | 'admin';
      recipientId?: string;
      recipientName?: string;
      subjectId?: SubjectId;
      subjectName?: string;
      attachmentUrl?: string;
      attachmentName?: string;
    }
  ) => void;
  toggleDoubtStatus: (id: string) => void;
  deleteDoubtNote: (id: string) => void;
  replyToDoubtNote: (doubtId: string, replyText: string, repliedBy?: string) => void;

  // Custom Presets
  customPresets: CustomTestConfig[];
  saveCustomPreset: (preset: CustomTestConfig) => void;
  deleteCustomPreset: (id: string) => void;

  // Active Test Engine
  activeTest: ActiveTestState | null;
  startSubjectTest: (subjectId: SubjectId) => void;
  startChapterTest: (chapterId: string) => void;
  startCustomTest: (config: CustomTestConfig) => void;
  startRemedialTest: (attemptId: string) => void;
  setTestAnswer: (questionId: string, answer: Partial<UserAnswer>) => void;
  toggleQuestionFlag: (questionId: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  jumpToQuestion: (index: number) => void;
  submitActiveTest: () => void;
  quitActiveTest: () => void;

  // Scorecard modal
  activeScorecard: TestAttempt | null;
  closeScorecard: () => void;
  openScorecardForAttempt: (attempt: TestAttempt) => void;

  // Payment
  isPaymentModalOpen: boolean;
  selectedPlan: { title: string; price: number; tag: string; perks: string[] } | null;
  openPaymentModal: (plan?: { title: string; price: number; tag: string; perks: string[] }) => void;
  closePaymentModal: () => void;
  recordPaymentSuccess: (utr: string, amount: number, planName: string) => void;
  transactions: PaymentTransaction[];

  // Active Grade & Board System
  activeGrade: GradeLevel;
  setActiveGrade: (grade: GradeLevel) => void;
  activeBoard: EducationBoard;
  setActiveBoard: (board: EducationBoard) => void;
  filteredSubjects: Subject[];
  filteredChapters: Chapter[];

  // Faculty Assigned Tests & Student Evaluations
  facultyTests: FacultyTestPaper[];
  createFacultyTest: (test: FacultyTestPaper) => void;
  deleteFacultyTest: (id: string) => void;
  studentSubmissions: StudentTestSubmission[];
  submitStudentTest: (submission: StudentTestSubmission) => void;
  evaluateSubmission: (submissionId: string, manualScore: number, feedback: string) => void;
  activeFacultyTest: FacultyTestPaper | null;
  setActiveFacultyTest: (test: FacultyTestPaper | null) => void;

  // Faculty Management & Moderation Desk
  facultyMembers: FacultyMember[];
  activeFacultyId: string;
  setActiveFacultyId: (id: string) => void;
  activeFacultyMember: FacultyMember | undefined;
  addFacultyMember: (faculty: FacultyMember) => void;
  updateFacultyMember: (id: string, updates: Partial<FacultyMember>) => void;
  deleteFacultyMember: (id: string) => void;
  submitFacultyTest: (test: FacultyTestPaper) => void;
  submitFacultyResource: (chapterId: string, resource: ChapterResource) => void;
  approveTestPaper: (testId: string) => void;
  rejectTestPaper: (testId: string, reason: string) => void;
  approveResource: (chapterId: string, resourceIdOrTitle: string) => void;
  rejectResource: (chapterId: string, resourceIdOrTitle: string, reason: string) => void;
  pendingApprovalsCount: number;

  // Utilities
  resetAppDemoData: () => void;
  goToChapterDetail: (chapterId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>(() => storage.getRole());
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<ChapterResource | null>(null);
  const [activeLabType, setActiveLabType] = useState<LabType | null>(null);

  // Dynamic reactive chapters
  const [chapters, setChapters] = useState<Chapter[]>(() => storage.getChapters());

  const [user, setUser] = useState<UserProfile>(() => storage.getUser());
  const [testAttempts, setTestAttempts] = useState<TestAttempt[]>(() => storage.getAttempts());
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => storage.getBookmarks());
  const [doubts, setDoubts] = useState<DoubtNote[]>(() => storage.getDoubts());
  const [customPresets, setCustomPresets] = useState<CustomTestConfig[]>(() => storage.getCustomPresets());
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => storage.getTransactions());
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [registeredStudents, setRegisteredStudents] = useState<UserProfile[]>(() => storage.getRegisteredStudents());
  const [adminPin, setAdminPinState] = useState<string>(() => storage.getAdminPin());
  const [facultyPin, setFacultyPinState] = useState<string>(() => storage.getFacultyPin());

  const updateAdminPin = (newPin: string): boolean => {
    if (!newPin || newPin.trim().length < 4) return false;
    const clean = newPin.trim();
    storage.saveAdminPin(clean);
    setAdminPinState(clean);
    return true;
  };

  const updateFacultyPin = (newPin: string): boolean => {
    if (!newPin || newPin.trim().length < 4) return false;
    const clean = newPin.trim();
    storage.saveFacultyPin(clean);
    setFacultyPinState(clean);
    return true;
  };

  // Multi-Grade, Board and Faculty Tests State
  const [activeGrade, setActiveGradeState] = useState<GradeLevel>(() => storage.getActiveGrade());
  const [activeBoard, setActiveBoardState] = useState<EducationBoard>(() => storage.getActiveBoard());
  const [facultyTests, setFacultyTests] = useState<FacultyTestPaper[]>(() => storage.getFacultyTests());
  const [studentSubmissions, setStudentSubmissions] = useState<StudentTestSubmission[]>(() => storage.getStudentSubmissions());
  const [activeFacultyTest, setActiveFacultyTest] = useState<FacultyTestPaper | null>(null);

  const setActiveBoard = (board: EducationBoard) => {
    setActiveBoardState(board);
    storage.saveActiveBoard(board);
    setUser(prev => ({ ...prev, board }));
  };

  // Faculty Directory & Moderation State
  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>(() => storage.getFacultyMembers());
  const [activeFacultyId, setActiveFacultyIdState] = useState<string>(() => storage.getActiveFacultyId());

  const setActiveFacultyId = (id: string) => {
    setActiveFacultyIdState(id);
    storage.saveActiveFacultyId(id);
  };

  const activeFacultyMember = useMemo(() => {
    return facultyMembers.find(f => f.id === activeFacultyId) || facultyMembers[0];
  }, [facultyMembers, activeFacultyId]);

  const addFacultyMember = (faculty: FacultyMember) => {
    const updated = storage.saveFacultyMember(faculty);
    setFacultyMembers(updated);
  };

  const updateFacultyMember = (id: string, updates: Partial<FacultyMember>) => {
    const updated = storage.updateFacultyMember(id, updates);
    setFacultyMembers(updated);
  };

  const deleteFacultyMember = (id: string) => {
    const updated = storage.deleteFacultyMember(id);
    setFacultyMembers(updated);
  };

  const [activeTest, setActiveTest] = useState<ActiveTestState | null>(null);
  const [activeScorecard, setActiveScorecard] = useState<TestAttempt | null>(null);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ title: string; price: number; tag: string; perks: string[] } | null>(null);

  // Sync state to storage
  useEffect(() => {
    storage.saveUser(user);
  }, [user]);

  useEffect(() => {
    storage.saveRole(currentRole);
  }, [currentRole]);

  const setActiveGrade = (grade: GradeLevel) => {
    setActiveGradeState(grade);
    storage.saveActiveGrade(grade);
    if (grade === '11' || grade === '12') {
      setActiveBoardState('CBSE');
      storage.saveActiveBoard('CBSE');
    }
    const gradeName = (grade === '11' || grade === '12') ? `Class ${grade} (Commerce)` : `Grade ${grade}`;
    setUser(prev => ({ ...prev, grade: gradeName }));
  };

  const createFacultyTest = (test: FacultyTestPaper) => {
    const updated = storage.saveFacultyTest(test);
    setFacultyTests(updated);
  };

  const deleteFacultyTest = (id: string) => {
    const updated = storage.deleteFacultyTest(id);
    setFacultyTests(updated);
  };

  // Faculty upload test paper (marked pending approval)
  const submitFacultyTest = (test: FacultyTestPaper) => {
    const withApproval: FacultyTestPaper = {
      ...test,
      approvalStatus: 'pending_approval',
      facultyId: test.facultyId || activeFacultyId,
      facultyName: test.facultyName || activeFacultyMember?.name || 'Faculty Member'
    };
    const updated = storage.saveFacultyTest(withApproval);
    setFacultyTests(updated);
  };

  // Faculty upload video / PPT resource (marked pending approval)
  const submitFacultyResource = (chapterId: string, resource: ChapterResource) => {
    const withApproval: ChapterResource = {
      ...resource,
      id: resource.id || `res-fac-${Date.now()}`,
      approvalStatus: 'pending_approval',
      facultyId: resource.facultyId || activeFacultyId,
      facultyName: resource.facultyName || activeFacultyMember?.name || 'Faculty Member',
      chapterId,
      uploadedBy: `${activeFacultyMember?.name || 'Faculty'} (Faculty)`,
      uploadedAt: new Date().toISOString()
    };
    const updated = storage.addChapterResource(chapterId, withApproval);
    setChapters(updated);
  };

  // Admin approves / rejects test papers
  const approveTestPaper = (testId: string) => {
    const updated = storage.updateFacultyTestStatus(testId, 'approved');
    setFacultyTests(updated);
  };

  const rejectTestPaper = (testId: string, reason: string) => {
    const updated = storage.updateFacultyTestStatus(testId, 'rejected', reason);
    setFacultyTests(updated);
  };

  // Admin approves / rejects chapter resources (videos / PPTs)
  const approveResource = (chapterId: string, resourceIdOrTitle: string) => {
    const updated = storage.updateChapterResourceStatus(chapterId, resourceIdOrTitle, 'approved');
    setChapters(updated);
  };

  const rejectResource = (chapterId: string, resourceIdOrTitle: string, reason: string) => {
    const updated = storage.updateChapterResourceStatus(chapterId, resourceIdOrTitle, 'rejected', reason);
    setChapters(updated);
  };

  // Count pending items awaiting Director Uma Shukla's review
  const pendingApprovalsCount = useMemo(() => {
    const pendingTests = facultyTests.filter(t => t.approvalStatus === 'pending_approval').length;
    let pendingRes = 0;
    chapters.forEach(ch => {
      ch.resources.forEach(r => {
        if (r.approvalStatus === 'pending_approval') pendingRes++;
      });
    });
    return pendingTests + pendingRes;
  }, [facultyTests, chapters]);

  const submitStudentTest = (submission: StudentTestSubmission) => {
    const updated = storage.saveStudentSubmission(submission);
    setStudentSubmissions(updated);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const evaluateSubmission = (submissionId: string, manualScore: number, feedback: string) => {
    const updated = storage.evaluateStudentSubmission(submissionId, manualScore, feedback);
    setStudentSubmissions(updated);
  };

  const filteredSubjects = useMemo(() => {
    return ICSE_SUBJECTS.filter(s => {
      const matchesGrade = !s.grades || s.grades.includes(activeGrade);
      const matchesBoard = !s.boards || s.boards.includes(activeBoard);
      return matchesGrade && matchesBoard;
    });
  }, [activeGrade, activeBoard]);

  const filteredChapters = useMemo(() => {
    const matched = chapters.filter(c => {
      const matchesGrade = !c.gradeLevel || c.gradeLevel === activeGrade || (activeGrade === '7' && !c.gradeLevel);
      const matchesBoard = !c.board || c.board === activeBoard || (activeBoard === 'ICSE' && !c.board);
      return matchesGrade && matchesBoard;
    });
    // If student mode, hide pending or rejected resources
    if (currentRole === 'student') {
      return matched.map(ch => ({
        ...ch,
        resources: ch.resources.filter(r => !r.approvalStatus || r.approvalStatus === 'approved')
      }));
    }
    return matched;
  }, [chapters, activeGrade, activeBoard, currentRole]);

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    storage.saveRole(role);
    if (role === 'admin') {
      setView('admin');
    } else if (role === 'faculty') {
      setView('faculty');
    } else {
      setView('dashboard');
    }
  };

  const toggleRole = () => {
    if (currentRole === 'student') {
      setIsStaffModalOpen(true);
    } else {
      returnToStudentPortal();
    }
  };

  const loginStudent = (studentData: Partial<UserProfile>) => {
    const updatedUser: UserProfile = {
      ...user,
      ...studentData,
      id: studentData.id || `stu-${studentData.mobileNumber?.slice(-4) || Date.now()}`,
      isLoggedIn: true,
      joinedAt: user.joinedAt || new Date().toISOString()
    };
    storage.loginStudent(updatedUser);
    setRegisteredStudents(storage.getRegisteredStudents());
    setUser(updatedUser);
    setCurrentRole('student');
    storage.saveRole('student');
    setView('dashboard');
  };

  const logoutStudent = () => {
    storage.logoutStudent();
    setUser(prev => ({ ...prev, isLoggedIn: false }));
    setCurrentRole('student');
    storage.saveRole('student');
    setView('dashboard');
  };

  const verifyStaffPinAndSwitch = (role: UserRole, pin: string): boolean => {
    const inputPin = pin.trim();
    const currentAdminPin = storage.getAdminPin();
    const currentFacultyPin = storage.getFacultyPin();

    if (role === 'admin' && inputPin === currentAdminPin) {
      setCurrentRole('admin');
      storage.saveRole('admin');
      setView('admin');
      setIsStaffModalOpen(false);
      return true;
    }
    if (role === 'faculty' && inputPin === currentFacultyPin) {
      setCurrentRole('faculty');
      storage.saveRole('faculty');
      setView('faculty');
      setIsStaffModalOpen(false);
      return true;
    }
    return false;
  };

  const returnToStudentPortal = () => {
    setCurrentRole('student');
    storage.saveRole('student');
    setView('dashboard');
  };

  // Add Chapter Resource (Videos / PPTs by Uma Shukla)
  const addChapterResource = (chapterId: string, resource: ChapterResource) => {
    const updated = storage.addChapterResource(chapterId, resource);
    setChapters(updated);
  };

  const deleteChapterResource = (chapterId: string, resourceTitle: string) => {
    const updated = storage.deleteChapterResource(chapterId, resourceTitle);
    setChapters(updated);
  };

  // Active test countdown timer
  useEffect(() => {
    if (!activeTest || activeTest.isCompleted) return;
    const interval = setInterval(() => {
      setActiveTest(prev => {
        if (!prev) return null;
        if (prev.remainingSeconds <= 1) {
          clearInterval(interval);
          submitActiveTest();
          return { ...prev, remainingSeconds: 0 };
        }
        return { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTest?.isCompleted, activeTest?.remainingSeconds]);

  const updateUser = (fields: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...fields }));
  };

  const deleteTestAttempt = (id: string) => {
    const updated = storage.deleteAttempt(id);
    setTestAttempts(updated);
  };

  const toggleBookmark = (questionId: string, notes = '') => {
    const exists = bookmarks.some(b => b.questionId === questionId);
    if (exists) {
      const updated = storage.removeBookmark(questionId);
      setBookmarks(updated);
    } else {
      const newBmk: Bookmark = {
        id: `bmk-${Date.now()}`,
        questionId,
        savedAt: new Date().toISOString(),
        studentNotes: notes,
        tags: ['ICSE Grade 7', 'Important Question']
      };
      const updated = storage.saveBookmark(newBmk);
      setBookmarks(updated);
    }
  };

  const updateBookmarkNotes = (questionId: string, notes: string) => {
    const bmk = bookmarks.find(b => b.questionId === questionId);
    if (bmk) {
      const updated = storage.saveBookmark({ ...bmk, studentNotes: notes });
      setBookmarks(updated);
    }
  };

  const addDoubtNote = (
    chapterId: string,
    topic: string,
    note: string,
    options?: {
      recipientRole?: 'faculty' | 'admin';
      recipientId?: string;
      recipientName?: string;
      subjectId?: SubjectId;
      subjectName?: string;
      attachmentUrl?: string;
      attachmentName?: string;
    }
  ) => {
    const ch = chapters.find(c => c.id === chapterId);
    const newDoubt: DoubtNote = {
      id: `doubt-${Date.now()}`,
      studentId: user.id || `stu-${user.mobileNumber?.slice(-4) || 'guest'}`,
      studentName: user.name || 'Student',
      studentMobile: user.mobileNumber || '',
      recipientRole: options?.recipientRole || 'admin',
      recipientId: options?.recipientId,
      recipientName: options?.recipientName || (options?.recipientRole === 'faculty' ? 'Faculty Mentor' : 'Uma Shukla (Director)'),
      subjectId: options?.subjectId || ch?.subjectId,
      subjectName: options?.subjectName,
      chapterId: chapterId || 'general',
      chapterTitle: ch ? ch.title : 'General Academic / Guidance Query',
      questionOrTopic: topic,
      noteText: note,
      attachmentUrl: options?.attachmentUrl,
      attachmentName: options?.attachmentName,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    const updated = storage.saveDoubt(newDoubt);
    setDoubts(updated);
  };

  const replyToDoubtNote = (doubtId: string, replyText: string, repliedBy?: string) => {
    const updated = storage.replyDoubt(
      doubtId,
      replyText,
      repliedBy || (currentRole === 'admin' ? 'Uma Shukla (Director)' : 'Faculty Mentor')
    );
    setDoubts(updated);
  };

  const toggleDoubtStatus = (id: string) => {
    const item = doubts.find(d => d.id === id);
    if (item) {
      const updated = storage.updateDoubt({
        ...item,
        status: item.status === 'pending' ? 'resolved' : 'pending'
      });
      setDoubts(updated);
    }
  };

  const deleteDoubtNote = (id: string) => {
    const updated = storage.deleteDoubt(id);
    setDoubts(updated);
  };

  const saveCustomPreset = (preset: CustomTestConfig) => {
    const updated = storage.saveCustomPreset({
      ...preset,
      id: preset.id || `preset-${Date.now()}`
    });
    setCustomPresets(updated);
  };

  const deleteCustomPreset = (id: string) => {
    const updated = storage.deleteCustomPreset(id);
    setCustomPresets(updated);
  };

  // Helper to construct questions for tests
  const initTestSession = (
    title: string,
    testType: 'subject-wise' | 'lesson-wise' | 'custom' | 'remedial',
    questions: Question[],
    durationMinutes: number,
    subjectId?: SubjectId,
    chapterIds: string[] = []
  ) => {
    if (questions.length === 0) {
      alert('No questions found matching your filter criteria. Please broaden your selection.');
      return;
    }

    const answersInit: Record<string, UserAnswer> = {};
    questions.forEach(q => {
      answersInit[q.id] = {
        questionId: q.id,
        timeSpentSeconds: 0
      };
    });

    setActiveTest({
      title,
      testType,
      subjectId,
      chapterIds,
      durationMinutes,
      questions,
      currentQuestionIndex: 0,
      answers: answersInit,
      flaggedQuestionIds: {},
      remainingSeconds: durationMinutes * 60,
      isCompleted: false
    });
    setView('test-series');
  };

  const startSubjectTest = (subId: SubjectId) => {
    const sub = ICSE_SUBJECTS.find(s => s.id === subId);
    const questions = ICSE_QUESTION_BANK.filter(q => q.subjectId === subId);
    const subChapters = chapters.filter(c => c.subjectId === subId).map(c => c.id);
    initTestSession(
      `${sub?.name || 'Subject'} Full ICSE Mock Examination`,
      'subject-wise',
      questions,
      30,
      subId,
      subChapters
    );
  };

  const startChapterTest = (chapterId: string) => {
    const ch = chapters.find(c => c.id === chapterId);
    const sub = ICSE_SUBJECTS.find(s => s.id === ch?.subjectId);
    const questions = ICSE_QUESTION_BANK.filter(q => q.chapterId === chapterId);
    initTestSession(
      `${ch?.title || 'Chapter'} Lesson Diagnostic Test`,
      'lesson-wise',
      questions,
      15,
      ch?.subjectId,
      [chapterId]
    );
  };

  const startCustomTest = (config: CustomTestConfig) => {
    let pool = ICSE_QUESTION_BANK.filter(q => {
      const matchSub = config.selectedSubjects.length === 0 || config.selectedSubjects.includes(q.subjectId);
      const matchChap = config.selectedChapterIds.length === 0 || config.selectedChapterIds.includes(q.chapterId);
      const matchType = config.questionTypes.length === 0 || config.questionTypes.includes(q.type);
      return matchSub && matchChap && matchType;
    });

    if (config.difficultyRatio === 'mostly_average') {
      pool = [...pool.filter(q => q.difficulty === 'Average'), ...pool.filter(q => q.difficulty === 'Tough')];
    } else if (config.difficultyRatio === 'mostly_tough') {
      pool = [...pool.filter(q => q.difficulty === 'Tough'), ...pool.filter(q => q.difficulty === 'Average')];
    }

    const selected = pool.slice(0, config.questionCount);
    initTestSession(
      config.title || 'Custom Multi-Chapter Assessment',
      'custom',
      selected,
      config.durationMinutes || 25,
      config.selectedSubjects[0],
      config.selectedChapterIds
    );
  };

  const startRemedialTest = (attemptId: string) => {
    const attempt = testAttempts.find(a => a.id === attemptId);
    if (!attempt || !attempt.weakAreas || attempt.weakAreas.length === 0) {
      alert('No specific weak areas flagged for this attempt.');
      return;
    }

    const missedIds = attempt.remedialQuestionIds || [];
    let questions = ICSE_QUESTION_BANK.filter(q => missedIds.includes(q.id));

    if (questions.length === 0) {
      const weakChapterIds = attempt.weakAreas.map(w => w.chapterId);
      questions = ICSE_QUESTION_BANK.filter(q => weakChapterIds.includes(q.chapterId));
    }

    initTestSession(
      `Remedial Booster: Focus on Weak Concepts (${attempt.testTitle})`,
      'remedial',
      questions,
      15,
      attempt.subjectId,
      attempt.chapterIds
    );
    closeScorecard();
  };

  const setTestAnswer = (questionId: string, answer: Partial<UserAnswer>) => {
    setActiveTest(prev => {
      if (!prev) return null;
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: {
            ...prev.answers[questionId],
            ...answer
          }
        }
      };
    });
  };

  const toggleQuestionFlag = (questionId: string) => {
    setActiveTest(prev => {
      if (!prev) return null;
      return {
        ...prev,
        flaggedQuestionIds: {
          ...prev.flaggedQuestionIds,
          [questionId]: !prev.flaggedQuestionIds[questionId]
        }
      };
    });
  };

  const nextQuestion = () => {
    setActiveTest(prev => {
      if (!prev) return null;
      return {
        ...prev,
        currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, prev.questions.length - 1)
      };
    });
  };

  const prevQuestion = () => {
    setActiveTest(prev => {
      if (!prev) return null;
      return {
        ...prev,
        currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0)
      };
    });
  };

  const jumpToQuestion = (index: number) => {
    setActiveTest(prev => {
      if (!prev) return null;
      return {
        ...prev,
        currentQuestionIndex: Math.max(0, Math.min(index, prev.questions.length - 1))
      };
    });
  };

  const submitActiveTest = () => {
    if (!activeTest) return;

    let totalMarks = 0;
    let scoredMarks = 0;
    let correctCount = 0;
    const evaluatedAnswers: Record<string, UserAnswer> = {};
    const missedQuestions: Question[] = [];

    activeTest.questions.forEach(q => {
      totalMarks += q.marks;
      const userAns = activeTest.answers[q.id] || { questionId: q.id, timeSpentSeconds: 0 };
      let isCorrect = false;
      let marksAwarded = 0;

      if (q.type === 'mcq') {
        if (userAns.userMcqIndex !== undefined && userAns.userMcqIndex === q.correctOptionIndex) {
          isCorrect = true;
          marksAwarded = q.marks;
        }
      } else if (q.type === 'true_false') {
        if (userAns.userBoolean !== undefined && userAns.userBoolean === q.correctBoolean) {
          isCorrect = true;
          marksAwarded = q.marks;
        }
      } else if (q.type === 'fill_blank') {
        if (userAns.userText && q.correctBlanks) {
          const cleanUser = userAns.userText.toLowerCase().replace(/[^a-z0-9]/g, '');
          const match = q.correctBlanks.some(b => cleanUser.includes(b.toLowerCase().replace(/[^a-z0-9]/g, '')));
          if (match) {
            isCorrect = true;
            marksAwarded = q.marks;
          }
        }
      } else {
        if (userAns.userText && userAns.userText.trim().length > 15) {
          isCorrect = true;
          marksAwarded = Math.round(q.marks * 0.85 * 10) / 10;
        }
      }

      if (isCorrect) correctCount++;
      else missedQuestions.push(q);

      scoredMarks += marksAwarded;
      evaluatedAnswers[q.id] = {
        ...userAns,
        isCorrect,
        marksAwarded
      };
    });

    const percentage = totalMarks > 0 ? Math.round((scoredMarks / totalMarks) * 1000) / 10 : 0;
    const accuracy = activeTest.questions.length > 0 ? Math.round((correctCount / activeTest.questions.length) * 100) : 0;

    let grade = 'Needs Improvement';
    if (percentage >= 90) grade = 'Distinction Outstanding (A*)';
    else if (percentage >= 80) grade = 'First Class with Distinction (A)';
    else if (percentage >= 65) grade = 'First Class (B+)';
    else if (percentage >= 50) grade = 'Second Class (C)';
    else if (percentage >= 35) grade = 'Pass Class (D)';

    // Topic diagnostic analysis
    const weakAreasMap: Record<string, TopicWeakness> = {};
    missedQuestions.forEach(q => {
      const key = `${q.chapterId}_${q.topic}`;
      if (!weakAreasMap[key]) {
        weakAreasMap[key] = {
          subjectId: q.subjectId,
          chapterId: q.chapterId,
          chapterTitle: q.chapterTitle,
          topic: q.topic,
          wrongCount: 0,
          totalCount: 0,
          missedConcepts: [q.mantraHint],
          recommendedAction: `Revise ${q.chapterTitle} notes and solve 5 extra questions on ${q.topic}.`,
          difficultySuggested: q.difficulty
        };
      }
      weakAreasMap[key].wrongCount++;
      weakAreasMap[key].totalCount++;
    });

    const weakAreas = Object.values(weakAreasMap);
    const remedialQuestionIds = missedQuestions.map(q => q.id);

    const newAttempt: TestAttempt = {
      id: `attempt-${Date.now()}`,
      testTitle: activeTest.title,
      testType: activeTest.testType,
      subjectId: activeTest.subjectId,
      subjectName: activeTest.subjectId ? ICSE_SUBJECTS.find(s => s.id === activeTest.subjectId)?.name : 'Multi-Subject',
      chapterIds: activeTest.chapterIds,
      startedAt: new Date(Date.now() - (activeTest.durationMinutes * 60 - activeTest.remainingSeconds) * 1000).toISOString(),
      completedAt: new Date().toISOString(),
      durationMinutes: activeTest.durationMinutes,
      totalTimeSpentSeconds: activeTest.durationMinutes * 60 - activeTest.remainingSeconds,
      totalMarks,
      scoredMarks,
      percentage,
      grade,
      passed: percentage >= 40,
      accuracy,
      answers: evaluatedAnswers,
      questionIds: activeTest.questions.map(q => q.id),
      weakAreas,
      remedialQuestionIds
    };

    const updatedAttempts = storage.saveAttempt(newAttempt);
    setTestAttempts(updatedAttempts);

    // Update user stats
    const totalTaken = user.totalTestsTaken + 1;
    const avgScore = Math.round(((user.averageScorePercentage * user.totalTestsTaken + percentage) / totalTaken) * 10) / 10;
    updateUser({
      totalTestsTaken: totalTaken,
      averageScorePercentage: avgScore,
      coins: user.coins + (percentage >= 70 ? 25 : 10)
    });

    if (percentage >= 75) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    setActiveTest(null);
    setActiveScorecard(newAttempt);
  };

  const quitActiveTest = () => {
    if (confirm('Are you sure you want to exit? Your ongoing test progress will not be saved.')) {
      setActiveTest(null);
    }
  };

  const closeScorecard = () => {
    setActiveScorecard(null);
  };

  const openScorecardForAttempt = (attempt: TestAttempt) => {
    setActiveScorecard(attempt);
  };

  const openPaymentModal = (plan?: { title: string; price: number; tag: string; perks: string[] }) => {
    setSelectedPlan(plan || {
      title: 'Full ICSE Grade 7 Master Test Series Pass',
      price: 499,
      tag: 'Most Popular',
      perks: [
        'All 7 Subjects & 33 Chapters unlocked',
        'Unlimited Custom Mock Test Builder generation',
        'Detailed Video Lectures & PPT Slides by Uma Shukla',
        'Diagnostic Weakness Radar & 1-Click Remedial Practice',
        'Direct Doubt Resolution with Uma Shukla'
      ]
    });
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const recordPaymentSuccess = (utr: string, amount: number, planName: string) => {
    const receiptNumber = `MC-REC-${Math.floor(100000 + Math.random() * 900000)}`;
    const tx: PaymentTransaction = {
      id: `tx-${Date.now()}`,
      planName,
      amount,
      upiId: '8707794159@ptyes',
      utrNumber: utr,
      paymentMethod: 'UPI_QR',
      timestamp: new Date().toISOString(),
      status: 'SUCCESS',
      receiptNumber
    };

    const updatedTx = storage.saveTransaction(tx);
    setTransactions(updatedTx);

    updateUser({
      isProMember: true,
      proExpiryDate: '2027-03-31'
    });

    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 }
    });
  };

  const resetAppDemoData = () => {
    storage.resetAll();
    window.location.reload();
  };

  const goToChapterDetail = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    setView('chapter-detail');
  };

  return (
    <AppContext.Provider
      value={{
        view,
        setView,
        currentRole,
        setCurrentRole,
        toggleRole,
        isStaffModalOpen,
        setIsStaffModalOpen,
        loginStudent,
        logoutStudent,
        verifyStaffPinAndSwitch,
        returnToStudentPortal,
        adminPin,
        updateAdminPin,
        facultyPin,
        updateFacultyPin,
        registeredStudents,
        selectedSubjectId,
        setSelectedSubjectId,
        selectedChapterId,
        setSelectedChapterId,
        activeVideo,
        setActiveVideo,
        activeLabType,
        setActiveLabType,
        chapters,
        addChapterResource,
        deleteChapterResource,
        user,
        updateUser,
        testAttempts,
        deleteTestAttempt,
        bookmarks,
        toggleBookmark,
        updateBookmarkNotes,
        doubts,
        addDoubtNote,
        toggleDoubtStatus,
        deleteDoubtNote,
        replyToDoubtNote,
        customPresets,
        saveCustomPreset,
        deleteCustomPreset,
        activeTest,
        startSubjectTest,
        startChapterTest,
        startCustomTest,
        startRemedialTest,
        setTestAnswer,
        toggleQuestionFlag,
        nextQuestion,
        prevQuestion,
        jumpToQuestion,
        submitActiveTest,
        quitActiveTest,
        activeScorecard,
        closeScorecard,
        openScorecardForAttempt,
        isPaymentModalOpen,
        selectedPlan,
        openPaymentModal,
        closePaymentModal,
        recordPaymentSuccess,
        transactions,
        activeGrade,
        setActiveGrade,
        activeBoard,
        setActiveBoard,
        filteredSubjects,
        filteredChapters,
        facultyTests,
        createFacultyTest,
        deleteFacultyTest,
        studentSubmissions,
        submitStudentTest,
        evaluateSubmission,
        activeFacultyTest,
        setActiveFacultyTest,
        facultyMembers,
        activeFacultyId,
        setActiveFacultyId,
        activeFacultyMember,
        addFacultyMember,
        updateFacultyMember,
        deleteFacultyMember,
        submitFacultyTest,
        submitFacultyResource,
        approveTestPaper,
        rejectTestPaper,
        approveResource,
        rejectResource,
        pendingApprovalsCount,
        resetAppDemoData,
        goToChapterDetail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

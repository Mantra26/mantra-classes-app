import {
  UserProfile,
  TestAttempt,
  Bookmark,
  DoubtNote,
  CustomTestConfig,
  PaymentTransaction,
  Chapter,
  UserRole,
  ChapterResource,
  GradeLevel,
  FacultyTestPaper,
  StudentTestSubmission,
  FacultyMember,
  ApprovalStatus,
  EducationBoard,
  AchievementBadge,
  LeaderboardUser
} from '../types';
import { DEFAULT_USER, INITIAL_TEST_ATTEMPTS, INITIAL_BOOKMARKS, INITIAL_DOUBTS, INITIAL_REGISTERED_STUDENTS, INITIAL_TRANSACTIONS } from '../data/defaultUser';
import { ICSE_CHAPTERS } from '../data/icseCurriculum';
import { ICSE_QUESTION_BANK } from '../data/questionBank';
import { ALL_ACHIEVEMENT_BADGES, SEED_LEADERBOARD } from '../data/gamificationData';

const STORAGE_KEYS = {
  USER: 'mantra_user_profile',
  ROLE: 'mantra_user_role',
  REGISTERED_STUDENTS: 'mantra_registered_students',
  MASTERED_FLASHCARDS: 'mantra_mastered_flashcards',
  LEADERBOARD: 'mantra_leaderboard_data',
  ADMIN_PIN: 'mantra_admin_pin',
  FACULTY_PIN: 'mantra_faculty_pin',
  ACTIVE_GRADE: 'mantra_active_grade',
  ACTIVE_BOARD: 'mantra_active_board',
  ATTEMPTS: 'mantra_test_attempts',
  BOOKMARKS: 'mantra_bookmarks',
  DOUBTS: 'mantra_doubts',
  CUSTOM_PRESETS: 'mantra_custom_presets',
  TRANSACTIONS: 'mantra_transactions',
  CHAPTERS: 'mantra_chapters_data',
  FACULTY_TESTS: 'mantra_faculty_tests',
  STUDENT_SUBMISSIONS: 'mantra_student_submissions',
  FACULTY_MEMBERS: 'mantra_faculty_members',
  ACTIVE_FACULTY_ID: 'mantra_active_faculty_id',
  DEVICE_DEMO_TRACK: 'mantra_device_demo_track',
  DEMO_USED_MOBILES: 'mantra_demo_used_mobiles'
};

export const SEED_FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: 'fac-1',
    name: 'Prof. Rajesh Verma',
    designation: 'Senior Faculty - Computer Applications & Mathematics',
    email: 'rajesh.verma@mantraclasses.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    assignedSubjects: ['computers', 'mathematics'],
    assignedGrades: ['5', '6', '7'],
    status: 'active',
    joinedAt: '2025-06-15T09:00:00.000Z',
    addedBy: 'Uma Shukla (Director)',
    bio: '14+ years experience training ICSE rank-holders in Algorithms, Data representation, and Core Mathematics.'
  },
  {
    id: 'fac-2',
    name: 'Dr. Sunita Rao',
    designation: 'Senior Science Mentor (Physics & Chemistry)',
    email: 'sunita.rao@mantraclasses.com',
    phone: '+91 98711 22334',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    assignedSubjects: ['physics', 'chemistry'],
    assignedGrades: ['6', '7'],
    status: 'active',
    joinedAt: '2025-08-01T10:30:00.000Z',
    addedBy: 'Uma Shukla (Director)',
    bio: 'Ph.D. in Applied Physics; specializes in conceptual visual demonstrations and laboratory experiments.'
  },
  {
    id: 'fac-3',
    name: 'Ms. Ananya Sen',
    designation: 'Primary & Middle School Lead (English & Science)',
    email: 'ananya.sen@mantraclasses.com',
    phone: '+91 98220 54321',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    assignedSubjects: ['english', 'biology'],
    assignedGrades: ['2', '3', '4', '5'],
    status: 'active',
    joinedAt: '2025-10-10T11:00:00.000Z',
    addedBy: 'Uma Shukla (Director)',
    bio: 'Expert in activity-based learning, phonetics, grammar mastery, and environmental sciences.'
  },
  {
    id: 'fac-4',
    name: 'CA Ramanathan Iyer',
    designation: 'Senior Faculty - Accountancy & Financial Analysis',
    email: 'ramanathan.iyer@mantraclasses.com',
    phone: '+91 98401 22334',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    assignedSubjects: ['accountancy', 'economics'],
    assignedGrades: ['11', '12'],
    status: 'active',
    joinedAt: '2025-07-01T09:00:00.000Z',
    addedBy: 'Uma Shukla (Director)',
    bio: 'Fellow Chartered Accountant (FCA) with 16+ years coaching CBSE Class 11 & 12 rankers in Accountancy and Macroeconomics.'
  },
  {
    id: 'fac-5',
    name: 'Dr. Meenakshi Sundaram',
    designation: 'Senior Mentor - Business Studies & Economics',
    email: 'meenakshi.sundaram@mantraclasses.com',
    phone: '+91 98190 77665',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    assignedSubjects: ['business_studies', 'economics'],
    assignedGrades: ['11', '12'],
    status: 'active',
    joinedAt: '2025-07-15T10:00:00.000Z',
    addedBy: 'Uma Shukla (Director)',
    bio: 'Ph.D. in Management & Applied Economics; expert in CBSE Business Studies case-study analysis and National Income accounting.'
  }
];

const getSeedFacultyTests = (): FacultyTestPaper[] => {
  const qComp1 = ICSE_QUESTION_BANK.find(q => q.id === 'q-comp-1') || ICSE_QUESTION_BANK[0];
  const qComp2 = ICSE_QUESTION_BANK.find(q => q.id === 'q-comp-2') || ICSE_QUESTION_BANK[1];
  const qComp3 = ICSE_QUESTION_BANK.find(q => q.id === 'q-comp-3') || ICSE_QUESTION_BANK[2];
  const qComp4 = ICSE_QUESTION_BANK.find(q => q.id === 'q-comp-4') || ICSE_QUESTION_BANK[3];
  const qG5 = ICSE_QUESTION_BANK.find(q => q.id === 'q-comp-g5-1') || ICSE_QUESTION_BANK[0];
  const qG2 = ICSE_QUESTION_BANK.find(q => q.id === 'q-comp-g2-1') || ICSE_QUESTION_BANK[0];
  const qAcct12_1 = ICSE_QUESTION_BANK.find(q => q.id === 'q-acct-12-1') || ICSE_QUESTION_BANK[0];
  const qAcct12_2 = ICSE_QUESTION_BANK.find(q => q.id === 'q-acct-12-2') || ICSE_QUESTION_BANK[1];
  const qAcct12_4 = ICSE_QUESTION_BANK.find(q => q.id === 'q-acct-12-4') || ICSE_QUESTION_BANK[2];
  const qBst11_1 = ICSE_QUESTION_BANK.find(q => q.id === 'q-bst-11-1') || ICSE_QUESTION_BANK[0];
  const qBst11_2 = ICSE_QUESTION_BANK.find(q => q.id === 'q-bst-11-2') || ICSE_QUESTION_BANK[1];
  const qBst11_4 = ICSE_QUESTION_BANK.find(q => q.id === 'q-bst-11-4') || ICSE_QUESTION_BANK[2];

  return [
    {
      id: 'test-comp-g7-1',
      title: 'Weekly Benchmark: Binary Arithmetic & Computer Systems',
      instructions: 'Answer all 4 questions. Show all working steps for the binary conversion. Submit before Sunday 8:00 PM for Uma Ma\'am\'s review and scorecard release.',
      targetGrade: '7',
      subjectId: 'computers',
      subjectName: 'Computer Applications',
      chapterTitle: 'Hardware & Binary Arithmetic',
      durationMinutes: 25,
      totalMarks: 6,
      passingMarks: 4,
      dueDate: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      createdBy: 'Uma Shukla (Director)',
      approvalStatus: 'approved',
      questions: [qComp1, qComp2, qComp3, qComp4],
      status: 'active'
    },
    {
      id: 'test-comp-g5-1',
      title: 'Grade 5 Unit Assessment: Evolution of Computers',
      instructions: 'Identify historical computing devices, early computer pioneers, and categories of software.',
      targetGrade: '5',
      subjectId: 'computers',
      subjectName: 'Computer Applications',
      chapterTitle: 'Evolution of Computers & Software Types',
      durationMinutes: 20,
      totalMarks: 5,
      passingMarks: 3,
      dueDate: new Date(Date.now() + 4 * 24 * 3600 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      createdBy: 'Uma Shukla (Director)',
      approvalStatus: 'approved',
      questions: [qG5],
      status: 'active'
    },
    {
      id: 'test-comp-g2-1',
      title: 'Grade 2 Starter: Computer The Smart Machine',
      instructions: 'Fun interactive quiz! Click the correct answers to identify computer parts and everyday uses.',
      targetGrade: '2',
      subjectId: 'computers',
      subjectName: 'Computer Applications',
      chapterTitle: 'Computer: A Wonderful Smart Machine',
      durationMinutes: 15,
      totalMarks: 5,
      passingMarks: 3,
      dueDate: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      createdBy: 'Uma Shukla (Director)',
      approvalStatus: 'approved',
      questions: [qG2],
      status: 'active'
    },
    {
      id: 'test-pending-1',
      title: 'Computational Thinking & Flowcharts Master Challenge',
      instructions: 'Answer both questions on decision symbols and loop conditionals. Full working required.',
      targetGrade: '7',
      subjectId: 'computers',
      subjectName: 'Computer Applications',
      chapterTitle: 'Computational Thinking, Flowcharts & Algorithms',
      durationMinutes: 25,
      totalMarks: 6,
      passingMarks: 4,
      dueDate: new Date(Date.now() + 6 * 24 * 3600 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      createdBy: 'Prof. Rajesh Verma (Faculty)',
      facultyId: 'fac-1',
      facultyName: 'Prof. Rajesh Verma',
      approvalStatus: 'pending_approval',
      questions: [qComp4, qComp3],
      status: 'active'
    },
    {
      id: 'test-cbse-12-1',
      title: 'CBSE Class 12 Accountancy Board Mock: Partnership & Share Capital',
      instructions: 'Answer all 3 questions. Show detailed working notes for goodwill computation and interest on drawings.',
      targetGrade: '12',
      board: 'CBSE',
      subjectId: 'accountancy',
      subjectName: 'Accountancy',
      chapterTitle: 'Accounting for Partnership & Share Capital',
      durationMinutes: 40,
      totalMarks: 5,
      passingMarks: 3,
      dueDate: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      createdBy: 'CA Ramanathan Iyer (Faculty)',
      facultyId: 'fac-4',
      facultyName: 'CA Ramanathan Iyer',
      approvalStatus: 'approved',
      questions: [qAcct12_1, qAcct12_2, qAcct12_4],
      status: 'active'
    },
    {
      id: 'test-cbse-11-1',
      title: 'CBSE Class 11 Business Studies Sprint: Organisation Forms & Finance',
      instructions: 'Answer all questions. Give structured explanations with heading-point format.',
      targetGrade: '11',
      board: 'CBSE',
      subjectId: 'business_studies',
      subjectName: 'Business Studies',
      chapterTitle: 'Forms of Business Organisation',
      durationMinutes: 30,
      totalMarks: 5,
      passingMarks: 3,
      dueDate: new Date(Date.now() + 6 * 24 * 3600 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      createdBy: 'Dr. Meenakshi Sundaram (Faculty)',
      facultyId: 'fac-5',
      facultyName: 'Dr. Meenakshi Sundaram',
      approvalStatus: 'approved',
      questions: [qBst11_1, qBst11_2, qBst11_4],
      status: 'active'
    }
  ];
};

const getSeedSubmissions = (): StudentTestSubmission[] => {
  return [
    {
      id: 'sub-demo-1',
      testPaperId: 'test-comp-g7-1',
      testTitle: 'Weekly Benchmark: Binary Arithmetic & Computer Systems',
      studentId: 'user-icse-aarav-7',
      studentName: 'Aarav Sharma',
      studentGrade: '7',
      subjectId: 'computers',
      submittedAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
      durationSpentMinutes: 18,
      answers: {
        'q-comp-1': { questionId: 'q-comp-1', userMcqIndex: 1, isCorrect: true, marksAwarded: 1, timeSpentSeconds: 45 },
        'q-comp-2': { questionId: 'q-comp-2', userBoolean: false, isCorrect: true, marksAwarded: 1, timeSpentSeconds: 30 },
        'q-comp-3': { questionId: 'q-comp-3', userText: '10, 11', isCorrect: true, marksAwarded: 1, timeSpentSeconds: 60 },
        'q-comp-4': {
          questionId: 'q-comp-4',
          userText: 'Division steps by 2:\n45 / 2 = 22, Remainder = 1\n22 / 2 = 11, Remainder = 0\n11 / 2 = 5, Remainder = 1\n5 / 2 = 2, Remainder = 1\n2 / 2 = 1, Remainder = 0\n1 / 2 = 0, Remainder = 1\nReading upwards from MSB to LSB:\n(45)₁₀ = (101101)₂',
          isCorrect: true,
          marksAwarded: 3,
          timeSpentSeconds: 210
        }
      },
      status: 'evaluated',
      autoScore: 3,
      manualScore: 3,
      totalMarks: 6,
      percentage: 100,
      grade: 'A+ (Outstanding)',
      facultyFeedback: 'Outstanding work Aarav! Your division ladder for (45)₁₀ was completely spotless, and you clearly demonstrated why RAM is volatile. Keep maintaining this disciplined ICSE working format in board assessments!',
      evaluatedBy: 'Uma Shukla (Director)',
      evaluatedAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString()
    }
  ];
};

export const storage = {
  getRole(): UserRole {
    try {
      const r = localStorage.getItem(STORAGE_KEYS.ROLE);
      return (r === 'admin' || r === 'student') ? r : 'student';
    } catch {
      return 'student';
    }
  },

  saveRole(role: UserRole): void {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  },

  getUser(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.mobileNumber && parsed.name) {
          return { ...parsed, isLoggedIn: parsed.isLoggedIn ?? true };
        }
        return parsed;
      }
      return DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  },

  saveUser(user: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getRegisteredStudents(): UserProfile[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REGISTERED_STUDENTS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      // Seed with initial realistic students if storage is empty
      localStorage.setItem(STORAGE_KEYS.REGISTERED_STUDENTS, JSON.stringify(INITIAL_REGISTERED_STUDENTS));
      return INITIAL_REGISTERED_STUDENTS;
    } catch {
      return INITIAL_REGISTERED_STUDENTS;
    }
  },

  saveRegisteredStudent(student: UserProfile): UserProfile[] {
    const list = this.getRegisteredStudents();
    const existingIdx = list.findIndex(s => s.mobileNumber === student.mobileNumber || (s.id && s.id === student.id));
    let updated: UserProfile[];
    if (existingIdx >= 0) {
      updated = [...list];
      updated[existingIdx] = { ...updated[existingIdx], ...student };
    } else {
      updated = [student, ...list];
    }
    localStorage.setItem(STORAGE_KEYS.REGISTERED_STUDENTS, JSON.stringify(updated));
    return updated;
  },

  getDeviceDemoInfo(): { used: boolean; originalMobile?: string; originalName?: string; usedAt?: string } {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DEVICE_DEMO_TRACK);
      if (data) {
        return JSON.parse(data);
      }
      return { used: false };
    } catch {
      return { used: false };
    }
  },

  isDeviceDemoUsed(): boolean {
    return this.getDeviceDemoInfo().used;
  },

  getDemoUsedMobiles(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DEMO_USED_MOBILES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  isMobileDemoUsed(mobile: string): boolean {
    const clean = (mobile || '').replace(/\D/g, '');
    if (!clean) return false;
    const list = this.getDemoUsedMobiles();
    if (list.includes(clean)) return true;
    const registered = this.getRegisteredStudents();
    const stu = registered.find(s => s.mobileNumber === clean);
    return !!stu?.demoMockTestTaken;
  },

  recordDemoTestUsed(mobile?: string, name?: string): void {
    const clean = (mobile || '').replace(/\D/g, '');
    // 1. Mark device trial as used
    const currentDevice = this.getDeviceDemoInfo();
    if (!currentDevice.used) {
      const deviceRecord = {
        used: true,
        originalMobile: clean || 'unknown',
        originalName: name || 'Student',
        usedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.DEVICE_DEMO_TRACK, JSON.stringify(deviceRecord));
    }

    // 2. Mark mobile in demo used list
    if (clean) {
      const list = this.getDemoUsedMobiles();
      if (!list.includes(clean)) {
        list.push(clean);
        localStorage.setItem(STORAGE_KEYS.DEMO_USED_MOBILES, JSON.stringify(list));
      }

      // Also persist to registered student profile
      const registered = this.getRegisteredStudents();
      const idx = registered.findIndex(s => s.mobileNumber === clean);
      if (idx >= 0) {
        registered[idx].demoMockTestTaken = true;
        localStorage.setItem(STORAGE_KEYS.REGISTERED_STUDENTS, JSON.stringify(registered));
      }

      // Also update currently active user if matches
      const current = this.getUser();
      if (current && current.mobileNumber === clean) {
        this.saveUser({ ...current, demoMockTestTaken: true });
      }
    }
  },

  loginStudent(student: UserProfile): UserProfile {
    const registered = this.getRegisteredStudents();
    const cleanMobile = (student.mobileNumber || '').replace(/\D/g, '');
    const existing = registered.find(s => s.mobileNumber === cleanMobile || (s.id && s.id === student.id));
    const deviceDemoInfo = this.getDeviceDemoInfo();
    const isDeviceUsed = deviceDemoInfo.used;
    const isMobileUsed = this.isMobileDemoUsed(cleanMobile);

    // If student already took demo, or mobile is recorded as used, or device used: demo test is permanently locked
    const demoAlreadyTaken = !!(existing?.demoMockTestTaken || isMobileUsed || isDeviceUsed || student.demoMockTestTaken);

    const userToSave: UserProfile = {
      ...(existing || {}),
      ...student,
      id: existing?.id || student.id || `stu-${cleanMobile.slice(-4) || Date.now()}`,
      name: existing?.name || student.name,
      mobileNumber: cleanMobile,
      demoMockTestTaken: demoAlreadyTaken,
      isProMember: existing?.isProMember || student.isProMember || false,
      paymentStatus: existing?.paymentStatus === 'authorized' ? 'authorized' : (student.paymentStatus || existing?.paymentStatus || 'none'),
      totalTestsTaken: Math.max(existing?.totalTestsTaken || 0, student.totalTestsTaken || 0),
      isLoggedIn: true
    };

    this.saveUser(userToSave);
    this.saveRole('student');
    this.saveRegisteredStudent(userToSave);
    return userToSave;
  },

  logoutStudent(): void {
    const current = this.getUser();
    this.saveUser({ ...current, isLoggedIn: false });
    this.saveRole('student');
  },

  getAdminPin(): string {
    try {
      const pin = localStorage.getItem(STORAGE_KEYS.ADMIN_PIN);
      return pin && pin.trim().length >= 4 ? pin.trim() : '8707';
    } catch {
      return '8707';
    }
  },

  saveAdminPin(pin: string): void {
    if (pin && pin.trim().length >= 4) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, pin.trim());
    }
  },

  getFacultyPin(): string {
    try {
      const pin = localStorage.getItem(STORAGE_KEYS.FACULTY_PIN);
      return pin && pin.trim().length >= 4 ? pin.trim() : '1234';
    } catch {
      return '1234';
    }
  },

  saveFacultyPin(pin: string): void {
    if (pin && pin.trim().length >= 4) {
      localStorage.setItem(STORAGE_KEYS.FACULTY_PIN, pin.trim());
    }
  },

  getChapters(): Chapter[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHAPTERS);
      if (!data) {
        return ICSE_CHAPTERS;
      }
      const parsed: Chapter[] = JSON.parse(data);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return ICSE_CHAPTERS;
      }
      // Ensure any newly introduced curriculum chapters (like Sanskrit, SST, EVS) are merged
      const existingIds = new Set(parsed.map(c => c.id));
      const missingChapters = ICSE_CHAPTERS.filter(c => !existingIds.has(c.id));
      if (missingChapters.length > 0) {
        const merged = [...parsed, ...missingChapters];
        localStorage.setItem(STORAGE_KEYS.CHAPTERS, JSON.stringify(merged));
        return merged;
      }
      return parsed;
    } catch {
      return ICSE_CHAPTERS;
    }
  },

  saveChapters(chapters: Chapter[]): void {
    localStorage.setItem(STORAGE_KEYS.CHAPTERS, JSON.stringify(chapters));
  },

  updateChapter(chapterId: string, updates: Partial<Chapter>): Chapter[] {
    const list = this.getChapters();
    const updated = list.map(ch => (ch.id === chapterId ? { ...ch, ...updates } : ch));
    this.saveChapters(updated);
    return updated;
  },

  addChapter(newChapter: Chapter): Chapter[] {
    const list = this.getChapters();
    const updated = [...list, newChapter];
    this.saveChapters(updated);
    return updated;
  },

  deleteChapter(chapterId: string): Chapter[] {
    const list = this.getChapters();
    const updated = list.filter(ch => ch.id !== chapterId);
    this.saveChapters(updated);
    return updated;
  },

  addChapterResource(chapterId: string, resource: ChapterResource): Chapter[] {
    const list = this.getChapters();
    const updated = list.map(ch => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          resources: [resource, ...ch.resources]
        };
      }
      return ch;
    });
    this.saveChapters(updated);
    return updated;
  },

  deleteChapterResource(chapterId: string, resourceTitle: string): Chapter[] {
    const list = this.getChapters();
    const updated = list.map(ch => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          resources: ch.resources.filter(r => r.title !== resourceTitle)
        };
      }
      return ch;
    });
    this.saveChapters(updated);
    return updated;
  },

  getAttempts(): TestAttempt[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      return data ? JSON.parse(data) : INITIAL_TEST_ATTEMPTS;
    } catch {
      return INITIAL_TEST_ATTEMPTS;
    }
  },

  saveAttempt(attempt: TestAttempt): TestAttempt[] {
    const list = this.getAttempts();
    const updated = [attempt, ...list];
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(updated));
    return updated;
  },

  deleteAttempt(id: string): TestAttempt[] {
    const list = this.getAttempts();
    const updated = list.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(updated));
    return updated;
  },

  getBookmarks(): Bookmark[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : INITIAL_BOOKMARKS;
    } catch {
      return INITIAL_BOOKMARKS;
    }
  },

  saveBookmark(bookmark: Bookmark): Bookmark[] {
    const list = this.getBookmarks();
    const exists = list.some(b => b.questionId === bookmark.questionId);
    let updated: Bookmark[];
    if (exists) {
      updated = list.map(b => b.questionId === bookmark.questionId ? bookmark : b);
    } else {
      updated = [bookmark, ...list];
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
    return updated;
  },

  removeBookmark(questionId: string): Bookmark[] {
    const list = this.getBookmarks();
    const updated = list.filter(b => b.questionId !== questionId);
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
    return updated;
  },

  getDoubts(): DoubtNote[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DOUBTS);
      return data ? JSON.parse(data) : INITIAL_DOUBTS;
    } catch {
      return INITIAL_DOUBTS;
    }
  },

  saveDoubt(doubt: DoubtNote): DoubtNote[] {
    const list = this.getDoubts();
    const updated = [doubt, ...list];
    localStorage.setItem(STORAGE_KEYS.DOUBTS, JSON.stringify(updated));
    return updated;
  },

  updateDoubt(doubt: DoubtNote): DoubtNote[] {
    const list = this.getDoubts();
    const updated = list.map(d => d.id === doubt.id ? doubt : d);
    localStorage.setItem(STORAGE_KEYS.DOUBTS, JSON.stringify(updated));
    return updated;
  },

  deleteDoubt(id: string): DoubtNote[] {
    const list = this.getDoubts();
    const updated = list.filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.DOUBTS, JSON.stringify(updated));
    return updated;
  },

  replyDoubt(id: string, reply: string, repliedBy: string): DoubtNote[] {
    const list = this.getDoubts();
    const updated = list.map(d => {
      if (d.id === id) {
        return {
          ...d,
          mentorReply: reply,
          repliedAt: new Date().toISOString(),
          repliedBy,
          status: 'resolved' as const
        };
      }
      return d;
    });
    localStorage.setItem(STORAGE_KEYS.DOUBTS, JSON.stringify(updated));
    return updated;
  },

  getCustomPresets(): CustomTestConfig[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_PRESETS);
      return data ? JSON.parse(data) : [
        {
          id: 'preset-math-sci-combo',
          title: 'Math & Physics Science Olympiad Drill',
          selectedSubjects: ['mathematics', 'physics'],
          selectedChapterIds: ['math-ch1', 'math-ch2', 'phy-ch1', 'phy-ch3'],
          questionCount: 10,
          difficultyRatio: 'mostly_tough',
          questionTypes: ['mcq', 'short_answer', 'fill_blank'],
          durationMinutes: 30
        }
      ];
    } catch {
      return [];
    }
  },

  saveCustomPreset(preset: CustomTestConfig): CustomTestConfig[] {
    const list = this.getCustomPresets();
    const updated = [preset, ...list.filter(p => p.id !== preset.id)];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_PRESETS, JSON.stringify(updated));
    return updated;
  },

  deleteCustomPreset(id: string): CustomTestConfig[] {
    const list = this.getCustomPresets();
    const updated = list.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_PRESETS, JSON.stringify(updated));
    return updated;
  },

  getTransactions(): PaymentTransaction[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  },

  saveTransaction(tx: PaymentTransaction): PaymentTransaction[] {
    const list = this.getTransactions();
    const updated = [tx, ...list.filter(t => t.id !== tx.id)];
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updated));
    return updated;
  },

  updateTransactionStatus(id: string, status: 'SUCCESS' | 'PENDING' | 'FAILED', authorizedBy?: string): PaymentTransaction[] {
    const list = this.getTransactions();
    const updated = list.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status,
          authorizedBy: authorizedBy || 'Uma Shukla (Director)',
          authorizedAt: new Date().toISOString()
        };
      }
      return t;
    });
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updated));
    return updated;
  },

  getActiveGrade(): GradeLevel {
    try {
      const g = localStorage.getItem(STORAGE_KEYS.ACTIVE_GRADE) as GradeLevel;
      return (g && ['2', '3', '4', '5', '6', '7', '11', '12'].includes(g)) ? g : '7';
    } catch {
      return '7';
    }
  },

  saveActiveGrade(grade: GradeLevel): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_GRADE, grade);
  },

  getActiveBoard(): EducationBoard {
    try {
      const b = localStorage.getItem(STORAGE_KEYS.ACTIVE_BOARD) as EducationBoard;
      return (b === 'CBSE' || b === 'ICSE') ? b : 'CBSE';
    } catch {
      return 'CBSE';
    }
  },

  saveActiveBoard(board: EducationBoard): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_BOARD, board);
  },

  getFacultyTests(): FacultyTestPaper[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FACULTY_TESTS);
      return data ? JSON.parse(data) : getSeedFacultyTests();
    } catch {
      return getSeedFacultyTests();
    }
  },

  saveFacultyTest(test: FacultyTestPaper): FacultyTestPaper[] {
    const list = this.getFacultyTests();
    const updated = [test, ...list.filter(t => t.id !== test.id)];
    localStorage.setItem(STORAGE_KEYS.FACULTY_TESTS, JSON.stringify(updated));
    return updated;
  },

  deleteFacultyTest(id: string): FacultyTestPaper[] {
    const list = this.getFacultyTests();
    const updated = list.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.FACULTY_TESTS, JSON.stringify(updated));
    return updated;
  },

  getStudentSubmissions(): StudentTestSubmission[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDENT_SUBMISSIONS);
      return data ? JSON.parse(data) : getSeedSubmissions();
    } catch {
      return getSeedSubmissions();
    }
  },

  saveStudentSubmission(sub: StudentTestSubmission): StudentTestSubmission[] {
    const list = this.getStudentSubmissions();
    const updated = [sub, ...list.filter(s => s.id !== sub.id)];
    localStorage.setItem(STORAGE_KEYS.STUDENT_SUBMISSIONS, JSON.stringify(updated));
    return updated;
  },

  evaluateStudentSubmission(submissionId: string, manualScore: number, feedback: string): StudentTestSubmission[] {
    const list = this.getStudentSubmissions();
    const updated = list.map(sub => {
      if (sub.id === submissionId) {
        const finalMarks = (sub.autoScore || 0) + manualScore;
        const pct = Math.round((finalMarks / sub.totalMarks) * 100);
        let icseGrade = 'B';
        if (pct >= 90) icseGrade = 'A+ (Outstanding)';
        else if (pct >= 80) icseGrade = 'A (Distinction)';
        else if (pct >= 70) icseGrade = 'B+ (First Class)';
        else if (pct >= 50) icseGrade = 'B (Second Class)';
        else icseGrade = 'C (Needs Remedial)';

        return {
          ...sub,
          manualScore,
          status: 'evaluated' as const,
          percentage: pct,
          grade: icseGrade,
          facultyFeedback: feedback,
          evaluatedBy: 'Uma Shukla (Director)',
          evaluatedAt: new Date().toISOString()
        };
      }
      return sub;
    });
    localStorage.setItem(STORAGE_KEYS.STUDENT_SUBMISSIONS, JSON.stringify(updated));
    return updated;
  },

  getFacultyMembers(): FacultyMember[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FACULTY_MEMBERS);
      return data ? JSON.parse(data) : SEED_FACULTY_MEMBERS;
    } catch {
      return SEED_FACULTY_MEMBERS;
    }
  },

  saveFacultyMember(faculty: FacultyMember): FacultyMember[] {
    const list = this.getFacultyMembers();
    const updated = [faculty, ...list.filter(f => f.id !== faculty.id)];
    localStorage.setItem(STORAGE_KEYS.FACULTY_MEMBERS, JSON.stringify(updated));
    return updated;
  },

  updateFacultyMember(id: string, updates: Partial<FacultyMember>): FacultyMember[] {
    const list = this.getFacultyMembers();
    const updated = list.map(f => (f.id === id ? { ...f, ...updates } : f));
    localStorage.setItem(STORAGE_KEYS.FACULTY_MEMBERS, JSON.stringify(updated));
    return updated;
  },

  deleteFacultyMember(id: string): FacultyMember[] {
    const list = this.getFacultyMembers();
    const updated = list.filter(f => f.id !== id);
    localStorage.setItem(STORAGE_KEYS.FACULTY_MEMBERS, JSON.stringify(updated));
    return updated;
  },

  getActiveFacultyId(): string {
    try {
      const id = localStorage.getItem(STORAGE_KEYS.ACTIVE_FACULTY_ID);
      return id || 'fac-1';
    } catch {
      return 'fac-1';
    }
  },

  saveActiveFacultyId(id: string): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_FACULTY_ID, id);
  },

  updateChapterResourceStatus(
    chapterId: string,
    resourceIdOrTitle: string,
    status: ApprovalStatus,
    rejectionReason?: string
  ): Chapter[] {
    const list = this.getChapters();
    const updated = list.map(ch => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          resources: ch.resources.map(r => {
            if (r.id === resourceIdOrTitle || r.title === resourceIdOrTitle) {
              return {
                ...r,
                approvalStatus: status,
                rejectionReason: status === 'rejected' ? rejectionReason : undefined
              };
            }
            return r;
          })
        };
      }
      return ch;
    });
    this.saveChapters(updated);
    return updated;
  },

  updateFacultyTestStatus(
    testId: string,
    status: ApprovalStatus,
    rejectionReason?: string
  ): FacultyTestPaper[] {
    const list = this.getFacultyTests();
    const updated = list.map(t => {
      if (t.id === testId) {
        return {
          ...t,
          approvalStatus: status,
          rejectionReason: status === 'rejected' ? rejectionReason : undefined
        };
      }
      return t;
    });
    localStorage.setItem(STORAGE_KEYS.FACULTY_TESTS, JSON.stringify(updated));
    return updated;
  },

  getMasteredFlashcards(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MASTERED_FLASHCARDS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleMasteredFlashcard(cardId: string): string[] {
    const list = this.getMasteredFlashcards();
    const exists = list.includes(cardId);
    const updated = exists ? list.filter(id => id !== cardId) : [...list, cardId];
    localStorage.setItem(STORAGE_KEYS.MASTERED_FLASHCARDS, JSON.stringify(updated));
    return updated;
  },

  addXp(points: number): { profile: UserProfile; newBadges: AchievementBadge[] } {
    const user = this.getUser();
    const currentXp = user.xp || 0;
    const newXp = currentXp + points;
    const currentBadges = user.unlockedBadgeIds || [];
    const newBadges: AchievementBadge[] = [];

    ALL_ACHIEVEMENT_BADGES.forEach(b => {
      if (!currentBadges.includes(b.id)) {
        if (b.id === 'badge-first-quiz' && points > 0) {
          newBadges.push(b);
        } else if (b.id === 'badge-xp-100' && newXp >= 100) {
          newBadges.push(b);
        } else if (b.id === 'badge-xp-500' && newXp >= 500) {
          newBadges.push(b);
        } else if (b.id === 'badge-xp-1000' && newXp >= 1000) {
          newBadges.push(b);
        }
      }
    });

    const updatedBadges = [...currentBadges, ...newBadges.map(b => b.id)];
    const updatedProfile: UserProfile = {
      ...user,
      xp: newXp,
      unlockedBadgeIds: updatedBadges
    };
    this.saveUser(updatedProfile);
    this.saveRegisteredStudent(updatedProfile);
    return { profile: updatedProfile, newBadges };
  },

  recordDailyActivity(): { profile: UserProfile; streakUpdated: boolean } {
    const user = this.getUser();
    const today = new Date().toISOString().slice(0, 10);
    const lastActive = user.lastActiveDate ? user.lastActiveDate.slice(0, 10) : '';

    if (lastActive === today) {
      return { profile: user, streakUpdated: false };
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    let streak = user.streakDays || 0;
    if (lastActive === yesterday) {
      streak += 1;
    } else {
      streak = 1;
    }

    const longestStreak = Math.max(user.longestStreak || 0, streak);
    const currentBadges = user.unlockedBadgeIds || [];
    const newBadges: AchievementBadge[] = [];

    ALL_ACHIEVEMENT_BADGES.forEach(b => {
      if (!currentBadges.includes(b.id)) {
        if (b.id === 'badge-streak-3' && streak >= 3) newBadges.push(b);
        if (b.id === 'badge-streak-7' && streak >= 7) newBadges.push(b);
      }
    });

    const updatedProfile: UserProfile = {
      ...user,
      streakDays: streak,
      longestStreak,
      lastActiveDate: new Date().toISOString(),
      unlockedBadgeIds: [...currentBadges, ...newBadges.map(b => b.id)]
    };
    this.saveUser(updatedProfile);
    this.saveRegisteredStudent(updatedProfile);
    return { profile: updatedProfile, streakUpdated: true };
  },

  getLeaderboard(): LeaderboardUser[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
      let list: LeaderboardUser[] = data ? JSON.parse(data) : SEED_LEADERBOARD;
      const user = this.getUser();
      if (user && user.name) {
        const idx = list.findIndex(u => u.id === user.id || u.name === user.name);
        const userEntry: LeaderboardUser = {
          id: user.id || 'current-user',
          name: user.name,
          grade: user.grade || '7',
          board: user.board || 'ICSE',
          xp: user.xp || 680,
          streakDays: user.streakDays || 3,
          testsCompleted: user.totalTestsTaken || 0,
          rank: 1,
          avatar: user.avatar,
          badgesCount: (user.unlockedBadgeIds || []).length
        };
        if (idx >= 0) {
          list[idx] = { ...list[idx], ...userEntry };
        } else {
          list.push(userEntry);
        }
      }
      list.sort((a, b) => b.xp - a.xp);
      list = list.map((item, index) => ({ ...item, rank: index + 1 }));
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(list));
      return list;
    } catch {
      return SEED_LEADERBOARD;
    }
  },

  saveLeaderboard(data: LeaderboardUser[]): void {
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(data));
  },

  resetAll(): void {
    localStorage.clear();
  }
};

import { UserProfile, TestAttempt, Bookmark, DoubtNote } from '../types';

export const DEFAULT_USER: UserProfile = {
  id: '',
  name: '',
  mobileNumber: '',
  isLoggedIn: false,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  grade: 'Class 7-A (ICSE Board)',
  gradeLevel: '7',
  schoolName: "St. Xavier's Boys' Academy",
  board: 'ICSE',
  targetPercentage: 95,
  isProMember: false,
  demoMockTestTaken: false,
  paymentStatus: 'none',
  streakDays: 1,
  longestStreak: 1,
  xp: 120,
  unlockedBadgeIds: ['badge-welcome'],
  totalTestsTaken: 0,
  averageScorePercentage: 0,
  coins: 50
};

export const DEMO_STUDENT: UserProfile = {
  id: 'stu-9876543210',
  name: 'Aarav Sharma',
  mobileNumber: '9876543210',
  isLoggedIn: false,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  grade: 'Class 7-A (ICSE Board)',
  gradeLevel: '7',
  schoolName: "St. Xavier's Boys' Academy",
  board: 'ICSE',
  targetPercentage: 95,
  isProMember: true,
  paymentStatus: 'authorized',
  demoMockTestTaken: true,
  streakDays: 4,
  longestStreak: 7,
  xp: 680,
  unlockedBadgeIds: ['badge-welcome', 'badge-first-test', 'badge-streak-3'],
  totalTestsTaken: 3,
  averageScorePercentage: 85.1,
  coins: 140,
  joinedAt: '2026-10-01'
};

export const INITIAL_TEST_ATTEMPTS: TestAttempt[] = [
  {
    id: 'attempt-101',
    testTitle: 'Mathematics Chapter 1 & 2 Diagnostic Mock',
    testType: 'subject-wise',
    subjectId: 'mathematics',
    subjectName: 'Mathematics',
    chapterIds: ['math-ch1', 'math-ch2'],
    startedAt: '2026-10-12T14:30:00.000Z',
    completedAt: '2026-10-12T14:48:00.000Z',
    durationMinutes: 25,
    totalTimeSpentSeconds: 1080,
    totalMarks: 7,
    scoredMarks: 5,
    percentage: 71.4,
    grade: 'First Class with Merit (B+)',
    passed: true,
    accuracy: 75,
    questionIds: ['q-math-1', 'q-math-2', 'q-math-3', 'q-math-4', 'q-math-7'],
    answers: {
      'q-math-1': {
        questionId: 'q-math-1',
        userMcqIndex: 0,
        isCorrect: true,
        marksAwarded: 1,
        timeSpentSeconds: 65
      },
      'q-math-2': {
        questionId: 'q-math-2',
        userBoolean: true,
        isCorrect: true,
        marksAwarded: 1,
        timeSpentSeconds: 40
      },
      'q-math-3': {
        questionId: 'q-math-3',
        userText: '47, 47',
        isCorrect: true,
        marksAwarded: 1,
        timeSpentSeconds: 55
      },
      'q-math-4': {
        questionId: 'q-math-4',
        userText: '35 - 25 = 10',
        isCorrect: false,
        marksAwarded: 1,
        timeSpentSeconds: 210
      },
      'q-math-7': {
        questionId: 'q-math-7',
        userText: '0.4',
        isCorrect: false,
        marksAwarded: 0,
        timeSpentSeconds: 95
      }
    },
    weakAreas: [
      {
        subjectId: 'mathematics',
        chapterId: 'math-ch1',
        chapterTitle: 'Integers & Operations',
        topic: 'Multi-Bracket BODMAS Simplification',
        wrongCount: 1,
        totalCount: 1,
        missedConcepts: ['Parenthesis nesting priority order', 'Sign multiplication with minus outside bracket'],
        recommendedAction: 'Practice nested brackets simplification and review Uma Shukla\'s 10-minute bracket priority rule.',
        difficultySuggested: 'Tough'
      },
      {
        subjectId: 'mathematics',
        chapterId: 'math-ch2',
        chapterTitle: 'Fractions & Decimals',
        topic: 'Decimals Multiplication & Place Values',
        wrongCount: 1,
        totalCount: 1,
        missedConcepts: ['Counting cumulative decimal places when multiplying three decimal factors'],
        recommendedAction: 'Solve 10 decimal products with varying zero factors and use the interactive Fraction/Decimal tool.',
        difficultySuggested: 'Average'
      }
    ],
    remedialQuestionIds: ['q-math-4', 'q-math-7']
  },
  {
    id: 'attempt-102',
    testTitle: 'Physics Light & Reflection Concept Quiz',
    testType: 'lesson-wise',
    subjectId: 'physics',
    subjectName: 'Physics',
    chapterIds: ['phy-ch3'],
    startedAt: '2026-10-13T10:15:00.000Z',
    completedAt: '2026-10-13T10:27:00.000Z',
    durationMinutes: 15,
    totalTimeSpentSeconds: 720,
    totalMarks: 4,
    scoredMarks: 4,
    percentage: 100,
    grade: 'Outstanding Distinction (A*)',
    passed: true,
    accuracy: 100,
    questionIds: ['q-phy-3', 'q-phy-4'],
    answers: {
      'q-phy-3': {
        questionId: 'q-phy-3',
        userMcqIndex: 1,
        isCorrect: true,
        marksAwarded: 1,
        timeSpentSeconds: 85
      },
      'q-phy-4': {
        questionId: 'q-phy-4',
        userText: 'Virtual, erect, same size, and left becomes right.',
        isCorrect: true,
        marksAwarded: 3,
        timeSpentSeconds: 150
      }
    },
    weakAreas: []
  }
];

export const INITIAL_BOOKMARKS: Bookmark[] = [
  {
    id: 'bmk-1',
    questionId: 'q-math-5',
    savedAt: '2026-10-12T15:00:00.000Z',
    studentNotes: 'Remember submarine distance is 350 - (-380) = +730 m, do not subtract 380 directly!',
    tags: ['Submarine Problem', 'Elevation', 'Class 7 Exam Imp']
  },
  {
    id: 'bmk-2',
    questionId: 'q-chem-3',
    savedAt: '2026-10-13T16:20:00.000Z',
    studentNotes: 'Aluminium sulphate is Al2(SO4)3 with brackets around SO4, do not write Al2SO12!',
    tags: ['Criss-Cross', 'Radicals', 'Chemistry']
  }
];

export const INITIAL_DOUBTS: DoubtNote[] = [
  {
    id: 'doubt-1',
    chapterId: 'phy-ch3',
    chapterTitle: 'Light: Reflection & Mirrors',
    questionOrTopic: 'Glancing angle vs Angle of incidence',
    noteText: 'Uma Ma\'am: In question 3, remember glancing angle is measured from mirror plane, NOT from normal.',
    createdAt: '2026-10-13T11:00:00.000Z',
    status: 'resolved'
  },
  {
    id: 'doubt-2',
    chapterId: 'math-ch1',
    chapterTitle: 'Integers & Operations',
    questionOrTopic: 'Distributive property with negative common terms',
    noteText: 'Need extra practice questions on factoring (-a) out of multi-term expressions.',
    createdAt: '2026-10-13T19:30:00.000Z',
    status: 'pending'
  }
];

export const INITIAL_REGISTERED_STUDENTS: UserProfile[] = [
  DEMO_STUDENT,
  {
    id: 'stu-9871122334',
    name: 'Ishaan Verma',
    mobileNumber: '9871122334',
    isLoggedIn: false,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80',
    grade: 'Grade 7 (ICSE)',
    gradeLevel: '7',
    board: 'ICSE',
    schoolName: "Bishop Cotton Boys' School",
    targetPercentage: 92,
    isProMember: false,
    paymentStatus: 'pending_authorization',
    pendingPlanName: 'Master Pass',
    pendingPlanId: 'master-pass',
    pendingAmount: 499,
    pendingUtr: '629811409218',
    demoMockTestTaken: true,
    streakDays: 5,
    totalTestsTaken: 1,
    averageScorePercentage: 78.5,
    coins: 90,
    joinedAt: '2026-10-05T10:30:00.000Z'
  },
  {
    id: 'stu-9810055443',
    name: 'Rohan Mehra',
    mobileNumber: '9810055443',
    isLoggedIn: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    grade: 'Class 12 (CBSE Commerce)',
    gradeLevel: '12',
    board: 'CBSE',
    schoolName: "Delhi Public School, R.K. Puram",
    targetPercentage: 96,
    isProMember: true,
    paymentStatus: 'authorized',
    authorizedModules: ['all'],
    demoMockTestTaken: true,
    streakDays: 8,
    totalTestsTaken: 6,
    averageScorePercentage: 91.0,
    coins: 210,
    joinedAt: '2026-10-08T14:15:00.000Z'
  },
  {
    id: 'stu-9822334455',
    name: 'Diya Patel',
    mobileNumber: '9822334455',
    isLoggedIn: false,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
    grade: 'Grade 5 (ICSE)',
    gradeLevel: '5',
    board: 'ICSE',
    schoolName: "Cathedral & John Connon School",
    targetPercentage: 94,
    isProMember: false,
    paymentStatus: 'none',
    demoMockTestTaken: false,
    streakDays: 2,
    totalTestsTaken: 0,
    averageScorePercentage: 0,
    coins: 60,
    joinedAt: '2026-10-12T16:00:00.000Z'
  }
];

export const INITIAL_TRANSACTIONS: any[] = [
  {
    id: 'tx-seed-1',
    studentId: 'stu-9871122334',
    studentName: 'Ishaan Verma',
    studentMobile: '9871122334',
    planId: 'master-pass',
    planName: 'Master Pass',
    amount: 499,
    upiId: '8707794159@ptyes',
    utrNumber: '629811409218',
    paymentMethod: 'UPI_QR',
    timestamp: new Date(Date.now() - 3600 * 1000).toISOString(),
    status: 'PENDING',
    receiptNumber: 'MC-REC-782109'
  },
  {
    id: 'tx-seed-2',
    studentId: 'stu-9810055443',
    studentName: 'Rohan Mehra',
    studentMobile: '9810055443',
    planId: 'cbse-12-pass',
    planName: 'CBSE Class 12 Commerce Board Booster',
    amount: 999,
    upiId: '8707794159@ptyes',
    utrNumber: '629088123456',
    paymentMethod: 'UPI_QR',
    timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    status: 'SUCCESS',
    receiptNumber: 'MC-REC-654321',
    authorizedBy: 'Uma Shukla (Director)',
    authorizedAt: new Date(Date.now() - 22 * 3600 * 1000).toISOString()
  }
];


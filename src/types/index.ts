export type QuestionType = 'mcq' | 'true_false' | 'fill_blank' | 'short_answer' | 'long_answer';
export type Difficulty = 'Average' | 'Tough';
export type UserRole = 'student' | 'admin' | 'faculty';
export type EducationBoard = 'CBSE' | 'ICSE';
export type GradeLevel = '2' | '3' | '4' | '5' | '6' | '7' | '11' | '12';
export type ApprovalStatus = 'approved' | 'pending_approval' | 'rejected';

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  email: string;
  phone: string;
  avatar?: string;
  assignedSubjects: SubjectId[];
  assignedGrades: GradeLevel[];
  status: 'active' | 'suspended';
  joinedAt: string;
  addedBy: string;
  bio?: string;
}

export type SubjectId =
  | 'mathematics'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'english'
  | 'history_civics'
  | 'geography'
  | 'computers'
  | 'accountancy'
  | 'business_studies'
  | 'economics';

export interface Subject {
  id: SubjectId;
  name: string;
  code: string;
  iconName: string;
  color: string;
  bgGradient: string;
  description: string;
  chapterCount: number;
  grades?: GradeLevel[];
  boards?: EducationBoard[];
}

export interface PptSlide {
  slideNumber: number;
  title: string;
  categoryTag?: string;
  bullets: string[];
  keyHighlight?: string;
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  diagramBox?: {
    label: string;
    items: { term: string; explanation: string }[];
  };
  examMantra: string;
}

export type LabType = 'light_reflection' | 'cell_organelles' | 'fraction_visualizer' | 'chemical_equation';

export interface ChapterResource {
  id?: string;
  type: 'video' | 'graphical_lab' | 'notes_pdf' | 'formula_sheet' | 'ppt_presentation';
  title: string;
  durationOrPages?: string;
  thumbnailUrl?: string;
  labType?: LabType;
  videoUrl?: string;
  pptUrl?: string;
  slideCount?: number;
  slides?: PptSlide[];
  description?: string;
  uploadedBy?: string;
  uploadedAt?: string;
  approvalStatus?: ApprovalStatus;
  rejectionReason?: string;
  facultyId?: string;
  facultyName?: string;
  chapterId?: string;
  chapterTitle?: string;
  subjectId?: SubjectId;
  gradeLevel?: GradeLevel;
  board?: EducationBoard;
}

export interface Chapter {
  id: string;
  subjectId: SubjectId;
  chapterNumber: number;
  title: string;
  summary: string;
  keyConcepts: string[];
  keyFormulasOrTerms: { term: string; definition: string }[];
  isLocked?: boolean;
  resources: ChapterResource[];
  gradeLevel?: GradeLevel;
  board?: EducationBoard;
}

export interface Question {
  id: string;
  subjectId: SubjectId;
  chapterId: string;
  chapterTitle: string;
  topic: string;
  type: QuestionType;
  difficulty: Difficulty;
  marks: number;
  text: string;
  gradeLevel?: GradeLevel;
  board?: EducationBoard;
  diagramSvg?: string;
  options?: string[];
  correctOptionIndex?: number;
  correctBoolean?: boolean;
  correctBlanks?: string[];
  sampleAnswer?: string;
  markingCriteria?: string[];
  mantraHint: string;
  explanation: string;
}

export interface AnswerAttachment {
  name: string;
  type: 'image' | 'pdf';
  dataUrl: string;
  sizeBytes?: number;
  uploadedAt?: string;
}

export interface UserAnswer {
  questionId: string;
  userMcqIndex?: number;
  userBoolean?: boolean;
  userText?: string;
  uploadedAttachment?: AnswerAttachment;
  isCorrect?: boolean;
  marksAwarded?: number;
  timeSpentSeconds: number;
}

export interface TopicWeakness {
  subjectId: SubjectId;
  chapterId: string;
  chapterTitle: string;
  topic: string;
  wrongCount: number;
  totalCount: number;
  missedConcepts: string[];
  recommendedAction: string;
  difficultySuggested: Difficulty;
}

export interface TestAttempt {
  id: string;
  testTitle: string;
  testType: 'subject-wise' | 'lesson-wise' | 'custom' | 'remedial';
  subjectId?: SubjectId;
  subjectName?: string;
  chapterIds: string[];
  startedAt: string;
  completedAt: string;
  durationMinutes: number;
  totalTimeSpentSeconds: number;
  totalMarks: number;
  scoredMarks: number;
  percentage: number;
  grade: string;
  passed: boolean;
  accuracy: number;
  answers: Record<string, UserAnswer>;
  questionIds: string[];
  weakAreas: TopicWeakness[];
  remedialQuestionIds?: string[];
}

export interface CustomTestConfig {
  id?: string;
  title: string;
  selectedSubjects: SubjectId[];
  selectedChapterIds: string[];
  questionCount: number;
  difficultyRatio: 'balanced' | 'mostly_average' | 'mostly_tough';
  questionTypes: QuestionType[];
  durationMinutes: number;
}

export interface Bookmark {
  id: string;
  questionId: string;
  savedAt: string;
  studentNotes: string;
  tags: string[];
}

export interface DoubtNote {
  id: string;
  studentId?: string;
  studentName?: string;
  studentMobile?: string;
  recipientRole?: 'faculty' | 'admin';
  recipientId?: string;
  recipientName?: string;
  subjectId?: SubjectId;
  subjectName?: string;
  chapterId: string;
  chapterTitle: string;
  questionOrTopic: string;
  noteText: string;
  createdAt: string;
  status: 'pending' | 'resolved';
  mentorReply?: string;
  repliedAt?: string;
  repliedBy?: string;
  attachmentUrl?: string;
  attachmentName?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  mobileNumber?: string;
  isLoggedIn?: boolean;
  avatar: string;
  grade: string;
  gradeLevel?: GradeLevel;
  schoolName: string;
  board?: EducationBoard;
  targetPercentage: number;
  isProMember: boolean;
  proExpiryDate?: string;
  streakDays: number;
  totalTestsTaken: number;
  averageScorePercentage: number;
  coins: number;
  joinedAt?: string;
}

export interface PaymentTransaction {
  id: string;
  planName: string;
  amount: number;
  upiId: string;
  utrNumber: string;
  paymentMethod: 'UPI_QR' | 'UPI_COLLECT';
  timestamp: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  receiptNumber: string;
}

export interface FacultyTestPaper {
  id: string;
  title: string;
  instructions: string;
  targetGrade: GradeLevel | 'all';
  board?: EducationBoard;
  subjectId: SubjectId;
  subjectName: string;
  chapterTitle?: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  dueDate: string;
  createdAt: string;
  createdBy: string;
  questions: Question[];
  status: 'active' | 'archived';
  approvalStatus?: ApprovalStatus;
  rejectionReason?: string;
  facultyId?: string;
  facultyName?: string;
}

export interface StudentTestSubmission {
  id: string;
  testPaperId: string;
  testTitle: string;
  studentId: string;
  studentName: string;
  studentMobile?: string;
  studentGrade: GradeLevel;
  subjectId: SubjectId;
  submittedAt: string;
  durationSpentMinutes: number;
  answers: Record<string, UserAnswer>;
  uploadedSheets?: AnswerAttachment[];
  status: 'submitted' | 'evaluated';
  autoScore: number;
  manualScore?: number;
  totalMarks: number;
  percentage?: number;
  grade?: string;
  facultyFeedback?: string;
  evaluatedBy?: string;
  evaluatedAt?: string;
}


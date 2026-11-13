export type UserRole = 'estudante' | 'professor' | 'administrador';

export type TabType = 
  | 'inicio' 
  | 'pesquisar' 
  | 'cursos'
  | 'meus-cursos'
  | 'conquistas'
  | 'ferramentas'
  | 'projetos'
  | 'ia'
  | 'materias' 
  | 'jogos' 
  | 'quizzes' 
  | 'professores'
  | 'painel-professor'
  | 'admin'
  | 'progresso' 
  | 'perfil';

export type GameType = 
  | 'calc' 
  | 'memory' 
  | 'flash' 
  | 'words' 
  | 'vocab'
  | 'truefalse'
  | 'chemistry'
  | 'geography'
  | 'history'
  | 'logic';

export type SubjectLevel = 'Iniciante' | 'Intermédio' | 'Avançado';

export interface Topic {
  title: string;
  desc: string;
  keyPoints?: string[];
}

export interface Exercise {
  q: string;
  options: string[];
  correct: number;
  hint: string;
  explanation?: string;
}

export interface CurriculumLesson {
  id: string;
  title: string;
  durationMinutes: number;
  explanation: string;
  fundamentalConcepts: string[];
  practicalExamples: string[];
  realWorldApplications: string[];
  stepByStepExercises: {
    problem: string;
    steps: string[];
    finalAnswer: string;
  }[];
  practiceExercises: Exercise[];
  summary: string;
  reviewQuestions: Exercise[];
}

export interface CurriculumUnit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  lessons: CurriculumLesson[];
}

export interface CurriculumModule {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  targetLevel: SubjectLevel;
  estimatedHours: number;
  units: CurriculumUnit[];
  moduleAssessment: {
    title: string;
    instructions: string;
    questions: Exercise[];
    passingScorePercentage: number;
  };
}

export interface FinalSubjectAssessment {
  level: SubjectLevel;
  title: string;
  questions: Exercise[];
  certificateBadgeId?: string;
}

export interface SubjectChapter {
  id: string;
  title: string;
  summary: string;
  fullText: string;
  keyFormulaOrCode?: string;
  reviewQuestion: Exercise;
}

export interface SubjectUnit {
  title: string;
  chapters: SubjectChapter[];
}

export interface Subject {
  id: string;
  name: string;
  category: 'Exatas' | 'Humanas' | 'Línguas' | 'Tecnologia' | 'Biológicas & Terra' | 'Sociedade & Negócios';
  icon: string;
  level: SubjectLevel;
  badgeColor: string;
  intro: string;
  objectives: string[];
  topics: Topic[];
  units?: SubjectUnit[];
  modules?: CurriculumModule[];
  finalAssessments?: FinalSubjectAssessment[];
  example: string;
  exercise: Exercise;
  glossary?: { term: string; definition: string }[];
  summary?: string;
}

export interface VocabularyItem {
  word: string;
  translation: string;
  phonetic?: string;
}

export interface DialogueItem {
  speaker: string;
  text: string;
  translation: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  vocabulary?: VocabularyItem[];
  dialogue?: DialogueItem[];
  grammarTip?: string;
  exercise: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

export interface CourseUnit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  lessons: CourseLesson[];
}

export interface CourseCurriculumModule {
  id: string;
  moduleNumber: number;
  title: string;
  levelBadge?: string; // e.g. A1, A2, B1, B2, C1, C2 or Nível 1-5
  description: string;
  units: CourseUnit[];
  moduleAssessment?: {
    title: string;
    questions: Exercise[];
  };
}

export interface Course {
  id: string;
  title: string;
  cat: string;
  type: 'language' | 'tech' | 'business';
  duration: string;
  lessonsCount: number;
  level: string;
  desc: string;
  prerequisites: string;
  progress: number;
  lessons: CourseLesson[];
  curriculumModules?: CourseCurriculumModule[];
  finalProject?: {
    title: string;
    objective: string;
    brief: string;
    deliverables: string[];
  };
}

export interface Badge {
  id: string;
  title: string;
  desc: string;
  icon: string;
  req: number;
}

export interface QuizHistoryItem {
  id: string;
  theme: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  dateFormatted: string;
  xpEarned: number;
}

/* ===================================================
   MINDORA TEACHERS — TIPOS E INTERFACES
   =================================================== */

export type TeacherApplicationStatus = 'pendente' | 'aprovado' | 'recusado';

export interface TeacherApplication {
  id: string;
  userId: string;
  name: string;
  email: string;
  specialty: string;
  subjectsTaught: string[];
  bio: string;
  experience?: string;
  avatarEmoji?: string;
  agreementAccepted: boolean;
  status: TeacherApplicationStatus;
  submittedAt: string;
  reviewedAt?: string;
  adminNotes?: string;
}

export type ContentStatus = 'rascunho' | 'em_analise' | 'aprovado' | 'recusado' | 'arquivado';

export interface TeacherMaterialFile {
  id: string;
  title: string;
  url: string;
  type: 'pdf' | 'presentation' | 'video' | 'link' | 'image';
  fileSize?: string;
}

export interface TeacherSubject {
  id: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar?: string;
  title: string;
  description: string;
  discipline: string;
  educationLevel: SubjectLevel;
  theme: string;
  objectives: string[];
  fullExplanation: string;
  examples: string;
  formulasOrCode?: string;
  exercises: Exercise[];
  reviewQuestions?: Exercise[];
  summary: string;
  supplementaryResources?: TeacherMaterialFile[];
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
  rejectionReason?: string;
  viewsCount?: number;
}

export interface TeacherCourseLesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  videoUrl?: string;
  materials?: TeacherMaterialFile[];
  exercises?: Exercise[];
  isCompleted?: boolean;
}

export interface TeacherCourseModule {
  id: string;
  title: string;
  description: string;
  lessons: TeacherCourseLesson[];
}

export interface TeacherCourseReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
}

export interface TeacherCourse {
  id: string;
  teacherId: string;
  teacherName: string;
  teacherAvatar?: string;
  teacherBio?: string;
  teacherSpecialty?: string;
  title: string;
  coverUrl?: string;
  description: string;
  category: string;
  level: SubjectLevel;
  objectives: string[];
  prerequisites: string;
  estimatedDuration: string;
  modules: TeacherCourseModule[];
  finalProject?: string;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
  rejectionReason?: string;
  enrolledCount: number;
  reviews: TeacherCourseReview[];
  averageRating: number;
}

export interface TeacherEnrollment {
  id: string;
  courseId: string;
  courseTitle: string;
  teacherId: string;
  studentId: string;
  studentName: string;
  enrolledAt: string;
  progress: number;
  completedLessonIds: string[];
  rating?: number;
  reviewComment?: string;
}

export interface ContentReport {
  id: string;
  contentId: string;
  contentTitle: string;
  contentType: 'course' | 'subject';
  reporterId: string;
  reporterName: string;
  reason: 'inapropriado' | 'direitos_autor' | 'dados_pessoais' | 'outro';
  details: string;
  reportedAt: string;
  status: 'pendente' | 'resolvido' | 'descartado';
}

/* ===================================================
   MINDORA PROJECTS — TIPOS E INTERFACES
   =================================================== */

export type ProjectCategory = 
  | 'Programação'
  | 'Design'
  | 'Arte'
  | 'Estudos'
  | 'Negócios'
  | 'Projetos Pessoais'
  | 'Outros';

export type ProjectPriority = 'baixa' | 'media' | 'alta' | 'urgente';
export type ProjectStatus = 'em_andamento' | 'concluido' | 'arquivado';

export interface ProjectTask {
  id: string;
  title: string;
  completed: boolean;
  priority?: ProjectPriority;
  dueDate?: string;
}

export interface MindoraProject {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  priority: ProjectPriority;
  status: ProjectStatus;
  deadline?: string;
  progressPercentage: number;
  notes?: string;
  ideas?: string[];
  tasks: ProjectTask[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface ModuleExamReviewItem {
  question: string;
  options: string[];
  selectedOption: number;
  correctOption: number;
  explanation: string;
  needsReview: boolean;
}

export interface ModuleExamResult {
  id: string;
  moduleId: string;
  courseId: string;
  moduleTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
  reviewItems: ModuleExamReviewItem[];
}

export interface ActivityHistoryItem {
  id: string;
  title: string;
  category: string;
  timestamp: string;
  xp: number;
  icon: string;
}

export interface UserState {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  interest: string;
  goal: string;
  avatarEmoji: string;
  xp: number;
  activitiesCompleted: number;
  streak: number;
  studyTimeMinutes: number;
  enrolledCourseIds: string[];
  enrolledTeacherCourseIds: string[];
  completedLessonIds: string[];
  completedModuleIds: string[];
  completedExercises: string[];
  quizHistory: QuizHistoryItem[];
  moduleExamResults: Record<string, ModuleExamResult>;
  projects: MindoraProject[];
  unlockedBadges: string[];
  weeklyActivity: { day: string; xp: number; minutes: number }[];
  weeklyGoals: {
    targetStudyMinutes: number;
    targetLessons: number;
    targetExercises: number;
  };
  recentActivity: ActivityHistoryItem[];
  highScores: {
    calc: number;
    memory: number;
    flash: number;
    vocab: number;
    words: number;
    truefalse: number;
    chemistry: number;
    geography: number;
    history: number;
    logic: number;
  };
  isAuthenticated: boolean;
  isDemoUser: boolean;
  teacherApplication?: TeacherApplication;
  isTeacherApproved?: boolean;
}

export interface SearchItem {
  type: 'matéria' | 'exercício' | 'curso' | 'jogo' | 'conceito' | 'professor';
  title: string;
  subtitle: string;
  snippet: string;
  badge: string;
  actionType: 'open-subject' | 'open-game' | 'open-course' | 'open-quiz' | 'open-ia' | 'open-teacher-course';
  payload?: string;
}

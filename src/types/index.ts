export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LessonContent {
  id: string;
  title: string;
  duration: string; // e.g. "18 min"
  type: 'video' | 'reading' | 'exercise' | 'audio';
  summary: string;
  videoDuration?: number; // in seconds
  videoSlides?: {
    timestamp: number;
    title: string;
    bulletPoints: string[];
    highlightQuote?: string;
  }[];
  textContent: string[];
  keyTakeaways?: string[];
  practicalExercise?: string;
  downloadableResource?: {
    name: string;
    fileSize: string;
    fileType: string;
    description: string;
  };
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: string;
  lessons: LessonContent[];
  quiz?: {
    title: string;
    questions: QuizQuestion[];
  };
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  category: 'management' | 'leadership' | 'entrepreneurship' | 'finance' | 'langue' | 'personnel';
  categoryLabel: string;
  price: number; // in FCFA
  priceEur?: number; // e.g. 155 or 230
  originalPrice?: number;
  durationWeeks?: string;
  totalHours: string;
  videoCount?: number;
  pdfCount?: number;
  bonusTitle?: string;
  bonuses: string[];
  imageUrl?: string;
  keyFeatures: string[];
  description: string;
  targetAudience: string[];
  audienceTarget?: ('personnel' | 'entreprises' | 'etudiants')[];
  modalities?: ('online' | 'presentiel')[];
  formats?: ('individuel' | 'groupe')[];
  prerequisites: string;
  contactPhone: string;
  contactEmail?: string;
  instructor: {
    name: string;
    title: string;
    bio: string;
    avatarUrl?: string;
    email?: string;
  };
  modules: CourseModule[];
  hasAudioPractice?: boolean;
  hasBusinessPlans?: boolean;
  hasFinancialCalculator?: boolean;
  isPdfOnly?: boolean; // True for Pack Entrepreneuriat & Éducation Financière (sold as PDF, not online course)
  pdfDeliveryNotice?: string;
}

export interface BusinessPlanItem {
  id: string;
  sector: string;
  title: string;
  investmentFcfa: string;
  monthlyRevenueEst: string;
  breakEvenMonths: string;
  summary: string;
  targetMarket: string;
  keyEquipment: string[];
  successKeys: string[];
}

export interface SererePhrase {
  id: string;
  french: string;
  serere: string;
  phonetic: string;
  dialectContext: 'Sine' | 'Saloum' | 'Baol' | 'Commun';
  category: 'Salutations' | 'Expressions Courantes' | 'Au Marché & Chiffres' | 'Famille & Respect' | 'Orientation & Voyage';
  culturalNote?: string;
}

export interface StudentProgress {
  courseId: string;
  completedLessonIds: string[];
  completedQuizIds: string[];
  quizScores: Record<string, number>; // quizId -> percentage
  enrolledDate: string;
  certificateEarnedDate?: string;
  notes: Record<string, string>; // lessonId -> note text
}

export interface UserAccount {
  name: string;
  email: string;
  phone: string;
  enrolledCourseIds: string[];
}

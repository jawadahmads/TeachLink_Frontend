// Student Types

export interface Student {
  id: string;
  name: string;
  avatar: string;
  email: string;
  joinedDate: string;
  totalSessions: number;
  favoriteSubjects: string[];
  interests: string[];
  academicLevel?: string;
  learningHours?: number;
  averageRating?: number;
  totalReviews?: number;
  streak?: number;
  badges?: string[];
}

export interface StudentProfile extends Student {
  stripeId?: string;
  preferredLanguage?: string;
  timezone?: string;
}

export interface LearningProgress {
  subject: string;
  progress: number;
  totalHours: number;
  sessionsCompleted: number;
  averageRating: number;
  lastStudied?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
  requiredProgress?: number;
  tier?: "bronze" | "silver" | "gold" | "diamond";
}

export interface Streak {
  current: number;
  longest: number;
  lastActiveDate: string;
  nextMilestone?: number;
  rewardPreview?: string;
}

export interface SubjectMastery {
  subject: string;
  level: number;
  progress: number;
  topics: TopicProgress[];
}

export interface TopicProgress {
  topic: string;
  completed: boolean;
  mastery: number;
}

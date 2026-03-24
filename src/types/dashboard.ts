// Dashboard Types

import { TeacherSummary } from "./teacher";
import { Streak } from "./student";
import { Session, UpcomingSession, CompletedSession } from "./session";

export interface DashboardStats {
  totalSessions: number;
  sessionsThisMonth: number;
  upcomingSessions: number;
  completedSessions: number;
  learningHours: number;
  hoursThisWeek: number;
  averageRating: number;
  totalReviews: number;
  totalEarnings?: number;
  earningsThisMonth?: number;
  favoriteTeacher?: TeacherSummary;
  totalSpent: number;
  streak: Streak;
}

export interface Teacher {
  id: string;
  name: string;
  avatar: string;
  rating: number;
}

export interface Subject {
  id: string;
  name: string;
}

export interface Payment {
  id: string;
  amount: number;
  status: string;
}

export interface Booking {
  id: string;
  studentId: string;
  teacherId: string;
  subjectId: string;
  startTime: string;
  endTime: string;
  status: string;
  createdAt: string;
  completed: string;
  teacher: Teacher;
  subject: Subject;
  payment: Payment;
}

export interface StudentProfile {
  academicLevel: string | null;
  interests: string[];
  joinedDate: string;
  totalSessions: number;
}

export interface StudentStats {
  totalSessions: number;
  upcomingSessions: number;
  totalReviews: number;
}

export interface DashboardUser {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  student: {
    id: string;
    name: string;
    avatar: string;
  };
  subject: {
    id: string;
    name: string;
  };
}

export interface StudentDashboardData {
  user: DashboardUser;
  profile: StudentProfile;
  stats: StudentStats;
  upcomingBookings: Booking[];
  pastBookings: Booking[];
  favoriteTeachers: Teacher[];
  favoriteSubjects: Subject[];
  recentReviews: Review[];
}

export interface TeacherDashboardData {
  profile: import("./teacher").Teacher;
  stats: DashboardStats;
  upcomingSessions: Session[];
  completedSessions: Session[];
  recentMessages: import("./chat").Message[];
  recentReviews: import("./review").Review[];
  availability: import("./teacher").DayAvailability[];
}

export interface DashboardState {
  data: StudentDashboardData | null;
  loading: boolean;
  error: string | null;
}

export interface StatCard {
  label: string;
  value: string | number;
  icon: string;
  trend: string;
  color: string;
  bg: string;
  border: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  badge?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: "session" | "reminder" | "deadline";
  date: string;
  time: string;
  duration: number;
  relatedSessionId?: string;
  color?: string;
}

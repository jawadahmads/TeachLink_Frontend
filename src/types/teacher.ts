// Teacher Types

export interface Subject {
  id?: string;
  name: string;
}

export interface Language {
  id: string;
  name: string;
}

export interface DayAvailability {
  day: string;
  slots: string[];
}

export interface Teacher {
  id: string;
  name: string;
  avatar: string;
  subjects: string[] | Subject[];
  subjectsList?: string[];
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  bio: string;
  education: string;
  experience: string;
  languages: string[] | Language[];
  languagesList?: string[];
  availability: DayAvailability[];
  totalStudents: number;
  totalHours: number;
  responseTime: number | null | string;
  verified: boolean;
  stripeId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeacherPublicProfile extends Teacher {
  gigs?: import("./gig").Gig[];
  reviews?: import("./review").Review[];
  responseTimeFormatted?: string;
}

export interface TeacherSummary {
  id: string;
  name: string;
  avatar: string;
  subjects: string[];
  rating: number;
  isOnline?: boolean;
  lastActive?: string;
}

export interface TeacherSearchResult {
  id: string;
  gigId?: string;
  gigTitle?: string;
  gigDescription?: string;
  name: string;
  avatar: string;
  subjects: string[];
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  bio: string;
  education: string;
  experience: string;
  languages: string[];
  availability: DayAvailability[];
  totalStudents: number;
  totalHours: number;
  responseTime: string;
  verified: boolean;
}

export interface ProfileUpdateData {
  name?: string;
  bio?: string;
  education?: string;
  experience?: string;
  subjects?: string[];
  languages?: string[];
  hourlyRate?: number;
  availability?: DayAvailability[];
  avatar?: string;
}

export interface UserInfo {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  bio: string;
  education: string;
  experience: string;
  responseTime: string | null;
  verified: boolean;
  totalStudents: number;
  totalHours: number;
  subjects: Subject[];
  languages: Language[];
  availability: DayAvailability[];
  stripeId?: string;
}

export interface UserInfoState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
}

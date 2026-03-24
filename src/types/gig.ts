// Gig Types

import { Teacher } from "./teacher";

export interface Gig {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  teacherId: string;
  teacher: Teacher;
}

export interface GigFormData {
  title: string;
  description: string;
  subjects: string[];
  hourlyRate: number;
  languages: string[];
  availability: import("./teacher").DayAvailability[];
}

export interface GigInfoState {
  gigs: Gig[];
  loading: boolean;
  error: string | null;
}

export interface GigStats {
  totalGigs: number;
  activeGigs: number;
  totalViews: number;
  totalBookings: number;
  conversionRate: number;
}

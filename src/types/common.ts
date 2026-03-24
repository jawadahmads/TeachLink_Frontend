// Common and Utility Types

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface CheckoutResponse {
  url: string;
  sessionId?: string;
}

// Loading States
export type LoadingState = "idle" | "loading" | "succeeded" | "failed";

// Select Options
export interface SelectOption {
  label: string;
  value: string;
}

// Navigation
export interface NavigationItem {
  name: string;
  path: string;
  icon: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Animation Variants
export interface ContainerVariants {
  hidden: { opacity: number };
  visible: {
    opacity: number;
    transition: {
      staggerChildren: number;
    };
  };
}

export interface ItemVariants {
  hidden: { y: number; opacity: number };
  visible: {
    y: number;
    opacity: number;
    transition: {
      duration: number;
      ease: number[] | string;
    };
  };
}

// Default animation variants preset
export const DEFAULT_CONTAINER_VARIANTS: ContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const DEFAULT_ITEM_VARIANTS: ItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Generic
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Required<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// Days of Week
export const DAYS_OF_WEEK = [
  { value: "MONDAY", label: "Monday" },
  { value: "TUESDAY", label: "Tuesday" },
  { value: "WEDNESDAY", label: "Wednesday" },
  { value: "THURSDAY", label: "Thursday" },
  { value: "FRIDAY", label: "Friday" },
  { value: "SATURDAY", label: "Saturday" },
  { value: "SUNDAY", label: "Sunday" },
] as const;

// Time Presets
export const TIME_PRESETS = {
  MORNING: {
    label: "Morning",
    times: ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
  },
  AFTERNOON: {
    label: "Afternoon",
    times: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"],
  },
  EVENING: {
    label: "Evening",
    times: ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"],
  },
} as const;

// Subjects
export const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "English",
  "Spanish",
  "French",
  "Economics",
  "Business",
  "Finance",
  "History",
  "Literature",
  "Programming",
  "Web Development",
  "Data Science",
] as const;

// Format helpers
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getTimeAgo(timestamp: string): string {
  const now = new Date();
  const time = new Date(timestamp);
  const diff = Math.floor((now.getTime() - time.getTime()) / 1000 / 60);

  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}

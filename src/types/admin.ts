// Admin Dashboard Types

export interface AdminStats {
  totalUsers: number;
  totalTeachers: number;
  totalStudents: number;
  activeSessions: number;
  totalRevenue: number;
  averageRating: number;
  completedSessions: number;
  upcomingSessions: number;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  students: number;
}

export interface UserGrowthDataPoint {
  month: string;
  students: number;
  teachers: number;
}

export interface SystemHealthItem {
  label: string;
  value: string;
  color: string;
  bg: string;
  icon: string;
}

export interface QuickAction {
  icon: string;
  label: string;
  onClick?: () => void;
}

export interface AdminDashboardState {
  stats: AdminStats | null;
  revenueData: RevenueDataPoint[];
  userGrowthData: UserGrowthDataPoint[];
  loading: boolean;
  error: string | null;
}

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { studentDashboard } from "../api/dashboard";
import type { RootState } from "./store";

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

export interface DashboardState {
  data: StudentDashboardData | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchStudentDashboard = createAsyncThunk(
  "dashboard/fetchStudentDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const data = await studentDashboard();
      if (!data) {
        return rejectWithValue("Failed to fetch dashboard data");
      }
      return data as StudentDashboardData;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch dashboard");
    }
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboard(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    setDashboardData(state, action) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStudentDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDashboard, setDashboardData } = dashboardSlice.actions;

export const selectDashboardData = (state: RootState) => state.dashboard.data;
export const selectDashboardLoading = (state: RootState) =>
  state.dashboard.loading;
export const selectDashboardError = (state: RootState) => state.dashboard.error;

export default dashboardSlice.reducer;

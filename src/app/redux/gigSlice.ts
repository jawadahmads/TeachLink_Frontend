import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getGigs } from "../api/getGigs";

export interface Subject {
  name: string;
}

export interface Language {
  id: string;
  name: string;
}

export interface Availability {
  day: string;
  slots: string[];
}

export interface Teacher {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  education: string;
  hourlyRate: number;
  experience: string;
  rating: number;
  reviewCount: number;
  totalStudents: number;
  totalHours: number;
  responseTime: number | null;
  verified: boolean;
  availability: Availability[];
  languages: Language[];
  subjects: Subject[];
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  teacherId: string;
  teacher: Teacher;
}

export interface GigInfoState {
  gigs: Gig[];
  loading: boolean;
  error: string | null;
}

const initialGigInfoState: GigInfoState = {
  gigs: [],
  loading: false,
  error: null,
};

export const fetchGigs = createAsyncThunk(
  "gigInfo/fetchGigs",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: { token: string | null } };
      const token = state.auth.token || localStorage.getItem("token");
      return await getGigs(token);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch gigs",
      );
    }
  },
);

const gigInfoSlice = createSlice({
  name: "gigInfo",
  initialState: initialGigInfoState,
  reducers: {
    setGigs(state, action: PayloadAction<Gig[]>) {
      state.gigs = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearGigs(state) {
      state.gigs = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs = action.payload;
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setGigs, setLoading, setError, clearGigs } =
  gigInfoSlice.actions;
export default gigInfoSlice.reducer;

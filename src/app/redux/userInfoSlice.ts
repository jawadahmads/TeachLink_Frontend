import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
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
  availability: Availability[];
  stripeId?: string;
}

interface Subject {
  id: string;
  name: string;
}

interface Language {
  id: string;
  name: string;
}

interface Availability {
  day: string;
  slots: string[];
}

interface UserInfoState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
}

const initialUserInfoState: UserInfoState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: initialUserInfoState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInfo | null>) {
      state.userInfo = action.payload;
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
    clearUserInfo(state) {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setUserInfo, setLoading, setError, clearUserInfo } =
  userInfoSlice.actions;
export default userInfoSlice.reducer;

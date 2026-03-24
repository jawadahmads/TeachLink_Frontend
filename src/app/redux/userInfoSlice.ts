import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserInfo, UserInfoState } from "../../types";

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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
  user: Record<string, any> | null;
  status: "loading" | "authenticated" | "unauthenticated";
};

const initialAuthState: AuthState = {
  token: null,
  user: null,
  status: "unauthenticated",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setUser<T>(state, action: PayloadAction<T | null>) {
      state.user = action.payload;
    },
    setStatus(state, action: PayloadAction<AuthState["status"]>) {
      state.status = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.status = "unauthenticated";
    },
  },
});

// export actions we can perform
export const { setToken, setUser, setStatus, logout } = authSlice.actions;
// export reducer for redux store
export default authSlice.reducer;

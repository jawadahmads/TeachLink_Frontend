import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getStripeAccountStatus } from "../api/stripeAccount";

type AuthState = {
  token: string | null;
  user: Record<string, any> | null;
  stripeAccountInfo: any;
  status: "loading" | "authenticated" | "unauthenticated";
};

const initialAuthState: AuthState = {
  token: null,
  user: null,
  stripeAccountInfo: null,
  status: "unauthenticated",
};

export const fetchStripeAccountInfo = createAsyncThunk(
  "auth/fetchStripeAccountInfo",
  async (stripeId: string, { rejectWithValue }) => {
    if (!stripeId) {
      return rejectWithValue("No stripe ID found in user");
    }

    try {
      const response = await getStripeAccountStatus(stripeId);
      return response;
    } catch (error) {
      return rejectWithValue("Failed to fetch Stripe account info");
    }
  },
);

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
      state.stripeAccountInfo = null;
      state.status = "unauthenticated";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStripeAccountInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStripeAccountInfo.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.stripeAccountInfo = action.payload;
      })
      .addCase(fetchStripeAccountInfo.rejected, (state) => {
        state.status = "authenticated";
      });
  },
});

// export actions we can perform
export const { setToken, setUser, setStatus, logout } = authSlice.actions;
// export reducer for redux store
export default authSlice.reducer;

import authReducer from "./authSlice";
import process from "process";
import userInfoReducer from "./userInfoSlice";
import gigInfoReducer from "./gigSlice";

import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    info: userInfoReducer,
    gig: gigInfoReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // disable strict serializable checks for e.g. non-serializable values (tokens etc.)
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

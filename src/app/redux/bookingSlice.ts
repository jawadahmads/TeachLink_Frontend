import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { BookingData, BookingState } from "../../types";

// Helper to load from localStorage for persistence across Stripe redirect
const loadStoredBooking = (): BookingData | null => {
  try {
    const stored = localStorage.getItem("pendingBooking");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to load booking from localStorage", error);
    return null;
  }
};

const initialState: BookingState = {
  pendingBooking: loadStoredBooking(),
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action: PayloadAction<BookingData>) => {
      state.pendingBooking = action.payload;
      localStorage.setItem("pendingBooking", JSON.stringify(action.payload));
    },
    clearBooking: (state) => {
      state.pendingBooking = null;
      localStorage.removeItem("pendingBooking");
    },
  },
});

export const { setBooking, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;

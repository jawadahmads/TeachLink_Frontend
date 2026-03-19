import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingData {
  selectedDay: string;
  selectedTime: string;
  subject: string;
  notes?: string;
  studentName: string;
  studentEmail: string;
  teacherId: string;
  teacherName: string;
  hourlyRate: number;
  platformFee: number;
  grandTotal: number;
  sessionDuration: string;
  bookingDate: string;
  studentId: string;
}

interface BookingState {
  pendingBooking: BookingData | null;
}

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

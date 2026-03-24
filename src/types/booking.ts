// Booking Types

export interface BookingFormData {
  selectedDate: string;
  selectedDay: string;
  selectedTime: string;
  subject: string;
  notes: string;
  studentName: string;
  studentEmail: string;
  agreeToTerms: boolean;
}

export interface BookingData extends BookingFormData {
  studentId: string;
  teacherId: string;
  teacherName: string;
  hourlyRate: number;
  platformFee: number;
  grandTotal: number;
  sessionDuration: string;
  bookingDate: string;
}

export interface BookingState {
  pendingBooking: BookingData | null;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  teacherId?: string;
}

export interface WeeklySchedule {
  [day: string]: TimeSlot[];
}

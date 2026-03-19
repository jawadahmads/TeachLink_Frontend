import axios from "axios";
import { toast } from "sonner";
import { store } from "../redux/store";

const API_URL_V1 = "http://localhost:4002/v1";

type checkoutFormData = {
  selectedDay:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";

  selectedTime: string; // "HH:mm"

  subject: string;
  notes?: string;

  studentName: string;
  studentEmail: string;

  agreeToTerms: boolean;

  teacherId: string;
  teacherName: string;

  hourlyRate: number;
  platformFee: number;
  grandTotal: number;

  sessionDuration: string; // "60 minutes"

  bookingDate: string; // ISO string
};

export async function createCheckout<T>(checkoutFormData: T) {
  const token = store.getState().auth.token;

  try {
    const response = await axios.post(
      `${API_URL_V1}/stripe/create-checkout-session`,
      { checkoutFormData },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    toast.error("error creating checkout");
    console.error("error checkout:", error);
  }
}

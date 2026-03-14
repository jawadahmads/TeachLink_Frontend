import axios from "axios";
import { toast } from "sonner";

const API_URL_V1 = "http://localhost:4002/v1";

export const getGigs = async (token: string | null) => {
  try {
    const response = await axios.get(`${API_URL_V1}/get-gigs`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Error fetching gigs");
    console.error("Gig error:", error);
    throw error;
  }
};

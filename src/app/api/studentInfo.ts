import axios from "axios";
import { toast } from "sonner";
import { store } from "../redux/store";

const API_URL_V1 = "http://localhost:4002/v1";

export const studentInfo = async (studentId: String) => {
  const token = store.getState().auth.token;
  try {
    const response = await axios.get(
      `${API_URL_V1}/student-info?studentId=${studentId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // send cookies / credentials
      },
    );

    return response.data;
  } catch (error) {
    console.error("User info error:", error);
    toast.error("Failed to retrieve user information.");
  }
};

import axios from "axios";
import { store } from "../redux/store";
import { toast } from "sonner";

const API_URL_V1 = "http://localhost:4002/v1";

export const getTeacherInfoById = async (teacherId: string) => {
  const token = store.getState().auth.token;
  try {
    const response = await axios.get(
      `${API_URL_V1}/teacher-info?teacherId=${teacherId}`,
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
    console.error("User info error:", error);
    toast.error("Failed to retrieve user information.");
  }
};

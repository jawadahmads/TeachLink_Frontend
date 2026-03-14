import axios from "axios";
import { toast } from "sonner";
import { store } from "../redux/store";

const API_URL_V1 = "http://localhost:4002/v1";

export const userInfo = async () => {
  const token = store.getState().auth.token;
  const userId = store.getState().auth.user?.id;
  try {
    const response = await axios.get(
      `${API_URL_V1}/user-info?userId=${userId}`,
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

export const getUserInfoById = async (userId: string) => {
  const token = store.getState().auth.token;
  try {
    const response = await axios.get(
      `${API_URL_V1}/user-info?userId=${userId}`,
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

import axios from "axios";
import { toast } from "sonner";
import { store } from "../redux/store";
import { logout as clearAuth } from "../redux/authSlice";
import { clearUserInfo } from "../redux/userInfoSlice";
import { clearGigs } from "../redux/gigSlice";

const API_URL_V1 = "http://localhost:4002/v1";

export interface LogoutResponse {
  message: string;
}

export const logout = async (): Promise<LogoutResponse> => {
  try {
    const response = await axios.post(
      `${API_URL_V1}/logout`,
      {},
      {
        withCredentials: true,
      },
    );
    store.dispatch(clearAuth());
    store.dispatch(clearUserInfo());
    store.dispatch(clearGigs());
    localStorage.removeItem("token");
    toast.success("Logout successful!");
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

import axios from "axios";
import { toast } from "sonner";

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
    toast.success("Logout successful!");
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

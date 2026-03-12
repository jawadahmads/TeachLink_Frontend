import axios from "axios";
import { toast } from "sonner";
import { store } from "../redux/store";

const API_URL_V1 = "http://localhost:4002/v1";

export async function updateProfile<T extends object>(data: T) {
  const token = store.getState().auth.token;
  console.log(token);

  try {
    const response = await axios.patch(`${API_URL_V1}/update-profile`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Update error:", error);
    toast.error("Update failed. Please check your input.");
    throw error;
  }
}

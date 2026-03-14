import axios from "axios";
import { type LoginForm } from "../schema/loginSchema";
import { toast } from "sonner";

const API_URL_V1 = "http://localhost:4002/v1";

export const login = async ({
  userType,
  email,
  password,
  remember,
}: LoginForm) => {
  try {
    const response = await axios.post(
      `${API_URL_V1}/login`,
      { userType, email, password, remember },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // send cookies / credentials
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Login failed. Please check your credentials.");
  }
};

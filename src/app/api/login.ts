import axios from "axios";
import { type LoginForm } from "../schema/loginSchema";

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
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

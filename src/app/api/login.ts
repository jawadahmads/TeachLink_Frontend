import axios from "axios";
import { type LoginForm } from "../schema/loginSchema";
import { toast } from "sonner";
import { UNSAFE_DataWithResponseInit } from "react-router";

const API_URL_V1 = "http://localhost:4002/v1";

export const login = async ({
  userType,
  email,
  password,
  remember,
}: LoginForm) => {
  let response;
  try {
    response = await axios.post(
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
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || error.message);
    } else {
      toast.error("An unexpected error occurred");
    }
    console.error("Login error:", error);
  }
};

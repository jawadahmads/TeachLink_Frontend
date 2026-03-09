import axios from "axios";
import { type SignupForm } from "../schema/signUpSchema";

const API_URL_V1 = "http://localhost:4002/v1";

export const signup = async ({
  userType,
  name,
  email,
  password,
  terms,
}: SignupForm) => {
  try {
    const response = await axios.post(`${API_URL_V1}/signup`, {
      userType,
      name,
      email,
      password,
      terms,
    });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

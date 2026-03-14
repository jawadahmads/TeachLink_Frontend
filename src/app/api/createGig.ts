import axios from "axios";
import type { GigPublishFormValues } from "../pages/publishGig/hooks/usePublishGig";
import { toast } from "sonner";
import { store } from "../redux/store";

const API_URL_V1 = "http://localhost:4002/v1";

export const createGig = async ({
  description,
  teacherId,
  title,
}: GigPublishFormValues) => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.post(
      `${API_URL_V1}/create-gig`,
      {
        description,
        teacherId,
        title,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      },
    );

    toast.success("successfull gig createtion");
    return response.data;
  } catch (error) {
    toast.error("error creating gig");
    console.error("Gig error:", error);
  }
};

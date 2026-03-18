import axios from "axios";
import { store } from "../redux/store";
import { toast } from "sonner";

const API_URL_V1 = "http://localhost:4002/v1";

export const createStripeAccount = async () => {
  const token = store.getState().auth.token;
  try {
    const response = await axios.post(
      `${API_URL_V1}/stripe/create-account`,
      {
        userId: "000",
        email: "mail",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      },
    );

    if (response.data.url) {
      window.location.href = response.data.url;
    }
    toast.success("Stripe account created successfully!");
    return response.data;
  } catch (error) {
    console.error("Create Stripe account error:", error);
    toast.error("Failed to create Stripe account.");
    throw error;
  }
};

// export const updateStripeAccountStatus = async (
//   status: "active" | "inactive",
//   accountId: string,
// ) => {
//   const token = store.getState().auth.token;
//   try {
//     const response = await axios.patch(
//       `${API_URL_V1}/stripe/update-status`,
//       { status },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           "stripe-account-id": accountId,
//         },
//         withCredentials: true,
//       },
//     );

//     toast.success(
//       `Stripe account ${status === "active" ? "activated" : "deactivated"} successfully!`,
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Update Stripe account status error:", error);
//     toast.error("Failed to update Stripe account status.");
//     throw error;
//   }
// };

export const getStripeAccountStatus = async (accountId: string) => {
  const token = store.getState().auth.token;

  try {
    const response = await axios.get(
      `${API_URL_V1}/stripe/account-status?accountId=${accountId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "stripe-account-id": accountId,
        },
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Get Stripe account status error:", error);
    toast.error("Failed to retrieve Stripe account status.");
  }
};

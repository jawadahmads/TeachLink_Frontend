import { useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import {
  setStatus,
  setToken,
  setUser,
  fetchStripeAccountInfo,
} from "../../redux/authSlice";
import { refreshToken } from "../../api/refresh";

export function AutoRefresh({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  const callForRefreshToken = async () => {
    try {
      const response = await refreshToken();
      // console.log("Refresh response:", response);
      // console.log("Stripe ID from refresh:", response.user?.stripeId);
      dispatch(setToken(response.accessToken));
      dispatch(setUser(response.user));
      dispatch(setStatus("authenticated"));
      const stripeResult = await dispatch(
        fetchStripeAccountInfo(response.user?.stripeId as string),
      );
      // console.log("Stripe account status from refresh:", stripeResult.payload);
    } catch (error) {
      console.error("Refresh failed:", error);
      dispatch(setStatus("unauthenticated"));
    }
  };

  useEffect(() => {
    callForRefreshToken();
  }, []);
  return <>{children}</>;
}

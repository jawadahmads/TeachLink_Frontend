import { useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import { setStatus, setToken, setUser } from "../../redux/authSlice";
import { refreshToken } from "../../api/refresh";

export function AutoRefresh() {
  const dispatch = useAppDispatch();

  const callForRefreshToken = async () => {
    try {
      const response = await refreshToken(); // TypeScript knows its type
      dispatch(setToken(response.accessToken));
      dispatch(setUser(response.user));
    } catch (error) {
      console.error("Refresh failed:", error);
      dispatch(setStatus("failed"));
    } finally {
      dispatch(setStatus("idle"));
    }
  };

  useEffect(() => {
    callForRefreshToken();
  }, []);
  return <></>;
}

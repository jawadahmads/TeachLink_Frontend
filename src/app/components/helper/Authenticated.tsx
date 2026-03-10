import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../redux/store";

export default function IsAuthenticated() {
  const { token, status } = useAppSelector((state) => state.auth);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

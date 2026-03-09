import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../redux/store";

export default function IsAuthenticated() {
  const selector = useAppSelector((state) => state.auth);
  const token = selector.token;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // renders child routes
  return <Outlet />;
}

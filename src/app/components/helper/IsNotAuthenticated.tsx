import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../redux/store";

export default function IsNotAuthenticated() {
  const selector = useAppSelector((state) => state.auth);
  const role = selector.user?.role.toLowerCase();
  const token = selector.token;

  if (token) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }

  // renders child routes
  return <Outlet />;
}

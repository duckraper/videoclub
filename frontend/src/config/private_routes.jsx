import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { auth_state } from "../app/slices/auth.slice";

const PrivateRoutes = () => {
  const { authenticated } = useSelector(auth_state);

  return authenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoutes;

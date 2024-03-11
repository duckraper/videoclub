import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { auth_state } from "../app/slices/Auth.slice";

export const roles = {
  admin: "Administrador",
  dep: "Dependiente",
};

const RolesRoutes = ({ roles, children }) => {
  const { authenticated, user } = useSelector(auth_state);

  if (!authenticated) {
    <Navigate to="/" replace />;
  }

  return roles.includes(user.groups[0]) ? (
    <>{children}</>
  ) : (
    <Navigate to="/admini" replace />
  );
};

export default RolesRoutes;

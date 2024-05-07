import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isActivate }) => {
  if (!isActivate) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;

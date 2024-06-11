import { Navigate, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ isActivate }) => {
  if (!isActivate) {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;

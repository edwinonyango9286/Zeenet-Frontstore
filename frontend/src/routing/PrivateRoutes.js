import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export const PrivateRoutes = ({ children }) => {
  const location = useLocation();

  const token = Cookies.get("token");
  
  return token !== undefined ? (
    children
  ) : (
    <Navigate to={"/signin"} state={{ from: location }} replace />
  );
};

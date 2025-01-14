import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export const PrivateRoutes = ({ children }) => {
  const location = useLocation();

  const accessToken = Cookies.get("accessToken");
  
  return accessToken !== undefined ? (
    children
  ) : (
    <Navigate to={"/signin"} state={{ from: location }} replace />
  );
};

import { Navigate, useLocation } from "react-router-dom";


export const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"));
  return getTokenFromLocalStorage?.token !== undefined ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};


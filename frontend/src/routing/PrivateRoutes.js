import { Navigate, useLocation } from "react-router-dom";


export const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const customer = JSON.parse(localStorage.getItem("customer"));
  return customer?.token !== undefined ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};


import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
  const customer = JSON.parse(localStorage.getItem("user"));
  return customer?.token === undefined ? (
    children
  ) : (
    <Navigate to={"/"} replace={true} />
  );
};

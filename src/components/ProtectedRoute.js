import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../Util";

const ProtectedRoute = ({ children }) => {
  const isExpired = isTokenExpired();
  console.log("isTokenExpired::"+isExpired);
  return isExpired ? <Navigate to="/login" /> : children;
};

export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const expiresAt = useSelector((state) => state.auth.expiresAt);
  if (!expiresAt) return <Navigate to="/login" />;
  const isTokenExpired = new Date().getTime() > parseInt(expiresAt, 10);
  console.log("isTokenExpired::"+isTokenExpired);
  return isTokenExpired ? <Navigate to="/login" /> : children;
};

export default ProtectedRoute;

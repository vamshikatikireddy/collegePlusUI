import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoute: React.FC = () => {
  const isAuthResolved = useAuthStore((s) => s.isAuthResolved);
  const isAuthenticated = useAuthStore(
    (s) => s.accessToken !== null || s.user !== null,
  );

  if (!isAuthResolved) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

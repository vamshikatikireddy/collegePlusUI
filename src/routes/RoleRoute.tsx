import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

interface RoleRouteProps {
  roles: Array<"student" | "admin">;
}

const RoleRoute: React.FC<RoleRouteProps> = ({ roles }) => {
  const userRole = useAuthStore((s) => s.user?.role);
  const fallbackPath = userRole === "admin" ? "/admin/dashboard" : "/dashboard";

  if (!userRole || !roles.includes(userRole)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};

export default RoleRoute;

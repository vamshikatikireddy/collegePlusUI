import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Calendar from "../pages/Calendar";
import Courses from "../pages/Courses";
import Jobs from "../pages/Jobs";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import Leave from "../pages/Leave";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {/* Default route */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leave" element={<Leave />} />

          {/* Protected fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Route>

      {/* Global fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;

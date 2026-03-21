import React from "react";
import {
  Box,
  Typography,
  Stack,
  Avatar,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import {
  EmailOutlined,
  SchoolRounded,
  BadgeOutlined,
  CalendarTodayOutlined,
  LogoutRounded,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import Card from "../components/common/Card";
import { CircularProgressBar } from "../components/common/ProgressBar";
import useAuthStore from "../store/authStore";
import useAuth from "../hooks/useAuth";

const Profile: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const profileData = {
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@college.edu",
    studentId: "STU-2024-0042",
    department: "Computer Science",
    semester: "6th Semester",
    joinedDate: "2023-07-15",
    gpa: 3.72,
    attendancePercent: 87,
    coursesCompleted: 28,
    totalCourses: 40,
  };

  const infoItems = [
    { icon: <EmailOutlined />, label: "Email", value: profileData.email },
    {
      icon: <BadgeOutlined />,
      label: "Student ID",
      value: profileData.studentId,
    },
    {
      icon: <SchoolRounded />,
      label: "Department",
      value: profileData.department,
    },
    {
      icon: <CalendarTodayOutlined />,
      label: "Joined",
      value: dayjs(profileData.joinedDate).format("MMMM YYYY"),
    },
  ];

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      id="profile-page"
      sx={{ p: { xs: 2, sm: 3 }, maxWidth: 600, mx: "auto" }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Profile
      </Typography>

      {/* Profile header card */}
      <Card
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        sx={{ mb: 2.5, textAlign: "center", py: 4 }}
      >
        <Avatar
          sx={{
            width: 88,
            height: 88,
            fontSize: "2rem",
            fontWeight: 700,
            mx: "auto",
            mb: 2,
            background: "linear-gradient(135deg, #7C4DFF 0%, #00E5FF 100%)",
            boxShadow: "0 8px 32px rgba(124,77,255,0.3)",
          }}
        >
          {profileData.name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {profileData.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          {profileData.department}
        </Typography>
        <Chip
          label={profileData.semester}
          size="small"
          sx={{
            bgcolor: "rgba(124,77,255,0.12)",
            color: "#B388FF",
            fontWeight: 600,
          }}
        />
      </Card>

      {/* Stats row */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 2.5 }}
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card sx={{ flex: 1, textAlign: "center", py: 2.5 }}>
          <CircularProgressBar
            value={profileData.attendancePercent}
            size={64}
            color="#69F0AE"
          />
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", mt: 1, display: "block" }}
          >
            Attendance
          </Typography>
        </Card>
        <Card sx={{ flex: 1, textAlign: "center", py: 2.5 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#7C4DFF" }}>
            {profileData.gpa}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", mt: 0.5, display: "block" }}
          >
            GPA
          </Typography>
        </Card>
        <Card sx={{ flex: 1, textAlign: "center", py: 2.5 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#00E5FF" }}>
            {profileData.coursesCompleted}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", mt: 0.5, display: "block" }}
          >
            Courses Done
          </Typography>
        </Card>
      </Stack>

      {/* Info card */}
      <Card
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        sx={{ mb: 2.5 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Details
        </Typography>
        <Stack
          spacing={2}
          divider={<Divider sx={{ borderColor: "rgba(148,163,184,0.06)" }} />}
        >
          {infoItems.map((item) => (
            <Stack
              key={item.label}
              direction="row"
              alignItems="center"
              spacing={2}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 1.5,
                  bgcolor: "rgba(124,77,255,0.1)",
                  color: "#B388FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "& .MuiSvgIcon-root": { fontSize: 18 },
                }}
              >
                {item.icon}
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {item.label}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {item.value}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Card>

      {/* Logout */}
      <Button
        id="profile-logout-btn"
        fullWidth
        variant="outlined"
        startIcon={<LogoutRounded />}
        disabled={isLoggingOut}
        onClick={async () => {
          setIsLoggingOut(true);
          await logout();
        }}
        sx={{
          py: 1.4,
          borderColor: "rgba(255,82,82,0.3)",
          color: "#FF8A80",
          "&:hover": {
            borderColor: "#FF5252",
            bgcolor: "rgba(255,82,82,0.06)",
          },
        }}
      >
        Sign Out
      </Button>
    </Box>
  );
};

export default Profile;

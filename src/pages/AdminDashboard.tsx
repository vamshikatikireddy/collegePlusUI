import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import {
  AdminPanelSettingsRounded,
  GroupRounded,
  MenuBookRounded,
  AnalyticsRounded,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import Card from "../components/common/Card";
import useAuthStore from "../store/authStore";

const AdminDashboard: React.FC = () => {
  const user = useAuthStore((s) => s.user);

  const adminCards = [
    {
      title: "Manage Students",
      desc: "Create, update, and deactivate student records.",
      icon: <GroupRounded />,
    },
    {
      title: "Manage Courses",
      desc: "Add course plans, instructors, and visibility rules.",
      icon: <MenuBookRounded />,
    },
    {
      title: "Analytics",
      desc: "View attendance trends and dashboard usage metrics.",
      icon: <AnalyticsRounded />,
    },
  ];

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      sx={{ p: { xs: 2, sm: 3 }, maxWidth: 980, mx: "auto" }}
      id="admin-dashboard-page"
    >
      <Card sx={{ mb: 2.5 }}>
        <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1 }}>
          <AdminPanelSettingsRounded sx={{ color: "#FFB74D" }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Admin Dashboard
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Welcome {user?.name || "Admin"}. You can control student-facing data from here.
        </Typography>
      </Card>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
          gap: 2,
        }}
      >
        {adminCards.map((item) => (
          <Card key={item.title} hoverable>
            <Stack spacing={1.5}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFB74D",
                  bgcolor: "rgba(255,183,77,0.14)",
                }}
              >
                {item.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {item.desc}
              </Typography>
              <Button variant="outlined" size="small" sx={{ alignSelf: "flex-start" }}>
                Open
              </Button>
            </Stack>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AdminDashboard;

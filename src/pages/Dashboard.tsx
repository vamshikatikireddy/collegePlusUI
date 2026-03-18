import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Avatar,
  Chip,
} from '@mui/material';
import {
  DashboardRounded,
  SchoolRounded,
  VerifiedUserRounded,
  TrendingUpRounded,
  AssignmentRounded,
  NotificationsActiveRounded,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import Card from '../components/common/Card';
import { CircularProgressBar } from '../components/common/ProgressBar';
import useAuthStore from '../store/authStore';

const Dashboard: React.FC = () => {
  const user = useAuthStore((s) => s.user);

  const greeting = (() => {
    const hour = dayjs().hour();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  const stats = [
    { label: 'Attendance', value: 87, color: '#69F0AE' },
    { label: 'Courses', value: 5, color: '#7C4DFF', isCount: true },
    { label: 'Pending', value: 3, color: '#FFB74D', isCount: true },
  ];

  const quickCards = [
    {
      icon: <DashboardRounded />,
      title: 'Dashboard',
      desc: 'Your academic overview',
      color: '#7C4DFF',
    },
    {
      icon: <VerifiedUserRounded />,
      title: 'Secure Session',
      desc: 'JWT token active',
      color: '#00E5FF',
    },
    {
      icon: <SchoolRounded />,
      title: 'College Hub',
      desc: 'Resources & tools',
      color: '#69F0AE',
    },
  ];

  const recentActivity = [
    {
      icon: <AssignmentRounded />,
      title: 'Assignment Submitted',
      desc: 'CS201 — Data Structures Lab 4',
      time: '2 hours ago',
      color: '#7C4DFF',
    },
    {
      icon: <TrendingUpRounded />,
      title: 'Grade Published',
      desc: 'CS302 — Operating Systems Quiz',
      time: '5 hours ago',
      color: '#69F0AE',
    },
    {
      icon: <NotificationsActiveRounded />,
      title: 'Schedule Update',
      desc: 'CS301 class moved to Room 204',
      time: '1 day ago',
      color: '#FFB74D',
    },
  ];

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      id="dashboard-page"
      sx={{ p: { xs: 2, sm: 3 }, maxWidth: 900, mx: 'auto' }}
    >
      {/* Welcome card */}
      <Card
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        sx={{ mb: 3, py: 4 }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          alignItems={{ sm: 'center' }}
        >
          <Avatar
            sx={{
              width: 72,
              height: 72,
              fontSize: '1.8rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #7C4DFF 0%, #00E5FF 100%)',
            }}
          >
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              {greeting}, {user?.name || 'User'} 👋
            </Typography>
            <Typography variant="subtitle1">
              Here's what's happening with your academics today
            </Typography>
          </Box>

          <Chip
            icon={<VerifiedUserRounded sx={{ fontSize: 16 }} />}
            label="Authenticated"
            color="success"
            variant="outlined"
            size="small"
            sx={{ fontWeight: 600, alignSelf: 'flex-start' }}
          />
        </Stack>
      </Card>

      {/* Stats row */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 3 }}
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {stats.map((stat) => (
          <Card key={stat.label} sx={{ flex: 1, textAlign: 'center', py: 2.5 }}>
            {stat.isCount ? (
              <Typography variant="h3" sx={{ fontWeight: 800, color: stat.color }}>
                {stat.value}
              </Typography>
            ) : (
              <CircularProgressBar value={stat.value} size={64} color={stat.color} />
            )}
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', mt: 1, display: 'block' }}
            >
              {stat.label}
            </Typography>
          </Card>
        ))}
      </Stack>

      {/* Quick cards grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
          gap: 2,
          mb: 3,
        }}
      >
        {quickCards.map((card, i) => (
          <Card
            key={card.title}
            hoverable
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: `${card.color}18`,
                color: card.color,
                mb: 2,
              }}
            >
              {card.icon}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
              {card.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {card.desc}
            </Typography>
          </Card>
        ))}
      </Box>

      {/* Recent activity */}
      <Typography
        component={motion.h6}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        variant="h6"
        sx={{ fontWeight: 600, mb: 2 }}
      >
        Recent Activity
      </Typography>
      <Stack spacing={1.5}>
        {recentActivity.map((item, i) => (
          <Card
            key={item.title}
            component={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 + i * 0.08 }}
            sx={{ p: 2 }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: `${item.color}15`,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  '& .MuiSvgIcon-root': { fontSize: 20 },
                }}
              >
                {item.icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {item.desc}
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', flexShrink: 0 }}>
                {item.time}
              </Typography>
            </Stack>
          </Card>
        ))}
      </Stack>

      {/* Footer */}
      <Typography
        component={motion.p}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        variant="body2"
        align="center"
        sx={{ mt: 4, mb: 2, color: 'text.secondary' }}
      >
        Session started {dayjs().format('MMM D, YYYY · h:mm A')}
      </Typography>
    </Box>
  );
};

export default Dashboard;

import React from 'react';
import { Box, Typography, Stack, Chip, IconButton } from '@mui/material';
import {
  InfoOutlined,
  WarningAmberRounded,
  CheckCircleOutlineRounded,
  ErrorOutlineRounded,
  DoneAllRounded,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Card from '../components/common/Card';

dayjs.extend(relativeTime);

const sampleNotifications = [
  {
    id: '1',
    title: 'Assignment Submitted',
    message: 'Your CS201 assignment has been submitted successfully.',
    type: 'success' as const,
    isRead: false,
    createdAt: dayjs().subtract(10, 'minute').toISOString(),
  },
  {
    id: '2',
    title: 'Exam Schedule Updated',
    message: 'Mid-term exam for CS301 has been rescheduled to March 20.',
    type: 'warning' as const,
    isRead: false,
    createdAt: dayjs().subtract(1, 'hour').toISOString(),
  },
  {
    id: '3',
    title: 'Grade Published',
    message: 'Your grade for CS302 Lab 3 is now available.',
    type: 'info' as const,
    isRead: true,
    createdAt: dayjs().subtract(3, 'hour').toISOString(),
  },
  {
    id: '4',
    title: 'Attendance Warning',
    message: 'Your attendance in CS205 is below 75%. Please attend upcoming classes.',
    type: 'error' as const,
    isRead: false,
    createdAt: dayjs().subtract(1, 'day').toISOString(),
  },
  {
    id: '5',
    title: 'New Job Posted',
    message: 'A new internship at TechCorp Inc. matches your profile.',
    type: 'info' as const,
    isRead: true,
    createdAt: dayjs().subtract(2, 'day').toISOString(),
  },
];

const typeConfig = {
  info: { icon: <InfoOutlined />, color: '#00E5FF' },
  warning: { icon: <WarningAmberRounded />, color: '#FFB74D' },
  success: { icon: <CheckCircleOutlineRounded />, color: '#69F0AE' },
  error: { icon: <ErrorOutlineRounded />, color: '#FF5252' },
};

const Notifications: React.FC = () => {
  const unreadCount = sampleNotifications.filter((n) => !n.isRead).length;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      id="notifications-page"
      sx={{ p: { xs: 2, sm: 3 }, maxWidth: 600, mx: 'auto' }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Chip
              label={`${unreadCount} New`}
              size="small"
              color="error"
              sx={{ fontWeight: 600, fontSize: '0.7rem' }}
            />
          )}
        </Stack>

        <IconButton
          id="mark-all-read-btn"
          sx={{ color: 'text.secondary' }}
          title="Mark all as read"
        >
          <DoneAllRounded />
        </IconButton>
      </Stack>

      <AnimatePresence>
        <Stack spacing={1.5}>
          {sampleNotifications.map((notif, i) => {
            const config = typeConfig[notif.type];

            return (
              <Card
                key={notif.id}
                component={motion.div}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                sx={{
                  p: 2,
                  borderLeft: `3px solid ${config.color}`,
                  opacity: notif.isRead ? 0.6 : 1,
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 1.5,
                      bgcolor: `${config.color}15`,
                      color: config.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      '& .MuiSvgIcon-root': { fontSize: 18 },
                    }}
                  >
                    {config.icon}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {notif.title}
                      </Typography>
                      {!notif.isRead && (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: config.color,
                            flexShrink: 0,
                            ml: 1,
                          }}
                        />
                      )}
                    </Stack>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', display: 'block', mt: 0.3 }}
                    >
                      {notif.message}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', mt: 0.8, display: 'block', fontSize: '0.68rem' }}
                    >
                      {dayjs(notif.createdAt).fromNow()}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            );
          })}
        </Stack>
      </AnimatePresence>
    </Box>
  );
};

export default Notifications;

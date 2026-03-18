import React, { useState } from 'react';
import { Box, Typography, Stack, IconButton, Chip } from '@mui/material';
import {
  ChevronLeftRounded,
  ChevronRightRounded,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import Card from '../components/common/Card';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const sampleEvents = [
  { date: 15, title: 'Mid-Term Exam', type: 'exam', color: '#FF5252' },
  { date: 8, title: 'Assignment Due', type: 'assignment', color: '#FFB74D' },
  { date: 22, title: 'Guest Lecture', type: 'event', color: '#7C4DFF' },
  { date: 28, title: 'Holiday', type: 'holiday', color: '#69F0AE' },
  { date: 5, title: 'Lab Session', type: 'class', color: '#00E5FF' },
  { date: 18, title: 'Project Review', type: 'assignment', color: '#FFB74D' },
];

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDay = startOfMonth.day();
  const daysInMonth = endOfMonth.date();

  const prev = () => setCurrentDate((d) => d.subtract(1, 'month'));
  const next = () => setCurrentDate((d) => d.add(1, 'month'));

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const today = dayjs();
  const isCurrentMonth =
    currentDate.month() === today.month() && currentDate.year() === today.year();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      id="calendar-page"
      sx={{ p: { xs: 2, sm: 3 }, maxWidth: 600, mx: 'auto' }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Calendar
      </Typography>

      <Card sx={{ mb: 3 }}>
        {/* Month navigation */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <IconButton onClick={prev} sx={{ color: 'text.secondary' }}>
            <ChevronLeftRounded />
          </IconButton>
          <AnimatePresence mode="wait">
            <Typography
              key={currentDate.format('YYYY-MM')}
              component={motion.h6}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              variant="h6"
              sx={{ fontWeight: 600 }}
            >
              {currentDate.format('MMMM YYYY')}
            </Typography>
          </AnimatePresence>
          <IconButton onClick={next} sx={{ color: 'text.secondary' }}>
            <ChevronRightRounded />
          </IconButton>
        </Stack>

        {/* Day headers */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 0.5,
            mb: 1,
          }}
        >
          {DAYS.map((day) => (
            <Typography
              key={day}
              variant="caption"
              align="center"
              sx={{ color: 'text.secondary', fontWeight: 600, py: 0.5 }}
            >
              {day}
            </Typography>
          ))}
        </Box>

        {/* Calendar grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 0.5,
          }}
        >
          {calendarDays.map((day, i) => {
            const event = day ? sampleEvents.find((e) => e.date === day) : null;
            const isToday = isCurrentMonth && day === today.date();

            return (
              <Box
                key={i}
                sx={{
                  aspectRatio: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  cursor: day ? 'pointer' : 'default',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  ...(isToday && {
                    background: 'linear-gradient(135deg, #7C4DFF 0%, #651FFF 100%)',
                    boxShadow: '0 4px 16px rgba(124,77,255,0.35)',
                  }),
                  ...(day &&
                    !isToday && {
                      '&:hover': {
                        bgcolor: 'rgba(124,77,255,0.1)',
                      },
                    }),
                }}
              >
                {day && (
                  <>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: isToday ? 700 : 400,
                        color: isToday ? '#fff' : 'text.primary',
                        fontSize: '0.85rem',
                      }}
                    >
                      {day}
                    </Typography>
                    {event && (
                      <Box
                        sx={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          bgcolor: event.color,
                          mt: 0.3,
                        }}
                      />
                    )}
                  </>
                )}
              </Box>
            );
          })}
        </Box>
      </Card>

      {/* Upcoming events */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Events This Month
      </Typography>
      <Stack spacing={1.5}>
        {sampleEvents
          .sort((a, b) => a.date - b.date)
          .map((event) => (
            <Card key={event.date + event.title} hoverable sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    bgcolor: `${event.color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ fontWeight: 700, color: event.color, fontSize: '0.9rem' }}>
                    {event.date}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {event.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {currentDate.date(event.date).format('dddd, MMMM D')}
                  </Typography>
                </Box>
                <Chip
                  label={event.type}
                  size="small"
                  sx={{
                    bgcolor: `${event.color}18`,
                    color: event.color,
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    textTransform: 'capitalize',
                  }}
                />
              </Stack>
            </Card>
          ))}
      </Stack>
    </Box>
  );
};

export default Calendar;

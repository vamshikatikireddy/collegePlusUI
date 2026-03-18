import React from 'react';
import { Box, Typography, Stack, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import Card from '../components/common/Card';
import { LinearProgressBar } from '../components/common/ProgressBar';

const sampleCourses = [
  {
    id: '1',
    name: 'Data Structures & Algorithms',
    code: 'CS201',
    instructor: 'Dr. Sarah Johnson',
    progress: 72,
    credits: 4,
    color: '#7C4DFF',
    schedule: 'Mon, Wed, Fri — 9:00 AM',
  },
  {
    id: '2',
    name: 'Database Management Systems',
    code: 'CS301',
    instructor: 'Prof. Michael Lee',
    progress: 58,
    credits: 3,
    color: '#00E5FF',
    schedule: 'Tue, Thu — 11:00 AM',
  },
  {
    id: '3',
    name: 'Operating Systems',
    code: 'CS302',
    instructor: 'Dr. Priya Sharma',
    progress: 85,
    credits: 4,
    color: '#69F0AE',
    schedule: 'Mon, Wed — 2:00 PM',
  },
  {
    id: '4',
    name: 'Web Technologies',
    code: 'CS205',
    instructor: 'Prof. Alex Chen',
    progress: 45,
    credits: 3,
    color: '#FFB74D',
    schedule: 'Tue, Thu — 3:00 PM',
  },
  {
    id: '5',
    name: 'Machine Learning',
    code: 'CS401',
    instructor: 'Dr. Emily Davis',
    progress: 30,
    credits: 4,
    color: '#FF5252',
    schedule: 'Mon, Wed, Fri — 11:00 AM',
  },
];

const Courses: React.FC = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      id="courses-page"
      sx={{ p: { xs: 2, sm: 3 }, maxWidth: 700, mx: 'auto' }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          My Courses
        </Typography>
        <Chip
          label={`${sampleCourses.length} Enrolled`}
          size="small"
          sx={{
            bgcolor: 'rgba(124,77,255,0.12)',
            color: '#B388FF',
            fontWeight: 600,
          }}
        />
      </Stack>

      <Stack spacing={2}>
        {sampleCourses.map((course, i) => (
          <Card
            key={course.id}
            hoverable
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: `${course.color}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Typography sx={{ fontWeight: 800, color: course.color, fontSize: '0.75rem' }}>
                  {course.code}
                </Typography>
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.3 }}>
                  {course.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {course.instructor} · {course.credits} Credits
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', display: 'block', mt: 0.3 }}
                >
                  {course.schedule}
                </Typography>

                <Box sx={{ mt: 1.5 }}>
                  <LinearProgressBar
                    value={course.progress}
                    color={course.color}
                    label="Completion"
                  />
                </Box>
              </Box>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Courses;

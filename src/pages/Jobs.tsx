import React from 'react';
import { Box, Typography, Stack, Chip, Button } from '@mui/material';
import {
  LocationOnOutlined,
  WorkOutlineRounded,
  AccessTimeRounded,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import Card from '../components/common/Card';

const sampleJobs = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'TechCorp Inc.',
    location: 'Remote',
    type: 'internship' as const,
    salary: '$2,000/month',
    deadline: '2026-04-15',
    tags: ['React', 'TypeScript', 'CSS'],
    isApplied: false,
  },
  {
    id: '2',
    title: 'Data Analyst',
    company: 'DataViz Solutions',
    location: 'New York, NY',
    type: 'full-time' as const,
    salary: '$75,000/year',
    deadline: '2026-04-01',
    tags: ['Python', 'SQL', 'Tableau'],
    isApplied: true,
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Creative Labs',
    location: 'San Francisco, CA',
    type: 'part-time' as const,
    salary: '$35/hour',
    deadline: '2026-03-25',
    tags: ['Figma', 'Adobe XD', 'Prototyping'],
    isApplied: false,
  },
  {
    id: '4',
    title: 'Backend Engineer',
    company: 'CloudScale',
    location: 'Remote',
    type: 'remote' as const,
    salary: '$90,000/year',
    deadline: '2026-04-20',
    tags: ['Node.js', 'AWS', 'PostgreSQL'],
    isApplied: false,
  },
];

const typeColors: Record<string, string> = {
  'full-time': '#69F0AE',
  'part-time': '#FFB74D',
  internship: '#7C4DFF',
  remote: '#00E5FF',
};

const Jobs: React.FC = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      id="jobs-page"
      sx={{ p: { xs: 2, sm: 3 }, maxWidth: 700, mx: 'auto' }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Job Board
        </Typography>
        <Chip
          label={`${sampleJobs.length} Openings`}
          size="small"
          sx={{
            bgcolor: 'rgba(0,229,255,0.12)',
            color: '#18FFFF',
            fontWeight: 600,
          }}
        />
      </Stack>

      <Stack spacing={2}>
        {sampleJobs.map((job, i) => {
          const color = typeColors[job.type] || '#7C4DFF';
          const daysLeft = dayjs(job.deadline).diff(dayjs(), 'day');

          return (
            <Card
              key={job.id}
              hoverable
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {job.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    {job.company}
                  </Typography>

                  <Stack direction="row" spacing={2} sx={{ mt: 1.2 }} flexWrap="wrap">
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <LocationOnOutlined sx={{ fontSize: 15, color: 'text.secondary' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {job.location}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <WorkOutlineRounded sx={{ fontSize: 15, color: 'text.secondary' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {job.salary}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <AccessTimeRounded sx={{ fontSize: 15, color: 'text.secondary' }} />
                      <Typography
                        variant="caption"
                        sx={{ color: daysLeft < 7 ? 'error.main' : 'text.secondary' }}
                      >
                        {daysLeft > 0 ? `${daysLeft}d left` : 'Expired'}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={0.8} sx={{ mt: 1.5 }} flexWrap="wrap" useFlexGap>
                    {job.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(148,163,184,0.08)',
                          color: 'text.secondary',
                          fontSize: '0.68rem',
                          fontWeight: 500,
                          height: 24,
                        }}
                      />
                    ))}
                  </Stack>
                </Box>

                <Stack alignItems="flex-end" spacing={1} sx={{ ml: 2, flexShrink: 0 }}>
                  <Chip
                    label={job.type}
                    size="small"
                    sx={{
                      bgcolor: `${color}18`,
                      color,
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      textTransform: 'capitalize',
                    }}
                  />
                  <Button
                    variant={job.isApplied ? 'outlined' : 'contained'}
                    size="small"
                    disabled={job.isApplied}
                    sx={{
                      fontSize: '0.75rem',
                      px: 2,
                      py: 0.6,
                      minWidth: 80,
                      ...(job.isApplied && {
                        borderColor: 'rgba(105,240,174,0.3)',
                        color: '#69F0AE',
                      }),
                    }}
                  >
                    {job.isApplied ? 'Applied' : 'Apply'}
                  </Button>
                </Stack>
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Jobs;

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  EventBusyRounded,
  CheckCircleRounded,
  HourglassTopRounded,
  CancelRounded,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import Card from '../components/common/Card';

const sampleLeaves = [
  {
    id: '1',
    startDate: '2026-03-05',
    endDate: '2026-03-06',
    reason: 'Medical appointment',
    type: 'sick' as const,
    status: 'approved' as const,
    appliedAt: '2026-03-03',
  },
  {
    id: '2',
    startDate: '2026-03-18',
    endDate: '2026-03-18',
    reason: 'Family function',
    type: 'personal' as const,
    status: 'pending' as const,
    appliedAt: '2026-03-10',
  },
  {
    id: '3',
    startDate: '2026-02-20',
    endDate: '2026-02-21',
    reason: 'Conference attendance',
    type: 'academic' as const,
    status: 'rejected' as const,
    appliedAt: '2026-02-15',
  },
];

const statusConfig = {
  pending: { icon: <HourglassTopRounded />, color: '#FFB74D', label: 'Pending' },
  approved: { icon: <CheckCircleRounded />, color: '#69F0AE', label: 'Approved' },
  rejected: { icon: <CancelRounded />, color: '#FF5252', label: 'Rejected' },
};

const Leave: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      id="leave-page"
      sx={{ p: { xs: 2, sm: 3 }, maxWidth: 600, mx: 'auto' }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Leave
        </Typography>
        <Button
          id="apply-leave-btn"
          variant="contained"
          size="small"
          onClick={() => setShowForm(!showForm)}
          startIcon={<EventBusyRounded />}
          sx={{ fontSize: '0.8rem' }}
        >
          {showForm ? 'Cancel' : 'Apply Leave'}
        </Button>
      </Stack>

      {/* Balance cards */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 3 }}
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {[
          { label: 'Total', value: 15, color: '#7C4DFF' },
          { label: 'Used', value: 4, color: '#FFB74D' },
          { label: 'Remaining', value: 11, color: '#69F0AE' },
        ].map((item) => (
          <Card key={item.label} sx={{ flex: 1, textAlign: 'center', py: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: item.color }}>
              {item.value}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {item.label}
            </Typography>
          </Card>
        ))}
      </Stack>

      {/* Apply form */}
      {showForm && (
        <Card
          component={motion.div}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          sx={{ mb: 3 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            New Leave Application
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
            <TextField label="Leave Type" select fullWidth defaultValue="sick">
              <MenuItem value="sick">Sick Leave</MenuItem>
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="academic">Academic</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            <TextField label="Reason" multiline rows={3} fullWidth />
            <Button variant="contained" fullWidth sx={{ py: 1.3 }}>
              Submit Application
            </Button>
          </Stack>
        </Card>
      )}

      {/* Leave history */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        History
      </Typography>
      <Stack spacing={1.5}>
        {sampleLeaves.map((leave, i) => {
          const config = statusConfig[leave.status];

          return (
            <Card
              key={leave.id}
              component={motion.div}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              sx={{ p: 2 }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
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
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {leave.reason}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {dayjs(leave.startDate).format('MMM D')}
                      {leave.startDate !== leave.endDate &&
                        ` — ${dayjs(leave.endDate).format('MMM D')}`}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', display: 'block', mt: 0.2 }}
                    >
                      Applied {dayjs(leave.appliedAt).format('MMM D, YYYY')}
                    </Typography>
                  </Box>
                </Stack>
                <Chip
                  label={config.label}
                  size="small"
                  sx={{
                    bgcolor: `${config.color}15`,
                    color: config.color,
                    fontWeight: 600,
                    fontSize: '0.7rem',
                  }}
                />
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Leave;

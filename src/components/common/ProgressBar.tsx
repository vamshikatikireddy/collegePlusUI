import React from 'react';
import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from '@mui/material';

interface CircularProgressBarProps {
  value: number;
  size?: number;
  label?: string;
  color?: string;
}

export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  value,
  size = 80,
  label,
  color = '#7C4DFF',
}) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={4}
        sx={{ color: 'rgba(148,163,184,0.1)' }}
      />
      <CircularProgress
        variant="determinate"
        value={value}
        size={size}
        thickness={4}
        sx={{
          color,
          position: 'absolute',
          left: 0,
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: 700, fontSize: size * 0.2, color }}
        >
          {Math.round(value)}%
        </Typography>
        {label && (
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontSize: size * 0.12 }}
          >
            {label}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

interface LinearProgressBarProps {
  value: number;
  color?: string;
  height?: number;
  label?: string;
}

export const LinearProgressBar: React.FC<LinearProgressBarProps> = ({
  value,
  color = '#7C4DFF',
  height = 6,
  label,
}) => {
  return (
    <Box>
      {label && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {label}
          </Typography>
          <Typography variant="caption" sx={{ color, fontWeight: 600 }}>
            {Math.round(value)}%
          </Typography>
        </Box>
      )}
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height,
          borderRadius: height / 2,
          backgroundColor: 'rgba(148,163,184,0.1)',
          '& .MuiLinearProgress-bar': {
            borderRadius: height / 2,
            background: `linear-gradient(90deg, ${color} 0%, ${color}CC 100%)`,
          },
        }}
      />
    </Box>
  );
};

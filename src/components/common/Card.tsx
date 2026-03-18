import React from 'react';
import { Paper, type PaperProps } from '@mui/material';

interface CardProps extends PaperProps {
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ hoverable = false, sx, children, ...props }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        background:
          'linear-gradient(145deg, rgba(17,24,39,0.8) 0%, rgba(17,24,39,0.5) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(148,163,184,0.08)',
        transition: 'all 0.3s ease',
        ...(hoverable && {
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
            borderColor: 'rgba(124,77,255,0.2)',
          },
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};

export default Card;

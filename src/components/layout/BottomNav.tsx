import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import {
  DashboardRounded,
  CalendarMonthRounded,
  MenuBookRounded,
  WorkRounded,
  PersonRounded,
} from '@mui/icons-material';

const navItems = [
  { label: 'Home', icon: <DashboardRounded />, path: '/dashboard' },
  { label: 'Calendar', icon: <CalendarMonthRounded />, path: '/calendar' },
  { label: 'Courses', icon: <MenuBookRounded />, path: '/courses' },
  { label: 'Jobs', icon: <WorkRounded />, path: '/jobs' },
  { label: 'Profile', icon: <PersonRounded />, path: '/profile' },
];

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentIndex = navItems.findIndex((item) =>
    location.pathname.startsWith(item.path)
  );

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        background: 'rgba(10, 14, 26, 0.9)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(148,163,184,0.08)',
      }}
    >
      <BottomNavigation
        value={currentIndex === -1 ? 0 : currentIndex}
        onChange={(_, newValue) => {
          navigate(navItems[newValue].path);
        }}
        showLabels
        sx={{
          background: 'transparent',
          height: 64,
          '& .MuiBottomNavigationAction-root': {
            color: 'rgba(148,163,184,0.6)',
            minWidth: 0,
            py: 1,
            transition: 'color 0.2s ease',
            '&.Mui-selected': {
              color: '#7C4DFF',
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.65rem',
              fontWeight: 600,
              mt: 0.3,
              '&.Mui-selected': {
                fontSize: '0.65rem',
              },
            },
          },
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.path}
            id={`nav-${item.label.toLowerCase()}`}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;

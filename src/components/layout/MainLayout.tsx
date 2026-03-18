import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './Header';
import BottomNav from './BottomNav';

const MainLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          pb: '80px', // space for bottom nav
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Box>
      <BottomNav />
    </Box>
  );
};

export default MainLayout;

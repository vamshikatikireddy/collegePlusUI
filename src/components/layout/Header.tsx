import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Stack,
  Box,
} from '@mui/material';
import {
  NotificationsOutlined,
  SchoolRounded,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const homePath = user?.role === 'admin' ? '/admin/dashboard' : '/dashboard';

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'rgba(10, 14, 26, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(148,163,184,0.08)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
        {/* Branding */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.2}
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate(homePath)}
        >
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: 1.8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #7C4DFF 0%, #651FFF 100%)',
            }}
          >
            <SchoolRounded sx={{ color: '#fff', fontSize: 20 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #F1F5F9 0%, #CBD5E1 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CollegePlus
          </Typography>
        </Stack>

        {/* Right actions */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            id="header-notifications-btn"
            onClick={() => navigate('/notifications')}
            sx={{ color: 'text.secondary' }}
          >
            <Badge
              badgeContent={3}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.65rem',
                  minWidth: 18,
                  height: 18,
                },
              }}
            >
              <NotificationsOutlined />
            </Badge>
          </IconButton>

          <IconButton
            id="header-profile-btn"
            onClick={() => navigate('/profile')}
            sx={{ p: 0.5 }}
          >
            <Avatar
              sx={{
                width: 34,
                height: 34,
                fontSize: '0.85rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #7C4DFF 0%, #00E5FF 100%)',
              }}
            >
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

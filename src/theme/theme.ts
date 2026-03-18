import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7C4DFF',
      light: '#B388FF',
      dark: '#651FFF',
    },
    secondary: {
      main: '#00E5FF',
      light: '#18FFFF',
      dark: '#00B8D4',
    },
    background: {
      default: '#0A0E1A',
      paper: '#111827',
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#94A3B8',
    },
    error: {
      main: '#FF5252',
      light: '#FF8A80',
    },
    success: {
      main: '#69F0AE',
    },
    divider: alpha('#94A3B8', 0.12),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
      color: '#94A3B8',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 28px',
          fontSize: '0.95rem',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #7C4DFF 0%, #651FFF 100%)',
          boxShadow: '0 4px 20px rgba(124, 77, 255, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #9C7CFF 0%, #7C4DFF 100%)',
            boxShadow: '0 6px 28px rgba(124, 77, 255, 0.55)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: alpha('#111827', 0.6),
            backdropFilter: 'blur(8px)',
            '& fieldset': {
              borderColor: alpha('#94A3B8', 0.15),
              transition: 'border-color 0.3s ease',
            },
            '&:hover fieldset': {
              borderColor: alpha('#7C4DFF', 0.5),
            },
            '&.Mui-focused fieldset': {
              borderColor: '#7C4DFF',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            color: '#94A3B8',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: alpha('#111827', 0.8),
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha('#94A3B8', 0.08)}`,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;

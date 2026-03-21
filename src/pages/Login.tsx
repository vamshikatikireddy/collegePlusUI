import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Stack,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  SchoolRounded,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { login } from "../api/authApi";
import useAuthStore from "../store/authStore";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailError = touched.email && !EMAIL_REGEX.test(email);
  const passwordError = touched.password && password.length === 0;

  const canSubmit = EMAIL_REGEX.test(email) && password.length > 0 && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!canSubmit) return;

    setLoading(true);
    setError(null);

    try {
      const data = await login(email, password);
      setAuth(data.accessToken, data.user);
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "response" in err &&
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message
      ) {
        setError(
          (err as { response: { data: { message: string } } }).response.data
            .message,
        );
      } else {
        setError(
          "Unable to sign in. Please check your credentials and try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      id="login-page"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 20% 50%, rgba(124,77,255,0.15) 0%, transparent 50%), " +
          "radial-gradient(ellipse at 80% 20%, rgba(0,229,255,0.10) 0%, transparent 50%), " +
          "radial-gradient(ellipse at 50% 100%, rgba(124,77,255,0.08) 0%, transparent 50%), " +
          "#0A0E1A",
      }}
    >
      {/* Animated background orbs */}
      <Box
        component={motion.div}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,77,255,0.12) 0%, transparent 70%)",
          top: "-10%",
          left: "-5%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <Box
        component={motion.div}
        animate={{
          x: [0, -25, 35, 0],
          y: [0, 30, -25, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)",
          bottom: "-5%",
          right: "-5%",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Login card */}
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 440,
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          position: "relative",
          zIndex: 1,
          background:
            "linear-gradient(145deg, rgba(17,24,39,0.85) 0%, rgba(17,24,39,0.65) 100%)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(148,163,184,0.08)",
          boxShadow:
            "0 24px 80px rgba(0,0,0,0.4), 0 0 1px rgba(124,77,255,0.3)",
        }}
      >
        {/* Branding */}
        <Stack
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{ mb: 1 }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #7C4DFF 0%, #651FFF 100%)",
              boxShadow: "0 4px 16px rgba(124,77,255,0.35)",
            }}
          >
            <SchoolRounded sx={{ color: "#fff", fontSize: 26 }} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg, #F1F5F9 0%, #CBD5E1 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            CollegePlus
          </Typography>
        </Stack>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mt: 3, mb: 0.5 }}>
            Welcome back
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3.5 }}>
            Sign in to your account to continue
          </Typography>
        </motion.div>

        {/* Error alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert
                id="login-error-alert"
                severity="error"
                onClose={() => setError(null)}
                sx={{ mb: 2.5 }}
              >
                {error}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <Box
          component="form"
          id="login-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <TextField
              id="login-email"
              label="Email address"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              error={emailError}
              helperText={emailError ? "Enter a valid email address" : " "}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon
                      sx={{
                        color: emailError ? "error.main" : "text.secondary",
                        fontSize: 20,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 1 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <TextField
              id="login-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              error={passwordError}
              helperText={passwordError ? "Password is required" : " "}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon
                      sx={{
                        color: passwordError ? "error.main" : "text.secondary",
                        fontSize: 20,
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      id="toggle-password-visibility"
                      onClick={() => setShowPassword((v) => !v)}
                      edge="end"
                      size="small"
                      sx={{ color: "text.secondary" }}
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 1 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              id="forgot-password-btn"
              type="button"
              variant="text"
              onClick={() => navigate("/forgot-password")}
              sx={{
                alignSelf: "flex-end",
                mb: 1,
                px: 0,
                minWidth: "auto",
                color: "secondary.light",
                fontWeight: 600,
              }}
            >
              Forgot password?
            </Button>
            <Button
              id="login-submit-btn"
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                mt: 1,
                py: 1.6,
                fontSize: "1rem",
                fontWeight: 700,
                position: "relative",
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Sign In"
              )}
            </Button>
            <Button
              id="signup-login-btn"
              type="button"
              variant="text"
              size="large"
              fullWidth
              onClick={() => navigate("/signup")}
              sx={{
                mt: 1,
                py: 1.2,
                fontSize: "0.95rem",
                fontWeight: 600,
              }}
            >
              Create Account
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 3, color: "text.secondary" }}
            >
              powered by Pralyx
            </Typography>
          </motion.div>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;

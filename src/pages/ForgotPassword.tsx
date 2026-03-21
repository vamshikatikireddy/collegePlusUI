import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { forgotPassword } from "../api/authApi";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const emailError = touched && !EMAIL_REGEX.test(email);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!EMAIL_REGEX.test(email)) return;

    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await forgotPassword(email);
      setSuccess(
        response.message ||
          "If this email exists, reset instructions have been sent.",
      );
      setTimeout(() => {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 700);
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
        setError("Unable to process request right now. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        background:
          "radial-gradient(ellipse at 20% 50%, rgba(124,77,255,0.15) 0%, transparent 50%), " +
          "radial-gradient(ellipse at 80% 20%, rgba(0,229,255,0.10) 0%, transparent 50%), " +
          "#0A0E1A",
      }}
    >
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{ width: "100%", maxWidth: 420, p: { xs: 3, sm: 4 }, borderRadius: 4 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Forgot Password
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2.5 }}>
          Enter your email and we will send an OTP for password reset.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={onSubmit} noValidate>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            error={emailError}
            helperText={emailError ? "Enter a valid email address" : " "}
          />
          <Stack spacing={1.5}>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Send Reset Link"}
            </Button>
            <Button variant="text" onClick={() => navigate("/login", { replace: true })}>
              Back to Sign In
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;

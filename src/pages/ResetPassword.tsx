import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { resetPassword, verifyResetOtp } from "../api/authApi";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const emailFromQuery = useMemo(() => searchParams.get("email") ?? "", [searchParams]);
  const [email, setEmail] = useState(emailFromQuery);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resetToken, setResetToken] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [touched, setTouched] = useState({
    email: false,
    otp: false,
    newPassword: false,
    confirmPassword: false,
  });

  const emailError = touched.email && email.trim().length === 0;
  const otpError = touched.otp && otp.trim().length === 0;
  const newPasswordError = touched.newPassword && newPassword.length < 6;
  const confirmPasswordError =
    touched.confirmPassword && confirmPassword !== newPassword;

  const canSubmit =
    email.trim().length > 0 &&
    otp.trim().length > 0 &&
    newPassword.length >= 6 &&
    confirmPassword === newPassword &&
    !loading;

  const verifyOtp = async () => {
    setTouched((t) => ({ ...t, email: true, otp: true }));
    if (email.trim().length === 0 || otp.trim().length === 0) return;

    setVerifyingOtp(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await verifyResetOtp(email.trim(), otp.trim());
      setOtpVerified(true);
      setResetToken(response.resetToken);
      setSuccess(response.message || "OTP verified successfully.");
    } catch (err: unknown) {
      setOtpVerified(false);
      setResetToken(undefined);
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
        setError("Unable to verify OTP right now. Please try again.");
      }
    } finally {
      setVerifyingOtp(false);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      email: true,
      otp: true,
      newPassword: true,
      confirmPassword: true,
    });
    if (!canSubmit) return;

    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await resetPassword(
        email.trim(),
        otp.trim(),
        newPassword,
        resetToken,
      );
      setSuccess(response.message || "Password reset successfully. Please sign in.");
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1000);
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
        setError("Unable to reset password right now. Please try again.");
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
        sx={{ width: "100%", maxWidth: 440, p: { xs: 3, sm: 4 }, borderRadius: 4 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Reset Password
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2.5 }}>
          Enter the OTP sent to your email and set a new password.
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
          <Stack spacing={1}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setOtpVerified(false);
                setResetToken(undefined);
              }}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              error={emailError}
              disabled={otpVerified || verifyingOtp || loading}
              helperText={emailError ? "Email is required" : " "}
            />
            <TextField
              fullWidth
              label="OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setOtpVerified(false);
                setResetToken(undefined);
              }}
              onBlur={() => setTouched((t) => ({ ...t, otp: true }))}
              error={otpError}
              disabled={otpVerified || verifyingOtp || loading}
              helperText={otpError ? "OTP is required" : " "}
            />
            {!otpVerified ? (
              <Button
                type="button"
                variant="contained"
                disabled={
                  verifyingOtp ||
                  loading ||
                  email.trim().length === 0 ||
                  otp.trim().length === 0
                }
                onClick={verifyOtp}
              >
                {verifyingOtp ? (
                  <CircularProgress size={22} sx={{ color: "#fff" }} />
                ) : (
                  "Verify OTP"
                )}
              </Button>
            ) : (
              <>
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onBlur={() =>
                    setTouched((t) => ({ ...t, newPassword: true }))
                  }
                  error={newPasswordError}
                  helperText={
                    newPasswordError
                      ? "Password must be at least 6 characters"
                      : " "
                  }
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() =>
                    setTouched((t) => ({ ...t, confirmPassword: true }))
                  }
                  error={confirmPasswordError}
                  helperText={
                    confirmPasswordError ? "Passwords do not match" : " "
                  }
                />
                <Button type="submit" variant="contained" disabled={!canSubmit}>
                  {loading ? (
                    <CircularProgress size={22} sx={{ color: "#fff" }} />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </>
            )}
            <Button variant="text" onClick={() => navigate("/login", { replace: true })}>
              Back to Sign In
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default ResetPassword;

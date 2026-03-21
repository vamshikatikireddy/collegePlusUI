import axiosInstance from "./axiosInstance";
import type { User } from "../store/authStore";
import type { AxiosResponse } from "axios";

interface LoginResponse {
  accessToken: string;
  message: string | undefined;
  user: User;
}

interface RefreshResponse {
  success: boolean;
  message?: string;
  accessToken?: string;
  user?: User;
}

interface MessageResponse {
  success?: boolean;
  message?: string;
  resetToken?: string;
}

export const signup = async (
  email: string,
  password: string,
  name: string,
): Promise<AxiosResponse<LoginResponse>> => {
  const data = await axiosInstance.post<LoginResponse>("/auth/register", {
    name,
    role: "student",
    email,
    password,
  }, { withCredentials: true });
  return data;
};

/**
 * POST /auth/login
 * Sends email + password; expects { accessToken, user } in response.
 * The backend should also set the refresh token as an HttpOnly cookie.
 */
export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>(
    "/auth/login",
    {
      email,
      password,
    },
    { withCredentials: true },
  );
  // console.log(data);
  return data;
};

/**
 * POST /auth/refresh
 * Sends the refresh token via HttpOnly cookie (withCredentials).
 * Verifies the cookie-based session and may return user and/or access token.
 */
export const refreshToken = async (): Promise<RefreshResponse> => {
  const { data } = await axiosInstance.post<RefreshResponse>(
    "/auth/refresh",
    {},
    { withCredentials: true },
  );
  return data;
};

/**
 * POST /auth/logout
 * Clears the refresh token cookie on the server.
 */
export const logout = async (): Promise<void> => {
  await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
};

/**
 * POST /auth/change-password
 * Protected route for authenticated users.
 */
export const changePassword = async (
  currentPassword: string,
  newPassword: string,
): Promise<MessageResponse> => {
  const { data } = await axiosInstance.post<MessageResponse>(
    "/auth/change-password",
    { currentPassword, newPassword },
    { withCredentials: true },
  );
  return data;
};

/**
 * POST /auth/forgot-password
 * Sends OTP to the provided email.
 */
export const forgotPassword = async (
  email: string,
): Promise<MessageResponse> => {
  const { data } = await axiosInstance.post<MessageResponse>(
    "/auth/forgot-password",
    { email },
    { withCredentials: true },
  );
  return data;
};

/**
 * POST /auth/verify-otp
 * Verifies OTP before allowing password reset.
 */
export const verifyResetOtp = async (
  email: string,
  otp: string,
): Promise<MessageResponse> => {
  const { data } = await axiosInstance.post<MessageResponse>(
    "/auth/verify-otp",
    { email, otp },
    { withCredentials: true },
  );
  return data;
};

/**
 * POST /auth/reset-password
 * Resets password using email + OTP verification.
 */
export const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string,
  resetToken?: string,
): Promise<MessageResponse> => {
  const { data } = await axiosInstance.post<MessageResponse>(
    "/auth/reset-password",
    { email, otp, newPassword, resetToken },
    { withCredentials: true },
  );
  return data;
};

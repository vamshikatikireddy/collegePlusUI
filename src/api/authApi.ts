import axiosInstance from './axiosInstance';
import type { User } from '../store/authStore';

interface LoginResponse {
  accessToken: string;
  user: User;
}

interface RefreshResponse {
  accessToken: string;
}

/**
 * POST /auth/login
 * Sends email + password; expects { accessToken, user } in response.
 * The backend should also set the refresh token as an HttpOnly cookie.
 */
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>('/auth/login', {
    email,
    password,
  });
  return data;
};

/**
 * POST /auth/refresh
 * Sends the refresh token via HttpOnly cookie (withCredentials).
 * Returns a new access token.
 */
export const refreshToken = async (): Promise<RefreshResponse> => {
  const { data } = await axiosInstance.post<RefreshResponse>(
    '/auth/refresh',
    {},
    { withCredentials: true }
  );
  return data;
};

/**
 * POST /auth/logout
 * Clears the refresh token cookie on the server.
 */
export const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
};

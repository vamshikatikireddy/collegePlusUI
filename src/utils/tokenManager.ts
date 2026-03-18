import useAuthStore from '../store/authStore';

/**
 * Minimal base64url → JSON decoder for JWT payloads.
 * No signature verification — that's the server's job.
 */
const decodePayload = (token: string): Record<string, unknown> => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const json = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(json);
};

/**
 * Check if the current access token is expired or about to expire.
 * Returns true if the token is missing, expired, or expires within `bufferMs`.
 */
export const isTokenExpired = (bufferMs: number = 60_000): boolean => {
  const token = useAuthStore.getState().accessToken;
  if (!token) return true;

  try {
    const payload = decodePayload(token);
    const exp = payload.exp as number | undefined;
    if (!exp) return true;

    const expiresAt = exp * 1000; // JWT exp is in seconds
    return Date.now() >= expiresAt - bufferMs;
  } catch {
    return true;
  }
};

export { decodePayload as jwtDecode };

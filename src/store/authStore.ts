import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;

  setAuth: (token: string, user: User) => void;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,

  setAuth: (token: string, user: User) =>
    set({ accessToken: token, user }),

  setAccessToken: (token: string) =>
    set({ accessToken: token }),

  clearAuth: () =>
    set({ accessToken: null, user: null }),

  isAuthenticated: () => get().accessToken !== null,
}));

export default useAuthStore;
export type { User, AuthState };

import { create } from "zustand";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthResolved: boolean;

  setAuth: (token: string, user: User) => void;
  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
  setAuthResolved: (value: boolean) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  isAuthResolved: false,

  setAuth: (token: string, user: User) =>
    set({ accessToken: token, user, isAuthResolved: true }),

  setAccessToken: (token: string) =>
    set({ accessToken: token, isAuthResolved: true }),

  setUser: (user: User) => set({ user, isAuthResolved: true }),

  setAuthResolved: (value: boolean) => set({ isAuthResolved: value }),

  clearAuth: () => set({ accessToken: null, user: null, isAuthResolved: true }),

  isAuthenticated: () => get().accessToken !== null || get().user !== null,
}));

export default useAuthStore;
export type { User, AuthState };

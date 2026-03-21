import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "./theme/theme";
import AppRoutes from "./routes/AppRoutes";
import useAuthStore from "./store/authStore";
import { refreshToken } from "./api/authApi";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes default
    },
  },
});

const App: React.FC = () => {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const setAuthResolved = useAuthStore((s) => s.setAuthResolved);

  useEffect(() => {
    let isMounted = true;

    const bootstrapAuth = async () => {
      try {
        // Always verify session on app startup (important after browser reload).
        const data = await refreshToken();
        if (!isMounted) return;

        if (data.accessToken) {
          setAccessToken(data.accessToken);
        }
        if (data.user) {
          setUser(data.user);
        }

        if (!data.accessToken && !data.user) {
          clearAuth();
        }
      } catch {
        if (!isMounted) return;
        clearAuth();
      } finally {
        if (isMounted) {
          setAuthResolved(true);
        }
      }
    };

    bootstrapAuth();
    return () => {
      isMounted = false;
    };
  }, [setAccessToken, setUser, clearAuth, setAuthResolved]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

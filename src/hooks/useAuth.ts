import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import {
  signup as registerApi,
  login as loginApi,
  logout as logoutApi,
  refreshToken,
} from "../api/authApi";

const useAuth = () => {
  const navigate = useNavigate();
  const { accessToken, user, setAuth, clearAuth } = useAuthStore();

  const isAuthenticated = accessToken !== null || user !== null;

  const register = async (email: string, password: string, name: string) => {
    const data = await registerApi(email, password, name);
    console.log(data);
    return data;
  };

  const login = async (email: string, password: string) => {
    const data = await loginApi(email, password);
    setAuth(data.accessToken, data.user);
    // console.log(data);
    navigate("/dashboard", { replace: true });
    return data;
  };

  const refreshAuthToken = async () => {
    const data = await refreshToken();
    if (data.accessToken && data.user) {
      setAuth(data.accessToken, data.user);
    }
    return data;
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch {
      // Clear local state even if server call fails
    }
    clearAuth();
    navigate("/login", { replace: true });
  };

  return {
    isAuthenticated,
    user,
    accessToken,
    login,
    logout,
    register,
    refreshAuthToken,
  };
};

export default useAuth;

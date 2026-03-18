import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { login as loginApi, logout as logoutApi } from '../api/authApi';

const useAuth = () => {
  const navigate = useNavigate();
  const { accessToken, user, setAuth, clearAuth } = useAuthStore();

  const isAuthenticated = accessToken !== null;

  const login = async (email: string, password: string) => {
    const data = await loginApi(email, password);
    setAuth(data.accessToken, data.user);
    navigate('/dashboard', { replace: true });
    return data;
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch {
      // Clear local state even if server call fails
    }
    clearAuth();
    navigate('/login', { replace: true });
  };

  return { isAuthenticated, user, accessToken, login, logout };
};

export default useAuth;

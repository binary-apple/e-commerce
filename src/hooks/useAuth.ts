import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout, setAuth } from '../store/slices/authSlice';
import { useLazyGetMeQuery } from '../api/auth';

const AUTH_TOKEN_KEY = 'auth_token';

// Helper functions for auth management
const saveToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

const clearToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const [getMe] = useLazyGetMeQuery();

  useEffect(() => {
    async function checkSession() {
      try {
        // Check if there's a token in localStorage
        const token = localStorage.getItem(AUTH_TOKEN_KEY);

        if (!token) {
          dispatch(logout());
          return;
        }

        // Fetch user data with the token
        const meResp = await getMe(token).unwrap();
        dispatch(setAuth({ accessToken: token, email: meResp.email }));
      } catch (error) {
        console.error('Session restore error:', error);
        clearToken();
        dispatch(logout());
      }
    }

    checkSession();
  }, [dispatch, getMe]);

  return { saveToken, clearToken };
};

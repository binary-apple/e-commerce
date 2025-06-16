import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout, setAuth } from '../store/slices/authSlice';
import { useLazyGetMeQuery } from '../api/authApi';

const AUTH_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const saveAuthTokenToLS = (authToken: string, refreshToken?: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, authToken);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

export const clearAuthTokenLS = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getAuthTokenFromLS = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getRefreshTokenFromLS = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const [getMe] = useLazyGetMeQuery();

  useEffect(() => {
    async function checkSession() {
      try {
        const token = getAuthTokenFromLS();

        if (!token) {
          dispatch(logout());
          return;
        }

        const meResp = await getMe(token).unwrap();
        dispatch(setAuth({ accessToken: token, email: meResp.email }));
      } catch {
        clearAuthTokenLS();
        dispatch(logout());
      }
    }

    checkSession();
  }, [dispatch, getMe]);

  return { saveAuthTokenToLS, clearAuthTokenLS };
};

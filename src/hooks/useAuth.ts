import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout, setAuth } from '../store/slices/authSlice';
import { useLazyGetMeQuery } from '../api/authApi';

const AUTH_TOKEN_KEY = 'auth_token';

export const saveAuthTokenToLS = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearAuthTokenLS = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const getAuthTokenFromLS = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
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

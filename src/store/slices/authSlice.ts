import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { isUserLoggedIn, getUserToken } from '../../utils/tokenManager';

type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  accessToken: string | null;
  email: string | null;
};

const userToken = getUserToken();
const initialState: AuthState = {
  isAuthenticated: isUserLoggedIn(),
  isInitialized: true,
  accessToken: userToken?.access_token || null,
  email: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ accessToken: string; email: string }>) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
      state.isInitialized = true;
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.email = null;
      state.isInitialized = true;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
  },
});

export const { setAuth, clearAuth, setInitialized } = authSlice.actions;
export const authReducer = authSlice.reducer;

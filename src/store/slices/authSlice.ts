import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  email: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  email: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ accessToken: string; email: string }>) {
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.email = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

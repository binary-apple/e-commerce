import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { authReducer } from './slices/authSlice';
import { productsApi } from '../api/productsApi';
import { userApi } from '../api/userApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(authApi.middleware, productsApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

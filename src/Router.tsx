import type { ReactNode } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router';
import { Layout } from './layouts/Layout';
import { Paths } from './types/paths';
import RegistrationPage from './features/registration/RegistrationPage';
import NotFoundPage from './features/notFound/NotFoundPage';
import LoginPage from './features/login/LoginPage';
import MainPage from './features/main/MainPage';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
import CircularProgress from '@mui/material/CircularProgress';

function PublicRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isInitialized } = useSelector((state: RootState) => state.auth);
  if (!isInitialized) {
    return <CircularProgress size="3rem" />;
  }
  if (isAuthenticated) {
    return <Navigate to={Paths.HOME} replace />;
  }

  return children;
}

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={Paths.HOME} element={<MainPage />} />
            <Route path={Paths.CATALOG} element={<div>Catalog Page</div>} />
            <Route path={Paths.ABOUT} element={<div>About Page</div>} />

            <Route
              path={Paths.REGISTRATION}
              element={
                <PublicRoute>
                  <RegistrationPage />
                </PublicRoute>
              }
            />
            <Route
              path={Paths.AUTH}
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />

            <Route path={Paths.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

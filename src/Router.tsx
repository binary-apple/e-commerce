import { Routes, Route } from 'react-router';
import MainLayout from './features/main/layout/MainLayout';
import MainPage from './features/main/MainPage.tsx';
import CatalogPage from './features/catalog/CatalogPage.tsx';
import RegistrationPage from './features/registration/RegistrationPage.tsx';
import NotFoundPage from './features/notFound/NotFoundPage';
import AuthenticationPage from './features/login/AuthenticationPage';

export default function Router() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="login" element={<AuthenticationPage />} />
      </Routes>
    </>
  );
}

import { Routes, Route, BrowserRouter } from 'react-router';
import { Layout } from './layouts/Layout';
import { Paths } from './types/paths';
import RegistrationPage from './features/registration/RegistrationPage';
import NotFoundPage from './features/notFound/NotFoundPage';
import LoginPage from './features/login/LoginPage';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={Paths.HOME} element={<div>Main Page</div>} />
            <Route path={Paths.CATALOG} element={<div>Catalog Page</div>} />
            <Route path={Paths.REGISTRATION} element={<RegistrationPage />} />
            <Route path={Paths.AUTH} element={<LoginPage />} />
            <Route path={Paths.ABOUT} element={<div>About Page</div>} />
            <Route path={Paths.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

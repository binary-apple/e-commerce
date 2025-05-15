import { Routes, Route, Outlet, BrowserRouter } from 'react-router';
import { Paths } from './types/paths';
import RegistrationPage from './features/registration/RegistrationPage';
import NotFoundPage from './features/notFound/NotFoundPage';
// Todo: remove import outlet after creating main layout
import LoginPage from './features/login/LoginPage';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <>
                <div>Layout of website</div>
                <Outlet />
              </>
            }
          >
            <Route path={Paths.HOME} element={<div>Main Page</div>} />
            <Route path={Paths.CATALOG} element={<div>Catalog Page</div>} />
            <Route path={Paths.REGISTRATION} element={<RegistrationPage />} />
            <Route path={Paths.AUTH} element={<LoginPage />} />
            <Route path={Paths.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

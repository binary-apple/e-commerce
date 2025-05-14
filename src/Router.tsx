import { Routes, Route, Outlet } from 'react-router';
import RegistrationPage from './features/registration/RegistrationPage';
import NotFoundPage from './features/notFound/NotFoundPage';
// Todo: remove import outlet after creating main layout
import { Paths } from './types/paths';

export default function Router() {
  return (
    <>
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
          <Route path={Paths.AUTH} element={<div>Log In</div>} />
          <Route path={Paths.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

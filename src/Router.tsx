import { Routes, Route, BrowserRouter } from 'react-router';
import RegistrationPage from './features/registration/RegistrationPage';
import NotFoundPage from './features/notFound/NotFoundPage';
import { Paths } from './types/paths';
import { Layout } from './layouts/Layout';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={Paths.HOME} element={<div>Main Page</div>} />
            <Route path={Paths.CATALOG} element={<div>Catalog Page</div>} />
            <Route path={Paths.REGISTRATION} element={<RegistrationPage />} />
            <Route path={Paths.AUTH} element={<div>Log In</div>} />
            <Route path={Paths.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

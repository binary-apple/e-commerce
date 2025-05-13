import { Routes, Route, Outlet } from 'react-router';
import RegistrationPage from './features/registration/RegistrationPage';
import NotFoundPage from './features/notFound/NotFoundPage';
// Todo: remove import outlet after creating main layout

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
          <Route path="/" element={<div>Main Page</div>} />
          <Route path="catalog" element={<div>Catalog Page</div>} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="login" element={<div>Log In</div>} />
      </Routes>
    </>
  );
}

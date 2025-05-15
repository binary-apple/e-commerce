import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router';
import Box from '@mui/material/Box';
import Header from './components/Header/Header';

export function Layout() {
  return (
    <>
      <Header />
      <Box component="main" flexGrow={1} display="flex" justifyContent="center" alignItems="center">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

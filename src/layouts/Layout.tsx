import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router';
import { Box, CssBaseline } from '@mui/material';

export function Layout() {
  return (
    <>
      <CssBaseline />
      <div>Header</div>
      <Box component="main" flexGrow={1}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

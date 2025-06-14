import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router';
import Box from '@mui/material/Box';
import Header from './components/Header/Header';
import { HEIGHT_FOOTER, HEIGHT_HEADER } from '../constants';

export function Layout() {
  return (
    <>
      <Header />
      <Box
        component="main"
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: `calc(100vh - ${HEIGHT_HEADER} - ${HEIGHT_FOOTER})` }}
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

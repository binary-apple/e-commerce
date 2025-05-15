import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import Router from './Router';
import { SnackbarProvider } from 'notistack';

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          <Router />
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

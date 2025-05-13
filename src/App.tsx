import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import RegistrationPage from './features/registration/RegistrationPage';
import { SnackbarProvider } from 'notistack';

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <CssBaseline />
          <RegistrationPage />
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

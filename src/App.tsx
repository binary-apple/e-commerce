import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import RegistrationPage from './features/registration/RegistrationPage';

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RegistrationPage />
      </ThemeProvider>
    </>
  );
}

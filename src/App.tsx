import { CssBaseline, ThemeProvider } from '@mui/material';
// import Button from '@mui/material/Button';
import { theme } from './theme';
import RegistrationPage from './features/registration/RegistrationPage';

export default function App() {
  // const message: string = 'React + TypeScript + Eslint installed! 🚀';
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RegistrationPage />
      </ThemeProvider>
    </>
  );
}

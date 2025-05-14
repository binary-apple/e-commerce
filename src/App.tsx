import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import Router from './Router';

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </>
  );
}

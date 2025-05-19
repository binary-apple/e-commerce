import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import Router from './Router';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider } from './providers/AuthProvider';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <CssBaseline />
            <AuthProvider>
              <Router />
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

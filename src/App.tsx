import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import Router from './Router';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <CssBaseline />
            <Router />
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

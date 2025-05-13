import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { Layout } from './layouts/Layout';
import { BrowserRouter, Routes, Route } from 'react-router';

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<div>MAIN</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

import { ThemeProvider } from '@mui/material';
import Button from '@mui/material/Button';
import { theme } from './theme';

export default function App() {
  const message: string = 'React + TypeScript + Eslint installed! 🚀';
  return (
    <>
      <ThemeProvider theme={theme}>
        <div>{message}</div>
        <Button variant="contained">Click</Button>
      </ThemeProvider>
    </>
  );
}

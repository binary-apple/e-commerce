import { createTheme, responsiveFontSizes, type ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      default: '#ebe3cc',
    },
    primary: {
      main: '#ed5c01',
      contrastText: '#fcefe2',
    },
    secondary: {
      main: '#062d3e',
    },
    info: {
      main: '#189cab',
      contrastText: '#ebe3cc',
    },
    warning: {
      main: '#FBBD08',
      contrastText: '#224453',
    },
    text: {
      primary: '#062D3E',
      secondary: '#ED5C01',
    },
    divider: '#062D3E',
  },
  typography: {
    fontFamily: 'Manrope, Roboto, sans-serif',
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          fontFamily: 'Josefin Sans',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 600,
        },
      },
    },
  },
};

export const theme = responsiveFontSizes(createTheme(themeOptions));

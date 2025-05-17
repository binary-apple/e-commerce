import { createTheme, responsiveFontSizes, type ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      default: '#ebe3cc',
      paper: '#FBF2DA',
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
    h1: {
      fontSize: '6rem',
      fontWeight: 400,
      lineHeight: 1.167,
    },
    h2: {
      fontSize: '2.875rem',
      fontWeight: 500,
      letterSpacing: '2.76px',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.625rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
          lineHeight: '2.375rem',
          letterSpacing: '0.1125rem',
          borderRadius: '190px',
          padding: '0.75rem 2rem',
          textTransform: 'none',
        },
        outlined: {
          lineHeight: '2.125rem',
          borderWidth: '2px',
        },
      },
    },
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

// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0', 
      dark: '#7b1fa2', 
    },
    background: {
      default: '#fdf9f9' 
    }
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1390px !important',
          margin: '0 auto',
          padding: '0 15px',
          width: '100%',
          '@media (max-width: 1400px)': {
            maxWidth: '1200px !important'
          },
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#fdf9f9',
          minHeight: '100vh'
        }
      }
    }
  }
});

export default theme;


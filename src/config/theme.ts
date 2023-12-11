import { createTheme } from '@mui/material';
import { lime, purple } from '@mui/material/colors';

export const appTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { 
            main: purple[500],
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#fff',
        },
        secondary: { main: "#b81414" },
        text: { primary : "#fff" }
    },
});

export const darkTheme = createTheme({
    palette: {
      background: { default: "#222222" },
      mode: "dark",
      primary: { main: "#cd43e8" },
      secondary: { main: "#E50914" },
      text: { primary: "#f5f5f1" },
    },
  });
  
  export const lightTheme = createTheme({
    palette: {
      background: {},
      mode: "light",
      primary: { main: "#5a056b" },
      secondary: { main: "#222222" },
      text: { primary: "#222222" },
    },
  });
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
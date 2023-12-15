import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import keycloak from '../config/keycloak';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

type HeaderProps = {
  toggle: () => void;
  theme: string;
  handleDrawerToggle?: () => void;
};

export default function Header({ toggle, theme, handleDrawerToggle }: HeaderProps) {
  return (
    <Box>
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Box sx={{ flexGrow: 1 }} />
      <IconButton sx={{ ml: 1 }} onClick={toggle} color="inherit">
        {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>

        <Button color="inherit" onClick={
            () => {
              keycloak.logout();
              localStorage.clear();
            }
          }>
        Logout
      </Button>
    </Toolbar>
  </Box>
  );
}

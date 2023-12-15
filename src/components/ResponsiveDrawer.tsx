import {
    Divider,
    List,
    ListItem,
    Toolbar,
    Typography,
    Box,
    Drawer,
    ListItemButton,
    ListItemText,
  } from "@mui/material";
  import { Link } from "react-router-dom";

  const drawerWidth = 240;
  let roles = localStorage.getItem("roles") ? JSON.parse(localStorage.getItem("roles") || "") : ["ANONYMOUS"];
  
  type Props = {
    open: boolean;
    onClose: () => void;
  };
  
  export default function ResponsiveDrawer({ open, onClose }: Props) {
    let routes = []
    routes = [
        { path: "/", name: "Home" , roles: ["ANONYMOUS", "USER", "STAFF", "ADMIN"] },
        { path: "/technicians", name: "Técnicos", roles: ["USER", "STAFF", "ADMIN"]},
        { path: "/orders", name: "Ordens de Serviço" , roles: ["USER"]},
        { path: "/vehicles", name: "Veículos" , roles: ["USER"]},
        { path: "/customers", name: "Meu Cadastro" , roles: ["USER"]},
        { path: "/orders/all", name: "Ordens de Serviço" , roles: ["STAFF", "ADMIN"]},
        { path: "/customers/all", name: "Associados" , roles: ["STAFF", "ADMIN"]},
        { path: "/vehicles/all", name: "Veículos" , roles: ["STAFF", "ADMIN"]}
      ];

      if(roles && roles.includes("STAFF")){
        routes = routes.filter(function(value, index, arr){ 
          return value.roles.includes("STAFF");
      });
      }
      else{
        if(roles && roles.includes("USER")){
          routes = routes.filter(function(value, index, arr){ 
            return value.roles.includes("USER");
        });
        }
      }

    const drawer = (
      <div>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Navii
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              onClick={onClose}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText>{route.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    );
  
    return (
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
  
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "background.default",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    );
  }
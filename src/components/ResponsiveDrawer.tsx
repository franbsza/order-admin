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
import { selectRoles, selectUserDetails } from "../features/auth/SliceAuth";
import { useAppSelector } from "../app/hooks";

const drawerWidth = 240;

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ResponsiveDrawer({ open, onClose }: Props) {

  const userDetails = useAppSelector(selectUserDetails);
  const roles = useAppSelector(selectRoles);
  let visibleRoutes = [
    { path: "/", name: "Home", roles: ["USER", "STAFF", "ADMIN"] }
  ];

  let routesAll = [
      { path: "/customers/details/"+userDetails.email, name: "Meu Cadastro" , roles: ["USER"]},
      { path: "/orders", name: "Ordens de Serviço" , roles: ["USER", "STAFF", "ADMIN"]},
      { path: "/vehicles", name: "Veículos" , roles: ["USER", "STAFF", "ADMIN"]},
      { path: "/technicians", name: "Técnicos", roles: ["USER", "STAFF", "ADMIN"]},
      { path: "/customers", name: "Associados" , roles: ["STAFF", "ADMIN"]}
    ];

    roles && roles.forEach((role) => {
      routesAll.forEach(route => {
        if (route.roles.includes(role)) {
          visibleRoutes.push(route);
        }
      });
    });

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Navii
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {visibleRoutes && visibleRoutes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            onClick={onClose}
            style={{ textDecoration: "none", color: "inherit" }}>
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
        }}>
        {drawer}
      </Drawer>
    </Box>
  );
}
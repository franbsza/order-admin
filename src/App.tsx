import * as React from 'react';
import { Typography } from '@mui/material';
import { Box, ThemeProvider } from '@mui/system';
import Header from './components/Header';
import Layout from './components/Layout';
import { appTheme } from './config/theme';
import { Routes , Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { CreateOrder } from './features/orders/CreateOrder';
import { ListOrders } from './features/orders/ListOrders';
import { ProtectedRoutes } from './components/ProtectedRoutes';
<<<<<<< Updated upstream
=======
import keycloak from "./config/keycloak"
import { selectRoles } from './features/auth/SliceAuth';

>>>>>>> Stashed changes

function EditOrder(){
  return (
    <Box>
      <Typography variant="h1" component="h1">Edit Order</Typography>
    </Box>
  )
};

<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes
function App(){

  return (

    

    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider theme={ appTheme }>
      <SnackbarProvider 
          maxSnack={3}
          anchorOrigin={{
          vertical: 'top', 
          horizontal: 'center'}}
          autoHideDuration={3000}
          >
      <Box 
      component="main" 
      sx={{ 
        height: '100vh',
        backgroundColor: (theme) => theme.palette.background.default, 
         }}>

      <Header />

      <Layout>

          <Routes>
        
<<<<<<< Updated upstream
             <Route path="/" 
             element={<ProtectedRoutes 
             roles={["ADMIN, USER, STAFF"]}> 
             <ListOrders /> 
             </ProtectedRoutes>} />

            <Route path="/orders" 
            element={<ProtectedRoutes 
            roles={["ADMIN, USER, STAFF"]}>
              <ListOrders />
            </ProtectedRoutes>} />

            <Route path="/orders/create" 
            element={<ProtectedRoutes 
            roles={["ADMIN, USER, STAFF"]}>
              <CreateOrder />
            </ProtectedRoutes>} />

            <Route path="/orders/edit/:id" 
            element={<ProtectedRoutes 
            roles={["ADMIN, USER, STAFF"]}>
              <EditOrder />
            </ProtectedRoutes>} />

            <Route path='*' element={
               <Box>
                <Typography variant="h1" component="h1">404</Typography>
               <Typography variant="h1" component="h1">Page not found</Typography>
            </Box>
            }/>
=======
             <Route path="/" element={   <ProtectedRoutes roles={["ADMIN"]}> <ListOrders /> </ProtectedRoutes>} />
            <Route path="/orders" element={<ProtectedRoutes><ListOrders /></ProtectedRoutes>} />
            <Route path="/orders/create" element={<ProtectedRoutes><CreateOrder /></ProtectedRoutes>} />
            <Route path="/orders/edit/:id" element={<ProtectedRoutes><EditOrder /></ProtectedRoutes>} />
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path='*' element={
               <Box>
                <Typography variant="h1" component="h1">404</Typography>
               <Typography variant="h1" component="h1">Page not found</Typography>
             </Box>
            } /> */}
>>>>>>> Stashed changes
          </Routes>
      </Layout>    
      </Box>
      </SnackbarProvider>
    </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
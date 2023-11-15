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
          <Route 
            path="/" 
            element={
            <ProtectedRoutes 
              rolesPropos={["USER"]}> 
              <ListOrders /> 
            </ProtectedRoutes>
          }/>

          <Route 
            path="/orders" 
            element={
            <ProtectedRoutes 
              rolesPropos={["USER"]}>
              <ListOrders />
            </ProtectedRoutes>
          }/>

          <Route 
            path="/orders/create" 
            element={
            <ProtectedRoutes 
              rolesPropos={["USER"]}>
              <CreateOrder />
            </ProtectedRoutes>
          }/>

          <Route 
            path='*' 
            element={
              <Box>
                <Typography 
                  variant="h1" 
                  component="h1">
                    404
                </Typography>
                <Typography 
                  variant="h1" 
                  component="h1">
                    Page not found
                </Typography>
              </Box>
            }/>
          </Routes>
      </Layout>    
      </Box>
      </SnackbarProvider>
    </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
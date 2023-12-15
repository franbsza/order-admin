import * as React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Routes , Route } from 'react-router-dom';
import { CreateOrder } from './features/orders/CreateOrder';
import { ListOrders } from './features/orders/ListOrders';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { ListOrdersByUser } from './features/orders/ListOrderByUser';
import { EditOrder } from './features/orders/EditOrder';
import { Details } from './features/orders/Details';
import { Layout } from './components/Layout';
import { ListVehiclesByUser } from './features/vehicle/ListVehiclesByUser';
import { ListTechnician } from './features/technician/ListTechnician';
import { Home } from './components/Home';
import { CreateVehicle } from './features/vehicle/CreateVehicle';
import { CreateCustomer } from './features/customers/CreateCustomer';
import { CustomerDetails } from './features/customers/CustomerDetails';

function App(){

  return (

<Layout>
<Routes>

  <Route 
    path="/" 
    element={
    <ProtectedRoutes 
      rolesPropos={["ANONYMOUS", "USER", "STAFF", "ADMIN"]}> 
      <Home/> 
    </ProtectedRoutes>
  }/>


<Route 
    path="/customers/create" 
    element={
    <ProtectedRoutes 
      rolesPropos={["USER", "STAFF", "ADMIN"]}> 
      <CreateCustomer /> 
    </ProtectedRoutes>
  }/>

<Route 
    path="/customers" 
    element={
    <ProtectedRoutes 
      rolesPropos={["USER", "STAFF", "ADMIN"]}> 
      <CustomerDetails /> 
    </ProtectedRoutes>
  }/>



  {/* //ORDEM DE SERVIÇO */}

  <Route 
    path="/orders/all" 
    element={
    <ProtectedRoutes 
      rolesPropos={["STAFF", "ADMIN"]}> 
      <ListOrders /> 
    </ProtectedRoutes>
  }/>

  <Route 
    path="/orders" 
    element={
    <ProtectedRoutes 
      rolesPropos={["USER", "STAFF", "ADMIN"]}>
      <ListOrdersByUser />
    </ProtectedRoutes>
  }/>

  <Route 
    path="/orders/create" 
    element={
    <ProtectedRoutes 
      rolesPropos={["USER", "STAFF", "ADMIN"]}>
      <CreateOrder />
    </ProtectedRoutes>
  }/>

  <Route 
    path="/orders/edit/:id" 
    element={
    <ProtectedRoutes 
      rolesPropos={["USER", "STAFF", "ADMIN"]}>
      <EditOrder />
    </ProtectedRoutes>
  }/>

  <Route 
    path="/orders/details/:id" 
    element={
    <ProtectedRoutes 
      rolesPropos={["USER", "STAFF", "ADMIN"]}>
      <Details />
    </ProtectedRoutes>
  }/>

  {/* //VEÍCULOS */}

  <Route 
    path="/vehicles" 
    element={
    <ProtectedRoutes 
      rolesPropos={["USER", "STAFF", "ADMIN"]}>
      <ListVehiclesByUser />
    </ProtectedRoutes>
  }/>

<Route 
    path="/vehicles/create" 
    element={
    <ProtectedRoutes 
      rolesPropos={["USER", "STAFF", "ADMIN"]}>
      <CreateVehicle />
    </ProtectedRoutes>
  }/>

<Route 
    path="/vehicles/all" 
    element={
    <ProtectedRoutes
      rolesPropos={["STAFF", "ADMIN"]}>
      <ListVehiclesByUser />
    </ProtectedRoutes>
  }/>

{/* //TÉCNICOS */} 
<Route 
    path="/technicians" 
    element={
    <ProtectedRoutes 
      rolesPropos={["USER", "STAFF", "ADMIN"]}>
      <ListTechnician />
    </ProtectedRoutes>
  }/>


  <Route 
    path='*' 
    element={
      <Box>
        <Typography 
          variant="h5" 
          component="h5">
            404
        </Typography>
        <Typography 
          variant="h5" 
          component="h5">
            Page not found
        </Typography>
      </Box>
    }/>
  </Routes>
</Layout>   
  );
}

export default App;
import * as React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Routes , Route } from 'react-router-dom';
import { CreateOrder } from './features/orders/CreateOrder';
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
import { ListCustomers } from './features/customers/ListCustomers';
import { EditCustomer } from './features/customers/EditCustomer';
import { CreateTechnician } from './features/technician/CreateTechnician';
import { EditTechnician } from './features/technician/EditTechnician';

function App(){

  return (

<Layout>
<Routes>

<Route 
    path="/" 
    element={
    <ProtectedRoutes 
      rolesParam={["ANONYMOUS", "USER", "STAFF", "ADMIN"]}> 
      <Home/> 
    </ProtectedRoutes>
  }/>

<Route 
    path="/customers/create" 
    element={
    <ProtectedRoutes 
      rolesParam={["USER", "STAFF", "ADMIN"]}> 
      <CreateCustomer /> 
    </ProtectedRoutes>
  }/>

<Route 
    path="/customers" 
    element={
    <ProtectedRoutes 
      rolesParam={["STAFF", "ADMIN"]}> 
      <ListCustomers /> 
    </ProtectedRoutes>
  }/>

<Route 
    path="/customers/details/:email" 
    element={
    <ProtectedRoutes 
      rolesParam={["USER", "STAFF", "ADMIN"]}> 
      <CustomerDetails /> 
    </ProtectedRoutes>
  }/>

<Route 
    path="/customers/edit/:id" 
    element={
    <ProtectedRoutes 
      rolesParam={["USER","STAFF", "ADMIN"]}> 
      <EditCustomer /> 
    </ProtectedRoutes>
  }/>

  {/* //ORDEM DE SERVIÇO */}

  <Route 
    path="/orders" 
    element={
    <ProtectedRoutes 
      rolesParam={["USER", "STAFF", "ADMIN"]}>
      <ListOrdersByUser />
    </ProtectedRoutes>
  }/>

  <Route 
    path="/orders/create" 
    element={
    <ProtectedRoutes 
      rolesParam={["USER", "STAFF", "ADMIN"]}>
      <CreateOrder />
    </ProtectedRoutes>
  }/>

  <Route 
    path="/orders/edit/:id" 
    element={
    <ProtectedRoutes 
      rolesParam={["USER", "STAFF", "ADMIN"]}>
      <EditOrder />
    </ProtectedRoutes>
  }/>

  <Route 
    path="/orders/details/:id" 
    element={
    <ProtectedRoutes 
      rolesParam={["USER", "STAFF", "ADMIN"]}>
      <Details />
    </ProtectedRoutes>
  }/>

  {/* //VEÍCULOS */}

  <Route 
    path="/vehicles" 
    element={
    <ProtectedRoutes 
      rolesParam={["USER", "STAFF", "ADMIN"]}>
      <ListVehiclesByUser />
    </ProtectedRoutes>
  }/>

<Route 
    path="/vehicles/create" 
    element={
    <ProtectedRoutes 
      rolesParam={["USER", "STAFF", "ADMIN"]}>
      <CreateVehicle />
    </ProtectedRoutes>
  }/>

<Route 
    path="/vehicles/all" 
    element={
    <ProtectedRoutes
      rolesParam={["STAFF", "ADMIN"]}>
      <ListVehiclesByUser />
    </ProtectedRoutes>
  }/>

{/* //TÉCNICOS */} 
<Route 
    path="/technicians" 
    element={
    <ProtectedRoutes 
      rolesParam={["USER", "STAFF", "ADMIN"]}>
      <ListTechnician />
    </ProtectedRoutes>
  }/>

  <Route 
    path="/technicians/create" 
    element={
    <ProtectedRoutes 
      rolesParam={["STAFF", "ADMIN"]}>
      <CreateTechnician />
    </ProtectedRoutes>
  }/>

<Route 
    path="/technicians/edit/:id" 
    element={
    <ProtectedRoutes 
      rolesParam={["STAFF", "ADMIN"]}>
      <EditTechnician />
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
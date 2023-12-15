import { useParams } from "react-router-dom";
import { Box, Typography, Paper, TextField, Grid, FormControl, Button} from '@mui/material';
import { FormHelperText } from '@mui/material';
import { Link } from "react-router-dom";
import { Empty } from "../../components/Empty";
import { useGetCustomerByIdQuery } from "./SliceCustomer";

export const CustomerDetails = () => {

    let email = JSON.parse(localStorage.getItem("user") || "").email;
    const { data: customer , error: errOrder, isLoading } = useGetCustomerByIdQuery({ email });

    if(isLoading){
        return <h1>Loading...</h1>
    }

    if(errOrder){
        return (
            <Box>
            <Empty></Empty>
            <Typography></Typography>
            <Box display="flex" justifyContent="center">
            <Button 
                variant="contained"
                component={Link}
                color="primary"
                to="/customers/create"
                style={{ marginBottom: "1rem" }}
                >
                Complete seu cadastro
            </Button>
            </Box>
        </Box>
        );
    }

    return (
      
        <Paper>
          <Box p={2}>
              <Typography  
              textAlign="center"
              variant="h5" 
              component="h5">
                Meus dados
              </Typography>
          </Box>
          <Box>
            <Grid container spacing={2} sx={{p: 2}}>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth >
                  <TextField
                  id="name" 
                  type="text" 
                  defaultValue={customer?.firstName + " " + customer?.lastName} 
                  inputProps={
                    { readOnly: true }
                  } />
                  <FormHelperText>Nome</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth >
                  <TextField
                  id="name" 
                  type="text" 
                  defaultValue={customer?.email} 
                  inputProps={
                    { readOnly: true }
                  } />
                  <FormHelperText>Email</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth >
                <TextField
                id="status" 
                type="text" 
                defaultValue={ customer?.phone } 
                inputProps={
                  { readOnly: true }
                } />
                <FormHelperText>Telefone</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="street" type="text" 
                defaultValue={customer?.address.street} 
                inputProps={
                  { readOnly: true }
                } />
                <FormHelperText>Endereço</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="number" type="text" 
                defaultValue={customer?.address.number} 
                inputProps={
                  { readOnly: true }
                } />
                <FormHelperText>Número</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="neighborhood" type="text" 
                defaultValue={customer?.address.neighborhood} 
                inputProps={
                  { readOnly: true }
                } />
                <FormHelperText>Bairro</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="city" type="text" 
                defaultValue={customer?.address.city} 
                inputProps={
                  { readOnly: true }
                } />
                <FormHelperText>Cidade</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="state" type="text" 
                defaultValue={customer?.address.state} 
                inputProps={
                  { readOnly: true }
                } />
                <FormHelperText>Estado</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="zipCode" type="text" 
                defaultValue={customer?.address.zipCode} 
                inputProps={
                  { readOnly: true }
                } />
                <FormHelperText>CEP</FormHelperText>
                </FormControl>
              </Grid>


              <Grid item xs={12} sm={12} sx={{ m: 2, marginTop: 0}}>
                  <Box display="flex" gap={2} justifyContent="center">
                    <Button 
                      component={Link} 
                      to="/"
                      variant="contained" 
                      color="primary">
                      Back
                    </Button>

                    <Button 
                      component={Link}
                      to={`/customers/edit/${customer?.id}`}
                      variant="contained" 
                      color="success">
                      Editar
                    </Button>
                  </Box>
                </Grid>
              
            </Grid>
          </Box>
        </Paper>
    )
}
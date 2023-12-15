import {
    Box,
    Button,
    FormControl,
    Grid,
    TextField,
    Typography
  } from '@mui/material';
import { Link } from 'react-router-dom';
import { CustomerDto } from '../../../types/Customer';
  
  type Props = {
      customer: CustomerDto;
      isDisabled?: boolean;
      isLoading?: boolean;
      handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
      hadleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
  
  export function CustomerForm({
      customer,
      isDisabled = false,
      isLoading = false,
      handleSubmit,
      hadleChange,
  }: Props) {

      if(isLoading) {
        return <Typography>Carregando...</Typography>
      }

      const user =JSON.parse(localStorage.getItem('user') || ''); 
      const firstName = user.name.split(' ')[0];
      const lastName = user.name.split(' ')[1];

      return (
        
          <Box>
            <form onSubmit={handleSubmit}>

            <Grid container spacing={2} sx={{p: 2}}>

            <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                    <TextField 
                      label="email" 
                      name="email"
                      value={user.email}
                      inputProps={
                        { readOnly: true, }
                      }
                      />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                    <TextField 
                      label="primeiro nome" 
                      name="firstName"
                      value={firstName}
                      inputProps={
                        { readOnly: true, }
                      }
                      />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                    <TextField 
                      label="ultimo nome" 
                      name="lastName"
                      value={lastName}
                      inputProps={
                        { readOnly: true, }
                      }
                      />
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth >
                  <TextField 
                      label="telefone" 
                      name="phone"
                      value={customer.phone || ''}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                  <TextField 
                      label="endereço" 
                      name="street"
                      value={customer.address.street || ''}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                    <TextField 
                      label="número" 
                      name="number"
                      value={customer.address.number || ''}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                  </FormControl>
                </Grid>
 
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth >
                  <TextField 
                      label="bairro" 
                      name="neighborhood"
                      value={customer.address.neighborhood || ''}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth >
                  <TextField 
                      label="cidade" 
                      name="city"
                      value={customer.address.city || ''}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth >
                  <TextField 
                      label="estado" 
                      name="state"
                      value={customer.address.state || ''}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth >
                  <TextField 
                      label="cep" 
                      name="zipCode"
                      value={customer.address.zipCode || ''}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                  </FormControl>
                </Grid>
  
                <Grid item xs={12} sm={12} sx={{ m: 2, marginTop: 0}}>
                  <Box display="flex" gap={2} justifyContent="center">
                    <Button 
                    component={Link} 
                    to="/vehicles"
                    variant="contained" 
                    color="primary"
                    disabled={isDisabled}
                    >
                    Back
                    </Button>

                    <Button 
                    type="submit" 
                    variant="contained" 
                    color="success"
                    disabled={isDisabled}
                    >
                    {isLoading ? "Loading..." : "Save"}
                    </Button>
                  </Box>
                </Grid>
            </Grid>
          </form>
        </Box>
      );
  }
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
  } from '@mui/material';
import { Link } from 'react-router-dom';
import { CustomerDto } from '../../../types/Customer';
  
  type Props = {
      customer: CustomerDto;
      errors: any;
      isDisabled?: boolean;
      isLoading?: boolean;
      handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
      hadleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      hadleSelectChange: (e: SelectChangeEvent<String>) => void;
    }
  
  export function CustomerForm({
      customer,
      errors,
      isDisabled = false,
      isLoading = false,
      handleSubmit,
      hadleChange,
      hadleSelectChange
  }: Props) {

  if(isLoading) {
    return <Typography>Carregando...</Typography>
  }

  return (
      <Box>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{p: 2}}>

            <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                <TextField 
                  label="nome"
                  id="name" 
                  name="name"
                  value={customer?.firstName + " " + customer?.lastName} 
                  inputProps={
                    { readOnly: true, }
                  }
                  />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                <TextField 
                  label="email" 
                  name="email"
                  value={customer.email}
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
                  error={errors.phone}
                  />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                <InputLabel id="status">status</InputLabel>
                <Select
                label="status"
                id="status"
                disabled={isDisabled} 
                displayEmpty
                name="status"
                value={customer.status} 
                onChange={hadleSelectChange} 
                >
                <MenuItem key="0" value="PENDING_ACTIVATION" selected={true}>
                  <em>Pendente de ativação</em>
                </MenuItem>      
                <MenuItem key="1" value="ACTIVE">
                  <em>Ativo</em>
                </MenuItem> 
                <MenuItem key="2" value="INACTIVE">
                  <em>Inativo</em>
                </MenuItem>  
                <MenuItem key="3" value="BLOCKED">
                  <em>Bloqueado</em>
                </MenuItem>  
                <MenuItem key="4" value="FINANCIAL_PENDING">
                  <em>Pendencia financeira</em>
                </MenuItem>                
              </Select>
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
                  error={errors.street}
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
                  error={errors.number}
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
                  error={errors.neighborhood}
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
                  error={errors.city}
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
                  error={errors.state}
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
                  error={errors.zipCode}
                  />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} sx={{ m: 2, marginTop: 0}}>
              {errors.phone && <p>{errors.phone}</p>}
              {errors.street && <p>{errors.street}</p>}
              {errors.number && <p>{errors.number}</p>}
              {errors.neighborhood && <p>{errors.neighborhood}</p>}
              {errors.city && <p>{errors.city}</p>}
              {errors.state && <p>{errors.state}</p>}
              {errors.zipCode && <p>{errors.zipCode}</p>}
            </Grid>

            <Grid item xs={12} sm={12} sx={{ m: 2, marginTop: 0}}>
              <Box display="flex" gap={2} justifyContent="center">
                <Button 
                component={Link} 
                to="/customers"
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
import {
    Box,
    Button,
    FormControl,
    Grid,
    TextField,
    Typography
  } from '@mui/material';
import { Link } from 'react-router-dom';
import { VehicleDto } from '../../../types/Vehicle';
  
  type Props = {
      vehicle: VehicleDto;
      isDisabled?: boolean;
      isLoading?: boolean;
      handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
      hadleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
  
  export function VehicleForm({
      vehicle,
      isDisabled = false,
      isLoading = false,
      handleSubmit,
      hadleChange,
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
                      label="plateNumber" 
                      name="plateNumber"
                      value={vehicle.plateNumber}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                    <TextField 
                      label="renavam" 
                      name="renavam"
                      value={vehicle.renavam}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth >
                  <TextField 
                      label="brand" 
                      name="brand"
                      value={vehicle.brand}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                  <TextField 
                      label="model" 
                      name="model"
                      value={vehicle.model}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                    <TextField 
                      label="year" 
                      name="year"
                      value={vehicle.year}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                  </FormControl>
                </Grid>
 
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth >
                  <TextField 
                      label="color" 
                      name="color"
                      value={vehicle.color}
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
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
  } from '@mui/material';
  import { Link } from 'react-router-dom';
  import { OrderRequest } from '../../../types/Order';
  import { Vehicle, VehicleResponse } from '../../../types/Vehicle';
  import { DatePicker } from '@mui/x-date-pickers';
import { InputError } from '../../../types/InputError';
  
  type Props = {
      order: OrderRequest;
      vehicleResponse: VehicleResponse | undefined;
      isDisabled?: boolean;
      isLoading?: boolean;
      handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
      hadleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      hadleSelectChange: (e: SelectChangeEvent<String>) => void;
      hadleSelectChangeNumber: (e: SelectChangeEvent<Number>) => void;
      handleDateChange : (value: Date | null) => void;
      vehicleId: Number;
      inputError: InputError;
    }
  
  export function OrderForm({
      order,
      vehicleResponse,
      isDisabled = false,
      isLoading = false,
      handleSubmit,
      hadleChange,
      hadleSelectChange,
      hadleSelectChangeNumber,
      handleDateChange,
      vehicleId,
      inputError
  }: Props) {

    function mapDataToGridRows(vehicleResponse: VehicleResponse) {
      const { data: vehicles } = vehicleResponse;
        return vehicles.map((vehicle) => ({
          id: vehicle.id,
          name: vehicle.name,
          isActive: vehicle.isActive,
        }));
      }

      const vehicleList = vehicleResponse ? mapDataToGridRows(vehicleResponse) : [];

      return (
        
          <Box>
            <form onSubmit={handleSubmit}>

            <Grid 
            container spacing={2} item xs={12} 
            columns={{ xs: 6, sm: 6, md: 12 }}  
            justifyContent="center" 
            alignItems="center" 
            direction="column">
                <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <Select
                    labelId="vehicleId"
                    id='vehicleId'
                    name="vehicleId"
                    value={vehicleId} 
                    onChange={hadleSelectChangeNumber}
                    error={inputError.vehicleIdError}
                    >
                    <MenuItem key={0} value={0} selected={true}>
                      {vehicleList.length === 0 ? "Sem veículo cadastrado" : "Selecione"}
                    </MenuItem>
                    {
                    vehicleList.map(vehicle => {
                        return (
                            <MenuItem key={vehicle.id} value={vehicle.id}> 
                            <em> {vehicle.name}</em>
                            </MenuItem>
                        );
                    })};
                  </Select>
                  <FormHelperText>Selecione o veículo</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <DatePicker 
                    disablePast={true}
                    onChange={handleDateChange}
                    />
                    <FormHelperText>Selecione a data</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl sx={{ m: 1, width: 300 }}>
                    <Select
                    labelId="period"
                    id="period"
                    name="period"
                    displayEmpty
                    value={order.period} 
                    onChange={hadleSelectChange} 
                    error={inputError.periodError}
                    >
                    <MenuItem key="0" value="" selected={true}>Selecione</MenuItem>
                    <MenuItem key="1" value="MORNING" selected={true}>
                      <em>Manhã</em>
                    </MenuItem>      
                    <MenuItem key="2" value="AFTERNOON">
                      <em>Tarde</em>
                    </MenuItem>              
                  </Select>
                  <FormHelperText>Selecione o período</FormHelperText>
                  </FormControl>
                </Grid>
            

            <Grid item xs={12}>
                  <FormControl sx={{ m: 2, width: 300 }}>
                    <TextField 
                    name="description" 
                    value={order.description}
                    disabled={isDisabled} 
                    onChange={hadleChange}
                    />
                     <FormHelperText>Descrição</FormHelperText>
                    </FormControl>
            </Grid>
  
            <Grid item xs={12} sx={{ m: 2, marginTop: 0}}>
                <Box display="flex" gap={2}>
                    <Button 
                    component={Link} 
                    to="/orders"
                    variant="contained" 
                    color="success"
                    disabled={isDisabled}
                    >
                    Back
                    </Button>

                    <Button 
                    type="submit" 
                    variant="contained" 
                    color="secondary"
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
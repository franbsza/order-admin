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
  import { OrderDto } from '../../../types/Order';
  import { VehicleResponse } from '../../../types/Vehicle';
  import { DatePicker } from '@mui/x-date-pickers';
import { InputError } from '../../../types/InputError';
  
  type Props = {
      order: OrderDto;
      vehicleResponse: VehicleResponse | undefined;
      isDisabled?: boolean;
      isLoading?: boolean;
      handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
      hadleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      hadleSelectChange: (e: SelectChangeEvent<String>) => void;
      hadleSelectChangeNumber: (e: SelectChangeEvent<Number>) => void;
      handleDateChange : (value: string | null ) => void;
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

      if(isDisabled || isLoading) {
        return <Typography>Carregando...</Typography>
      }
  
      return (
          <Box>
            <form onSubmit={handleSubmit}>

            <Grid container spacing={2} sx={{p: 2}}>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                      <TextField 
                      label="email do associado" 
                      name="name"
                      defaultValue={order.email || ""} 
                      inputProps={
                        { readOnly: true }
                      }
                      />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth >
                  <InputLabel id="veiculo">veículo</InputLabel>
                  <Select
                    label="veiculo"
                    id="veiculo"
                    disabled={isDisabled} 
                    name="vehicleId"
                    displayEmpty
                    value={order.vehicle?.id || 0} 
                    onChange={hadleSelectChangeNumber}
                    error={inputError.vehicleIdError}
                    >
                    <MenuItem key={0} value={0} selected={true}>
                      {vehicleList.length > 0 ?  "Selecione um veículo" : "Sem veículo cadastrado"}
                    </MenuItem>
                    {
                      vehicleList.length > 0 &&
                        vehicleList.map((vehicle) => (
                          <MenuItem key={vehicle.id} value={vehicle.id}>
                            {vehicle.name}
                          </MenuItem>
                        ))
                      }
       
                  </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <DatePicker 
                    label="data atendimento"
                    disabled={isDisabled} 
                    disablePast={true}
                    format='DD/MM/YYYY'
                    slotProps={{
                      textField: {
                        error: inputError.dateTimeError,
                        name: 'dateTime'
                      }
                    }}
                    onChange={handleDateChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                    <InputLabel id="periodo">período</InputLabel>
                    <Select
                    label="periodo"
                    id="periodo"
                    disabled={isDisabled} 
                    displayEmpty
                    name="period"
                    value={order.period || ""} 
                    onChange={hadleSelectChange} 
                    error={inputError.periodError}
                    >
                    <MenuItem key="1" value="MORNING" selected={true}>
                      <em>Manhã</em>
                    </MenuItem>      
                    <MenuItem key="2" value="AFTERNOON">
                      <em>Tarde</em>
                    </MenuItem>              
                  </Select>
                  </FormControl>
                </Grid>
 
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                      <TextField 
                      label="endereço" 
                      name="street"
                      value={order.address.street || ""}
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
                      value={order.address.number || ""}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                      <TextField 
                      label="bairro" 
                      name="neighborhood"
                      value={order.address.neighborhood || ""}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                      <TextField 
                      label="cidade"
                      name="city" 
                      value={order.address.city || ""}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                      <TextField 
                      label="estado" 
                      name="state"
                      value={order.address.state || ""}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth >
                      <TextField 
                      label="CEP" 
                      name="zipCode"
                      value={order.address.zipCode || ""}
                      disabled={isDisabled} 
                      onChange={hadleChange}
                      />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                    <InputLabel id="orderStatus">status</InputLabel>
                    <Select
                    label="orderStatus"
                    id="orderStatus"
                    disabled={isDisabled} 
                    name="orderStatus"
                    displayEmpty
                    value={order.orderStatus || "0"} 
                    onChange={hadleSelectChange} 
                    >
                    <MenuItem key="0" value="OPEN" selected={true} >
                      <em>Em aberto</em>
                    </MenuItem>      
                    <MenuItem key="1" value="IN_PROGRESS">
                      <em>Em andamento</em>
                    </MenuItem> 
                    <MenuItem key="2" value="PENDING">
                      <em>Pendente</em>
                    </MenuItem>  
                    <MenuItem key="3" value="CANCELED">
                      <em>Cancelada</em>
                    </MenuItem>  
                    <MenuItem key="4" value="COMPLETED_SUCCESS">
                      <em>Concluída</em>
                    </MenuItem>                
                  </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} sx={{ m: 2, marginTop: 0}}>
                  <Box display="flex" gap={2} justifyContent="center">
                    <Button 
                    component={Link} 
                    to="/orders"
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
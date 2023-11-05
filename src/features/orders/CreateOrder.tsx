import { Box, Typography, Paper, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCreateOrderMutation } from '../orders/SliceOrder';
import { useGetVehiclesQuery } from '../vehicle/SliceVehicle';
import { OrderRequest} from '../../types/Order';
import { useSnackbar } from 'notistack';
import { OrderForm } from './components/OrderForm';

export const CreateOrder = () => {

  const [vehicleId, setVehicleId] = useState<Number>(0);
  const { enqueueSnackbar } = useSnackbar();
  const [createOrder, status] = useCreateOrderMutation();
  const { data, error , isFetching} = useGetVehiclesQuery();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading] = useState(false);
  const [orderState, setOrderState] = useState<OrderRequest>({
    serviceId: 1,
    addressId: 1,
    vehicleId: 1,
    orderStatus: "OPEN",
    period: "", 
    dateTime: new Date(),
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderState({ ...orderState, [name]: value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    await createOrder(orderState);
  };

  const hadleSelectChange = (e: SelectChangeEvent<String>) => {
    const { name, value } = e.target;
    setOrderState({ ...orderState, [name]: value });
  };

  const hadleSelectChangeNumber = (e: SelectChangeEvent<Number>) => {
    const { name, value } = e.target;
    setOrderState({ ...orderState, [name]: value });
    setVehicleId(value as number);
  };

  const handleDateChange = (value: Date | null) => {
    const data =  value || new Date();
    setOrderState({ ...orderState, dateTime: data });
  };

  useEffect(() => {
    if(status.isSuccess){
      enqueueSnackbar("Order created successfully", { variant: "success" });
      setIsDisabled(true);
    }
    if(status.error){
      enqueueSnackbar("Order not created", { variant: "error" });
    }
  }, [enqueueSnackbar, status.isSuccess, status.error]);

    return (

      <Box>
        <Paper>
          <Box p={2}>
              <Typography  
              textAlign="center"
              variant="h5" 
              component="h5">
                Abrir ordem de serviço
              </Typography>
          </Box>

          <OrderForm
          order={orderState}
          vehicleResponse={data}
          isDisabled={isLoading}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          hadleChange={handleChange}
          hadleSelectChange={hadleSelectChange}
          hadleSelectChangeNumber={hadleSelectChangeNumber}
          handleDateChange={handleDateChange}
          vehicleId={vehicleId}
          />
        </Paper>
      </Box>
   );
  }
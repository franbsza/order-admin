import { Box, Typography, Paper, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCreateOrderMutation } from '../orders/SliceOrder';
import { useGetVehiclesQuery } from '../vehicle/SliceVehicle';
import { OrderDto } from '../../types/Order';
import { useSnackbar } from 'notistack';
import { OrderForm } from './components/OrderForm';
import { InputError } from '../../types/InputError';

export const CreateOrder = () => {

  const { enqueueSnackbar } = useSnackbar();
  const [createOrder, status] = useCreateOrderMutation();
  const { data: vehicles , error , isFetching} = useGetVehiclesQuery(
    { 
      page: 0, 
      perPage: 10
    }
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading] = useState(false);
  const [orderState, setOrderState] = useState<OrderDto>({
        id: 0,
        serviceId: 1,
        serviceName: "",
        address: {
          id: 0,
          street: "",
          number: "",
          neighborhood: "",
          city: "",
          state: "",
          zipCode: ""
        },
        vehicle: {
          id: 0,
          name: "",
          isActive: false,
          brand: "",
          model: "",
          year: "",
          plateNumber: "",
          color: "",
          renavam: "",
          isProtected: false
        },
        orderStatus: "OPEN",
        period: "", 
        dateTime: new Date(),
        description: "",
        expertTechnicianName: ""
  });

  const [inputError, setInputError] = useState<InputError>({
    vehicleIdError: false,
    dateTimeError: false,
    periodError: false
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name === "description"){
      setOrderState({ ...orderState, [name]: value });
    }
    else{
      setOrderState({ 
        ...orderState, 
        address: {...orderState.address, [name]: value }
      });
    }}

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    setInputError({...inputError, 
      vehicleIdError:false, 
      periodError: false, 
      dateTimeError: false
    });
    var isValid = true;

    if(orderState.vehicle.id === 0){
      setInputError({...inputError, vehicleIdError: true})
      isValid = false;
    }
    if (orderState.period === "") {
      setInputError({...inputError, periodError: true})
      isValid = false;
    }
    if (orderState.dateTime === null) {
      setInputError({...inputError, dateTimeError: true})
      isValid = false;
    }
    if(isValid){
      await createOrder(orderState);
    }
  };

  const hadleSelectChange = (e: SelectChangeEvent<String>) => {
    const { name, value } = e.target;
    setInputError({...inputError, periodError: false, 
    });
    if(value === ""){
      setInputError({...inputError, periodError: true})
    }
    else{
      setInputError({...inputError, periodError: false})
    }
    setOrderState({ ...orderState, [name]: value });
 };

 const hadleSelectChangeNumber = (e: SelectChangeEvent<Number>) => {
  const { name, value } = e.target;
  setInputError({...inputError, vehicleIdError:false
  });
  if(value === 0){
    setInputError({...inputError, vehicleIdError: true})
  }
  else{
    setInputError({...inputError, vehicleIdError: false})
    const vehicleChange = vehicles?.data.find(v => v.id === value);
    setOrderState({ 
      ...orderState, 
      vehicle: vehicleChange as OrderDto['vehicle']
    });
  }
};

  const handleDateChange = (value: string | null) => {
    const data = value === null ? new Date() : new Date(value);
    setOrderState({ ...orderState, dateTime: data });
  };

  useEffect(() => {
    if(status.isSuccess){
      enqueueSnackbar("Ordem de serviço criada", { variant: "success" });
      setIsDisabled(true);
    }
    if(status.error){
      enqueueSnackbar("Ocorreu um erro ao criar a ordem de serviço", { variant: "error" });
    }
  }, [enqueueSnackbar, status.isSuccess, status.error]);

    if(isFetching){
      return <div>Loading...</div>
    }
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
          vehicleResponse={vehicles}
          isDisabled={isLoading}
          isLoading={isFetching}
          handleSubmit={handleSubmit}
          hadleChange={handleChange}
          hadleSelectChange={hadleSelectChange}
          hadleSelectChangeNumber={hadleSelectChangeNumber}
          handleDateChange={handleDateChange}
          inputError={inputError}
          />
        </Paper>
      </Box>
   );
  }
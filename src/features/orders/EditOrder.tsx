import { Box, Typography, Paper, SelectChangeEvent} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderForm } from './components/OrderForm';
import { useGetOrderByIdQuery, useUpdateOrderMutation} from './SliceOrder';
import { useGetVehiclesQuery } from '../vehicle/SliceVehicle';
import { useSnackbar } from 'notistack'
import { OrderDto} from '../../types/Order';
import { InputError } from '../../types/InputError';
   
  export const EditOrder = () => {
  
    const id = useParams().id as string;
    const { data: order , error: errOrder, isLoading } = useGetOrderByIdQuery({ id });
    const [isDisabled, setIsDisabled] = useState(false);
    const { data: vehicles , error: errorVehicle , isFetching} = useGetVehiclesQuery(
      { 
        page: 0, 
        perPage: 10
      }
    );
    const [updateOrder, status] = useUpdateOrderMutation();
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
        id: 1,
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
  
    const { enqueueSnackbar } = useSnackbar();
  
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
      }
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsDisabled(true);
      updateOrder(orderState);
    };
  
    const hadleSelectChange = (e: SelectChangeEvent<String>) => {
        const { name, value } = e.target;
        setInputError({...inputError, 
          periodError: false, 
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
        setInputError({...inputError, 
          vehicleIdError:false
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
      if (order) {
        setOrderState(order);

      }
    }, [order]);

    useEffect(() => {
      if (status.isSuccess) {
        enqueueSnackbar("Ordem de serviço editada com sucesso", { variant: "success" });
        setIsDisabled(false);
      }
      if (status.error) {
        enqueueSnackbar("Ocorreu um erro ao editar a ordem de serviço", { variant: "error" });
      }
    }, [enqueueSnackbar, status.error, status.isSuccess]);
  
    if(isFetching || isLoading){
      return <Typography>Loading...</Typography>
    }
    else{

      return (
  
        <Paper>
          <Box p={2}>
              <Typography  
              textAlign="center"
              variant="h5" 
              component="h5">
                Editar ordem de serviço
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
      );
    }
  }
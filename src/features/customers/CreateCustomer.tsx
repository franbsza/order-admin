import { Box, Typography, Paper } from '@mui/material';
import { useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';
import { CustomerDto } from '../../types/Customer';
import { CustomerForm } from './components/CustomerForm';
import { useCreateCustomerMutation } from './SliceCustomer';

export const CreateCustomer = () => {

  const { enqueueSnackbar } = useSnackbar();
  const [createCustomer, { isError, error, isSuccess }] = useCreateCustomerMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading] = useState(false);
  
  let user = JSON.parse(localStorage.getItem("user") || "");
  const firstName = user.name.split(' ')[0];
  const lastName = user.name.split(' ')[1];
  const email = user.email;

  const [customerState, setCustomerState] = useState<CustomerDto>({
    id: 0,
    firstName: firstName,
    lastName: lastName,
    status: "",
    phone: "",
    email: email,
    address: {
      id: 0,
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: ""
    }
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
      if(name === "phone"){
        setCustomerState({ ...customerState, phone: value });
        console.log(customerState);
      }
      else{
        setCustomerState({ 
            ...customerState, 
            address: {...customerState.address, [name]: value }
          });
          console.log(customerState);
      }
    }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    await createCustomer(customerState);
  };

  useEffect(() => {
    if(isSuccess){
      enqueueSnackbar("Cadastro concluído", { variant: "success" });
      setIsDisabled(true);
    }
    if(error){
        enqueueSnackbar("Erro ao se cadastrar", { variant: "error" });
    }
  }, [enqueueSnackbar, isSuccess, error]);

    return (

      <Box>
        <Paper>
          <Box p={2}>
              <Typography  
              textAlign="center"
              variant="h5" 
              component="h5">
                Complete seu cadastro
              </Typography>
          </Box>

          <CustomerForm
          customer={customerState}
          isDisabled={isLoading}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          hadleChange={handleChange}
          />
        </Paper>
      </Box>
   );
  }
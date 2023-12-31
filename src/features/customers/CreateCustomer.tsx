import { Box, Typography, Paper, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { CustomerDto } from '../../types/Customer';
import { CustomerForm } from './components/CustomerForm';
import { useCreateCustomerMutation } from './SliceCustomer';
import { useAppSelector } from '../../app/hooks';
import { selectRoles, selectUserDetails } from '../auth/SliceAuth';

export const CreateCustomer = () => {

  const { enqueueSnackbar } = useSnackbar();
  const [createCustomer, { error, isSuccess }] = useCreateCustomerMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading] = useState(false);
  const [errors, setErrors] = useState({})
  const userDetails = useAppSelector(selectUserDetails);
  const [isRolePermitted, setIsRolePermitted] = useState(true);
  const roles = useAppSelector(selectRoles) as string[];
  const [customerState, setCustomerState] = useState<CustomerDto>({
    id: 0,
    firstName: userDetails.given_name,
    lastName: userDetails.family_name,
    status: "PENDING_ACTIVATION",
    phone: "",
    email: userDetails.email,
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


  const formValidation = (value: String, name: String) => {

    if(name === "phone") {
        if((value === "" || value.length < 12)){
            setErrors({ ...errors, phone: "telefone não pode ser vazio e deve ter 12 digitos." });
        }
        else{
            setErrors({ ...errors, phone: ""});
        }
    }
    
    if (name === "street") {
        if(value === ""){
            setErrors({ ...errors, street: "endereço não pode ser vazio."});
        }
        else{
            setErrors({ ...errors, street: ""});
        }
    }

    if (name === "number") {
        if (value === "") {
            setErrors({ ...errors, number: "número não pode ser vazio." });
        }
        else {
            setErrors({ ...errors, number: ""});
        }
    }

    if (name === "neighborhood") {
        if (value === "") {
            setErrors({ ...errors, neighborhood: "bairro não pode ser vazio."});
        }
        else {
            setErrors({ ...errors, neighborhood: ""});
        }
    }

    if (name === "city") {
        if(value === ""){
            setErrors({ ...errors, city: "cidade não pode ser vazio."});
        }
        else{
            setErrors({ ...errors, city: ""});
        }
    }

    if (name === "state") {
        if(value === ""){
            setErrors({ ...errors, state: "estado não pode ser vazio."});
        }
        else{
            setErrors({...errors, state: ""});
        }
    }

    if (name === "zipCode") {
        if(value === ""){
            setErrors({ ...errors, zipCode: "cep não pode ser vazio."});
        }
        else{
            setErrors({ ...errors, zipCode: "" });
        }
    }
    if(name === "status"){
        if(value === ""){
            setErrors({ ...errors, status: "status não pode ser vazio."});
        }
        else{
            setErrors({ ...errors, status: ""});
        }
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
      formValidation(value, name);
      if(name === "phone"){
        setCustomerState({ ...customerState, phone: value });
      }
      else{
        setCustomerState({ 
            ...customerState, 
            address: {...customerState.address, [name]: value }
        });
      }
    }

    const hadleSelectChange = (e: SelectChangeEvent<String>) => {
      const { name, value } = e.target;
      if(roles.includes("STAFF") || roles.includes("ADMIN")){ 
          setCustomerState({ ...customerState, [name]: value });
      }else{
          setIsRolePermitted(false);
      }
   };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setIsDisabled(true);
    await createCustomer(customerState);
  };

  useEffect(() => {
    if (!isRolePermitted) {
      enqueueSnackbar("Você não tem permissão para alterar o status", { variant: "error" });
    }
  }, [isRolePermitted, enqueueSnackbar]);


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
          errors={errors}
          isDisabled={isDisabled}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          hadleChange={handleChange}
          hadleSelectChange={hadleSelectChange}
          />
        </Paper>
      </Box>
   );
  }
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, SelectChangeEvent } from '@mui/material';
import { useGetCustomerByIdQuery, useUpdateCustomerMutation } from "./SliceCustomer";
import { CustomerForm } from "./components/CustomerForm";
import { useEffect, useState } from "react";
import { CustomerDto } from "../../types/Customer";
import { useSnackbar } from "notistack";
import { useAppSelector } from "../../app/hooks";
import { selectRoles } from "../auth/SliceAuth";

export const EditCustomer = () => {

    const id = useParams().id as string;
    const { data: customer , isLoading } = useGetCustomerByIdQuery({ id });
    const [updateCustomer, status] = useUpdateCustomerMutation();
    const [errors, setErrors] = useState({});
    const [isRolePermitted, setIsRolePermitted] = useState(true);
    const roles = useAppSelector(selectRoles) as string[];
    const { enqueueSnackbar } = useSnackbar();
    const [customerState, setCustomerState] = useState<CustomerDto>({
            id: 0,
            firstName: customer ? customer.firstName : "",
            lastName: customer ? customer.lastName : "",
            status: "",
            phone: "",
            email: customer ? customer.email : "",
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
        formValidation(value, name);       
        if(name === "phone") {
            setCustomerState({ ...customerState, phone: value });
        }
        else{
            setCustomerState({ 
                ...customerState, 
                address: {...customerState.address, [name]: value }
            });
        }
    }
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      updateCustomer(customerState);
    };

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
  
    const hadleSelectChange = (e: SelectChangeEvent<String>) => {
        const { name, value } = e.target;
        if(roles.includes("STAFF") || roles.includes("ADMIN")){ 
            setCustomerState({ ...customerState, [name]: value });
        }else{
            setIsRolePermitted(false);
        }
     };
  
    useEffect(() => {
      if (!isRolePermitted) {
        enqueueSnackbar("Você não tem permissão para alterar o status", { variant: "error" });
      }
    }, [isRolePermitted, enqueueSnackbar]);

    useEffect(() => {
        if (customer) {
          setCustomerState(customer);
        }
      }, [customer]);

    useEffect(() => {
      if (status.isSuccess) {
        enqueueSnackbar("Cadastro editado com sucesso", { variant: "success" });
      }
      if (status.error) {
        enqueueSnackbar("Ocorreu um erro ao editar cadastro", { variant: "error" });
      }
    }, [enqueueSnackbar, status.error, status.isSuccess]);
  
    if(isLoading){
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
                Editar cadastro
              </Typography>
          </Box>

          <CustomerForm
          customer={customerState}
          errors={errors}
          isDisabled={isLoading}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          hadleChange={handleChange}
          hadleSelectChange={hadleSelectChange}
          />
        </Paper>
      );
    }
}
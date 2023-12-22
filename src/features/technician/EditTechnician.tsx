import { Box, Typography, Paper, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { TechnicianDto } from '../../types/Technician';
import { useGetTechnicianByIdQuery, useUpdateTechnicianMutation } from './SliceTechnician';
import { TechnicianForm } from './components/TechnicianForm';
import { useParams } from 'react-router-dom';

export const EditTechnician = () => {

  const id = useParams().id as string;
  const { enqueueSnackbar } = useSnackbar();
  const { data: technician , isLoading } = useGetTechnicianByIdQuery({ id });
  const [updateTechnician, status] = useUpdateTechnicianMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [technicianState, setTechnicianState] = useState<TechnicianDto>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    isActive: true,
    documentNumber: "",
    isPartner: true,
    personalAddress: {
      id: 0,
      address: "",
      city: "",
      state: "",
      zipCode: "",
      neighborhood: "",
      number: "",
      baseAddress: {
        id: 0,
        region: ""
      }
    }
  });

  useEffect(() => {
    if (technician) {
      setTechnicianState(technician);
    }
  }, [technician]);

  const formValidation = (value: String, name: String) => {
    if(name === "documentNumber"){ 
        if(value === ""){
            setErrors({ ...errors, documentNumber: "documento não pode ser vazio." });
        }
        else{
            setErrors({ ...errors, documentNumber: ""});
        }
    }

    if(name === "name"){ 
        if(value === ""){
            setErrors({ ...errors, name: "nome não pode ser vazio." });
        }
        else{
            setErrors({ ...errors, name: ""});
        }
    }

    if(name === "email"){ 
        if((value === "" || value.length < 12)){
            setErrors({ ...errors, email: "email não pode ser vazio." });
        }
        else{
            setErrors({ ...errors, email: ""});
        }
    }

    if(name === "phone") {
        if((value === "" || value.length < 12)){
            setErrors({ ...errors, phone: "telefone não pode ser vazio e deve ter 12 digitos." });
        }
        else{
            setErrors({ ...errors, phone: ""});
        }
    }
    
    if (name === "address") {
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
      if(name === "documentNumber" || name === "name" || name === "email" || name === "phone"){ 
        setTechnicianState({ ...technicianState, [name]: value });
      }
      else{
        setTechnicianState({ 
            ...technicianState, 
            personalAddress: {...technicianState.personalAddress, [name]: value }
        });
      }
    }

    const hadleSelectChange = (e: SelectChangeEvent<Number>) => {
      const { value } = e.target;
        setTechnicianState(
            {
                ...technicianState,
                personalAddress: {
                    ...technicianState.personalAddress,
                    baseAddress: {
                        ...technicianState.personalAddress.baseAddress,
                        id: Number(value)
                    }
                }
            }
        );
   };

   const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setTechnicianState({ ...technicianState, [name]: checked });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setIsDisabled(true);
    await updateTechnician(technicianState);
  };

  useEffect(() => {
    if(status.isSuccess){
      enqueueSnackbar("Cadastro alterado com sucesso", { variant: "success" });
      setIsDisabled(true);
    }
    if(status.error){
        enqueueSnackbar("Erro ao alterarcadastro tecnico", { variant: "error" });
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
                Edite o cadastro do tecnico
              </Typography>
          </Box>

          <TechnicianForm
          technician={technicianState}
          errors={errors}
          isDisabled={isDisabled}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          hadleChange={handleChange}
          hadleSelectChange={hadleSelectChange}
          handleToggle={handleToggle}
          />
        </Paper>
      </Box>
   );
}
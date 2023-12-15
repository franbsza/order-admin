import { Box, Typography, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCreateVehicleMutation } from '../vehicle/SliceVehicle';
import { useSnackbar } from 'notistack';
import { VehicleForm } from './components/VehicleForm';
import { VehicleDto } from '../../types/Vehicle';

export const CreateVehicle = () => {

  const { enqueueSnackbar } = useSnackbar();
  const [createVehicle, { isError, error, isSuccess }] = useCreateVehicleMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading] = useState(false);
  let email = JSON.parse(localStorage.getItem("user") || "").email;
  const [vehicleState, setVehicleState] = useState<VehicleDto>({
          id: 0,
          name: "",
          isActive: true,
          brand: "",
          model: "",
          year: "",
          plateNumber: "",
          color: "",
          renavam: "",
          isProtected: true,
          email: email,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
      setVehicleState({ ...vehicleState, [name]: value });
    }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    console.log(vehicleState);
    await createVehicle(vehicleState);
  };

  useEffect(() => {
    if(isSuccess){
      enqueueSnackbar("Veiculo cadastrado com sucesso", { variant: "success" });
      setIsDisabled(true);
    }
    if(error){
      if('status' in error){
        if(error.status === 404){
          enqueueSnackbar("Complete seu cadastro antes de cadastrar um veículo", { variant: "error" });
        }
      }
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
                Cadastrar novo veículo 
              </Typography>
          </Box>

          <VehicleForm
          vehicle={vehicleState}
          isDisabled={isLoading}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          hadleChange={handleChange}
          />
        </Paper>
      </Box>
   );
  }
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "./SliceOrder";
import { Box, Typography, Paper, TextField, Grid, FormControl, Button} from '@mui/material';
import dayjs from "dayjs";
import { FormHelperText } from '@mui/material';
import { Link } from "react-router-dom";
import { Empty } from "../../components/Empty";

export const Details = () => {

    const id = useParams().id as string;
    const { data: order , error: errOrder, isLoading } = useGetOrderByIdQuery({ id });
    
    function mapStatus(status: String) {
      switch (status) {
        case "OPEN":
          return "Em aberto";
        case "IN_PROGRESS":
          return "Em andamento";
        case "PENDING":
          return "Pendente";
        case "CANCELED":
          return "Cancelado";
        case "COMPLETED_SUCCESS":
          return "Concluído";
        default:
          return "Indefinido";
      } 
    }

    if(isLoading){
        return <h1>Loading...</h1>
    }

    if(errOrder){
        return <Empty></Empty>
    }

    return (
      
        <Paper>
          <Box p={2}>
              <Typography  
              textAlign="center"
              variant="h5" 
              component="h5">
                Detalhes ordem de serviço
              </Typography>
          </Box>
          <Box>
            <Grid container spacing={2} sx={{p: 2}}>

            <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth >
                  <TextField
                  id="email do associado" 
                  type="text" 
                  defaultValue={order?.email} 
                  inputProps={
                    { readOnly: true }
                  } />
                  <FormHelperText>Email do associado</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth >
                  <TextField
                  id="vehicle" 
                  type="text" 
                  defaultValue={order?.vehicle.name} 
                  inputProps={
                    { readOnly: true }
                  } />
                  <FormHelperText>Veículo</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="dateTime" type="text" 
                defaultValue={ dayjs(order?.dateTime).format("DD/MM/YYYY")} 
                inputProps={
                  { readOnly: true }
                } />
              <FormHelperText>Data de solicitação</FormHelperText>
              </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="period" type="text" 
                defaultValue={order?.period === "AFTERNOON" ? "Tarde" : "Manhã"} 
                inputProps={
                  { readOnly: true }
                }
                 />
                <FormHelperText>Período</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth >
                <TextField
                id="status" 
                type="text" 
                defaultValue={ mapStatus(order?.orderStatus || 'Indefinido') } 
                inputProps={
                  { readOnly: true }
                } />
                <FormHelperText>Status</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="street" type="text" 
                defaultValue={order?.address.street} 
                inputProps={
                  { readOnly: true }
                } />
                <FormHelperText>Endereço</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="number" type="text" 
                defaultValue={order?.address.number} 
                inputProps={
                  { readOnly: true }
                } />
                <FormHelperText>Número</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="neighborhood" type="text" 
                defaultValue={order?.address.neighborhood} 
                inputProps={
                  { readOnly: true }
                } />
                <FormHelperText>Bairro</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="city" type="text" 
                defaultValue={order?.address.city} 
                inputProps={
                  { readOnly: true }
                } />
                <FormHelperText>Cidade</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="state" type="text" 
                defaultValue={order?.address.state} 
                inputProps={
                  { readOnly: true }
                } />
                <FormHelperText>Estado</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="zipCode" type="text" 
                defaultValue={order?.address.zipCode} 
                inputProps={
                  { readOnly: true }
                } />
                <FormHelperText>CEP</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="expertTechnicianName" type="text" 
                defaultValue={order?.expertTechnicianName || "sem técnico responsável"}  
                inputProps={
                  { readOnly: true }
                } />
                <FormHelperText>Técnico responsável</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} sx={{ m: 2, marginTop: 0}}>
                  <Box display="flex" gap={2} justifyContent="center">
                    <Button 
                      component={Link} 
                      to="/orders"
                      variant="contained" 
                      color="primary">
                      Back
                    </Button>

                    <Button 
                      component={Link}
                      to={`/orders/edit/${order?.id}`}
                      variant="contained" 
                      color="success">
                      Editar
                    </Button>
                  </Box>
                </Grid>
              
            </Grid>
          </Box>
        </Paper>
    )
}
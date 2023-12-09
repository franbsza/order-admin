import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "./SliceOrder";
import { Box, Typography, Paper, TextField, Grid, FormControl, InputLabel, Button} from '@mui/material';
import dayjs from "dayjs";
import { FormHelperText } from '@mui/material';
import { Link } from "react-router-dom";

export const Details = () => {

    const id = useParams().id as string;
    const { data: order , error: errOrder, isLoading } = useGetOrderByIdQuery({ id });


    if(isLoading){
        return <h1>Loading...</h1>
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
                  id="vehicle" 
                  type="text" 
                  value={order?.vehicle.name} 
                  disabled />
                  <FormHelperText>Veículo</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="dateTime" type="text" 
                value={ dayjs(order?.dateTime).format("DD/MM/YYYY")} 
                disabled />
              <FormHelperText>Data de solicitação</FormHelperText>
              </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="period" type="text" 
                value={order?.period} 
                disabled />
                <FormHelperText>Período</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth >
                <TextField
                id="status" 
                type="text" 
                value={ order?.orderStatus } 
                disabled />
                <FormHelperText>Status</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="street" type="text" 
                value={order?.address.street} 
                disabled />
                <FormHelperText>Endereço</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="number" type="text" 
                value={order?.address.number} 
                disabled />
                <FormHelperText>Número</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="neighborhood" type="text" 
                value={order?.address.neighborhood} 
                disabled />
                <FormHelperText>Bairro</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="city" type="text" 
                value={order?.address.city} 
                disabled />
                <FormHelperText>Cidade</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="state" type="text" 
                value={order?.address.state} 
                disabled />
                <FormHelperText>Estado</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="zipCode" type="text" 
                value={order?.address.zipCode} 
                disabled />
                <FormHelperText>CEP</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="expertTechnicianName" type="text" 
                value={order?.expertTechnicianName}  
                defaultValue="sem técnico responsável"
                disabled />
                <FormHelperText>Técnico responsável</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth >
                <TextField
                id="description" type="text" 
                value={order?.description} 
                defaultValue="sem descricão"
                disabled />
                <FormHelperText>Descrição</FormHelperText>
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
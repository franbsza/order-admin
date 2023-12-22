import { Box, Button, Typography} from '@mui/material';
import { selectRoles, selectUserDetails } from "../features/auth/SliceAuth";
import { useAppSelector } from '../app/hooks';
import { useGetCustomerByEmailQuery } from '../features/customers/SliceCustomer';
import { Link } from 'react-router-dom';

let displayName = "";

export const Home = () => {
    const userDetails = useAppSelector(selectUserDetails);
    const email = userDetails.email;
    const roles = useAppSelector(selectRoles) as string[];
    const { error, isLoading } = useGetCustomerByEmailQuery({ email });

  if(userDetails){
    displayName = userDetails.name;
  }

  if(isLoading){
    return <h1>Loading...</h1>
  }

    return (
        <Box p={2}>
              <Typography  
              textAlign="center"
              variant="h5" 
              component="h5"
              color={"primary"}>
                Bem-vindo(a) {" " + displayName} 
              </Typography>
        <Box p={2}></Box>

        <Box display="flex" justifyContent="center" 
        visibility={error && roles.includes("USER") ? "visible" : "hidden"}>
            <Button 
            variant="contained"
            component={Link}
            color="primary"
            to="/customers/create"
            style={{ marginBottom: "1rem" }}
            >
            Complete seu cadastro
            </Button>
        </Box>
      </Box>
    )
};
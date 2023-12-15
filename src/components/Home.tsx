import { Box, Typography} from '@mui/material';

let displayName = "";
const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "") : null;
if(user && user.name){
  const names = user.name.split(" ");
  if(names.length > 1){
  let firstName = names[0].charAt(0).toUpperCase() + names[0].slice(1);
  let lastName = names[1].charAt(0).toUpperCase() + names[1].slice(1);
  displayName = firstName + " " + lastName;
  }
}

export const Home = () => {
    return (
        <Box p={2}>
              <Typography  
              textAlign="center"
              variant="h5" 
              component="h5"
              color={"primary"}>
                Bem-vindo(a) {" " + displayName} 
              </Typography>
          </Box>
    )
};
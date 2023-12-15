import { Box, Typography} from '@mui/material';


export const Empty = () => {
    return (
        <Box p={2}>
              <Typography  
              textAlign="center"
              variant="h5" 
              component="h5"
              color={"primary"}>
                Não há dados para mostrar
              </Typography>
          </Box>
    )
};
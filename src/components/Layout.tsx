import React from 'react'
import { Container } from '@mui/system';
import { Box } from '@mui/material';

export default function Layout({ children } : { children: React.ReactNode }) {
  return (
   <Box>
    <Container maxWidth="lg" 
        sx={{ mt: 5, mb: 5 }}>
      {children}
    </Container>
   </Box>
  )
}
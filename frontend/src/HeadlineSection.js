import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

const HeadlineSection = () => {
  return (
    <Box
      sx={{
        pt: 15, // padding vertical
        pb: 8,
        px: 2, // padding horizontal
        textAlign: 'center',
        backgroundColor: '#222',
        color: '#fff',
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Bem-vindo à Vizzuary
      </Typography>
      <Typography variant="subtitle1" color="text.white" sx={{ mb: 4 }}>
        Plataforma criativa para conectar empresas, designers e gráficas.
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" color="primary">
          Começar agora
        </Button>
        <Button variant="outlined" color="primary">
          Saiba mais
        </Button>
      </Stack>
    </Box>
  );
};

export default HeadlineSection;

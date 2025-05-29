import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';

const LandingPage = () => {

    const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#000' }}>
        <Toolbar>
          <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Vizzuary</Typography>
            <Stack direction="row" spacing={2}>
              <Button color="inherit" onClick={() => navigate('/login')}>Entrar</Button>
              <Button
                variant="outlined"
                sx={{ color: '#fff', borderColor: '#fff' }}
                onClick={() => navigate('/register')}
              >
                Registrar
              </Button>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Headline */}
      <Box
        sx={{
          py: 10,
          px: 2,
          textAlign: 'center',
          backgroundColor: '#f0f0f0',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom>
            Plataforma Criativa Vizzuary
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 4 }}>
            Conectando empresas, designers e gráficas em um só lugar.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" color="primary">
              Comece Agora
            </Button>
            <Button variant="outlined" color="primary">
              Saiba Mais
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Seção de Benefícios */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Como a Vizzuary te ajuda
        </Typography>
        <Grid container spacing={4} mt={2}>
          {[
            {
              title: 'Designers criativos',
              description: 'Encontre talentos para criar e finalizar seus projetos.',
            },
            {
              title: 'Conexão com gráficas',
              description: 'Solicite impressões profissionais com praticidade.',
            },
            {
              title: 'Gerencie seus pedidos',
              description: 'Acompanhe o processo do início ao fim em um só painel.',
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Sobre */}
      <Box sx={{ py: 8, backgroundColor: '#fafafa' }}>
        <Container maxWidth="md">
          <Typography variant="h4" textAlign="center" gutterBottom>
            Sobre a Vizzuary
          </Typography>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body1" textAlign="center" color="text.secondary">
            A Vizzuary é uma plataforma que une empresas, designers e serviços de impressão,
            criando um ecossistema criativo acessível e eficiente para todos os envolvidos.
            Ideal para quem quer transformar ideias em projetos prontos com agilidade e qualidade.
          </Typography>
        </Container>
      </Box>

      {/* Rodapé */}
      <Box sx={{ py: 4, backgroundColor: '#000', color: '#fff', textAlign: 'center' }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Vizzuary. Todos os direitos reservados.
        </Typography>
      </Box>
    </>
  );
};

export default LandingPage;
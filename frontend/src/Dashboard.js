// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  CircularProgress,
  Box,
} from '@mui/material';
import CreateProjectForm from './CreateProjectForm';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Buscar projetos da API
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const user = getAuth().currentUser;
      if (user) {
        const token = await user.getIdToken();
        const response = await axios.get('http://localhost:5000/api/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Resposta da API:', response.data);
        setData(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error('Erro ao buscar dados protegidos:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Logout do Firebase
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/login'); // redireciona para login após logout
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Mostrar token no console
  const handleShowToken = async () => {
    const user = getAuth().currentUser;
    if (user) {
      const token = await user.getIdToken(true);
      console.log('ID Token:', token);
      alert('Token impresso no console.');
    } else {
      alert('Usuário não está logado.');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Vizzuary - Dashboard
          </Typography>
          <Button color="inherit" onClick={handleShowToken}>
            Mostrar Token
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Conteúdo */}
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Painel de Projetos
        </Typography>

        {/* Formulário para criar projetos */}
        <CreateProjectForm onProjectCreated={fetchProjects} />

        {/* Lista ou loading */}
        {loading ? (
          <CircularProgress />
        ) : Array.isArray(data) && data.length > 0 ? (
          data.map((item) => (
            <Box key={item.id} mb={2}>
              <Typography variant="body1">ID: {item.id}</Typography>
              <Typography variant="body2">
                Nome: {item.nome || 'Sem nome'}
              </Typography>
              <hr />
            </Box>
          ))
        ) : (
          <Typography>Nenhum projeto encontrado.</Typography>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
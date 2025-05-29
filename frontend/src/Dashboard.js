import React, { useEffect, useState } from 'react';
import HeadlineSection from './HeadlineSection';
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
  Paper,
  Divider,
  Stack,
  IconButton,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CreateProjectForm from './CreateProjectForm';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        setData(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error('Erro ao buscar dados protegidos:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

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

  const handleDelete = async (projectId) => {
    const confirm = window.confirm('Tem certeza que deseja excluir este projeto?');
    if (!confirm) return;

    try {
      const user = getAuth().currentUser;
      const token = await user.getIdToken();

      await axios.delete(`http://localhost:5000/api/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchProjects(); // Atualiza a lista após exclusão
    } catch (error) {
      console.error('Erro na requisição DELETE:', error.response || error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);



  return (
    <>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ backgroundColor: '#111' }}>
        <Toolbar>
          <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Vizzuary - Dashboard
            </Typography>
            <Box>
                <Button
                variant="contained"
                sx={{
                    backgroundColor: '#fff',
                    color: '#000',              // texto preto
                    '&:hover': { backgroundColor: '#ccc' }
                }}
                onClick={handleShowToken}
                >
                Mostrar Token
                </Button>
                <Button variant="contained" color="white" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      <>
  <HeadlineSection sx={{ mt: 5, pt: 7 }} />
  {/* outros componentes */}
</>

      {/* Conteúdo */}
      <Container sx={{ mt: 4}}>
        <Typography variant="h4" gutterBottom>
          Painel de Projetos
        </Typography>

        {/* Formulário */}
        <CreateProjectForm onProjectCreated={fetchProjects} />
        <Typography variant="h5" gutterBottom sx={{ pt: 5 }}>
          Visualização de Projetos em Lista
        </Typography>
        {/* Lista */}
        {loading ? (
          <CircularProgress />
        ) : Array.isArray(data) && data.length > 0 ? (
          data.map((item) => (
            <Paper key={item.id} sx={{ px: 2, py: 3, mb: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2">ID: {item.id}</Typography>
                  <Typography variant="body1">Nome: {item.nome || 'Sem nome'}</Typography>
                </Box>
                <Box>
                  <IconButton color="primary" aria-label="editar" onClick={() => alert('Funcionalidade de edição em breve.')}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" aria-label="excluir" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Stack>
            </Paper>
          ))
        ) : (
          <Typography>Nenhum projeto encontrado.</Typography>
        )}
        <Typography variant="h5" gutterBottom sx={{ pt: 5 }}>
          Visualização de Projetos em Cards
        </Typography>
        {loading ? (
  <CircularProgress />
)
 : Array.isArray(data) && data.length > 0 ? (
  <Grid container spacing={2}>
    {data.map((item) => (
      <Grid item xs={12} sm={6} md={4} key={item.id} size={4}>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={1}>
            <Typography variant="subtitle2">ID: {item.id}</Typography>
            <Typography variant="body1">Nome: {item.nome || 'Sem nome'}</Typography>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <IconButton color="primary" aria-label="editar" onClick={() => alert('Funcionalidade de edição em breve.')}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" aria-label="excluir" onClick={() => handleDelete(item.id)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    ))}
  </Grid>
) : (
  <Typography>Nenhum projeto encontrado.</Typography>
)}
        <Typography variant="h5" gutterBottom sx={{ pt: 5 }}>
          Visualização de Projetos em Tabela
        </Typography>
{loading ? (
  <CircularProgress />
) : Array.isArray(data) && data.length > 0 ? (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Nome</TableCell>
        <TableCell align="right">Ações</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.id}</TableCell>
          <TableCell>{item.nome || 'Sem nome'}</TableCell>
          <TableCell align="right">
            <IconButton color="primary" aria-label="editar" onClick={() => alert('Funcionalidade de edição em breve.')}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" aria-label="excluir" onClick={() => handleDelete(item.id)}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
) : (
  <Typography>Nenhum projeto encontrado.</Typography>
)}

      </Container>
    </>
  );
};

export default Dashboard;

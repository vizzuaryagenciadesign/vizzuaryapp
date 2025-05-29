import React, { useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const CreateProjectForm = ({ onProjectCreated }) => {
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validação mínima
    if (!nome || nome.trim().length < 3) {
      setError('O nome do projeto deve ter pelo menos 3 caracteres.');
      setLoading(false);
      return;
    }

    try {
      const user = getAuth().currentUser;
      if (!user) throw new Error('Usuário não autenticado');

      const token = await user.getIdToken();

      await axios.post(
        'http://localhost:5000/api/projects',
        { nome },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMsg('Projeto criado com sucesso!');
      setOpenSnackbar(true);
      setNome('');
      onProjectCreated(); // Atualiza lista
    } catch (err) {
      setError(err.message || 'Erro ao criar projeto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Criar Novo Projeto
      </Typography>

      <TextField
        label="Nome do Projeto"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        fullWidth
        required
        margin="normal"
      />

      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 1 }}>
          {error}
        </Typography>
      )}

        <Button
        type="submit"
        variant="contained"
        disabled={loading}
        startIcon={<AddIcon />}
        sx={{
            backgroundColor: '#000',      // fundo preto
            color: '#fff',                // texto branco
            '&:hover': {
            backgroundColor: '#333',    // fundo um pouco mais claro no hover
            },
        }}
        >
        {loading ? 'Criando...' : 'Criar Projeto'}
        </Button>

      {/* Snackbar de sucesso */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {successMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateProjectForm;

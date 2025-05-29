import React, { useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { TextField, Button, Box, Typography } from '@mui/material';

const CreateProjectForm = ({ onProjectCreated }) => {
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
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

      setNome('');
      onProjectCreated(); // para atualizar a lista no Dashboard
    } catch (err) {
      setError(err.message || 'Erro ao criar projeto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Typography variant="h6">Criar Novo Projeto</Typography>
      <TextField
        label="Nome do Projeto"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? 'Criando...' : 'Criar Projeto'}
      </Button>
    </Box>
  );
};

export default CreateProjectForm;
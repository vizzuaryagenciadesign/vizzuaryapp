// src/pages/Register.js
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, Container, Typography } from '@mui/material';

function Register() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      setMensagem('Usuário registrado com sucesso!');
    } catch (error) {
      setMensagem(`Erro: ${error.message}`);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" gutterBottom>Registro</Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="E-mail"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Registrar
        </Button>
      </form>
      {mensagem && <Typography variant="body2" color="secondary" mt={2}>{mensagem}</Typography>}
    </Container>
  );
}

export default Register;
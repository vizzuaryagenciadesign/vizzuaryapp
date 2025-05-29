import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  Stack,
  Link,
} from "@mui/material";

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMensagem("");
    setError("");

    if (!email || !senha) {
      setError("Por favor, preencha email e senha.");
      return;
    }

    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      setMensagem("Usuário registrado com sucesso! Redirecionando...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(`Erro: ${err.message}`);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom align="center">
        Registro
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {mensagem && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {mensagem}
        </Alert>
      )}

      <form onSubmit={handleRegister}>
        <TextField
          label="E-mail"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          inputProps={{ minLength: 6 }}
          helperText="Senha deve ter ao menos 6 caracteres"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Registrar
        </Button>
      </form>

      <Stack spacing={2} sx={{ mt: 3 }} alignItems="center">
        <Typography variant="body2">
          Já tem uma conta?{" "}
          <Link component={RouterLink} to="/login">
            Faça login
          </Link>
        </Typography>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/")}
          fullWidth
        >
          Voltar à Página Inicial
        </Button>
      </Stack>
    </Container>
  );
}

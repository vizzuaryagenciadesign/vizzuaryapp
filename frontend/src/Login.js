import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  Stack,
  Link
} from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Erro ao fazer login: " + err.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 6 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Senha"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Entrar
        </Button>
      </form>

      <Stack direction="column" spacing={2} sx={{ mt: 3 }}>
        <Typography variant="body2" align="center">
          Ainda não tem uma conta?{" "}
          <Link component={RouterLink} to="/register">
            Registre-se
          </Link>
        </Typography>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => navigate("/")}
        >
          Voltar à Página Inicial
        </Button>
      </Stack>
    </Container>
  );
}

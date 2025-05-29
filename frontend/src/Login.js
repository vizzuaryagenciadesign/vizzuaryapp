import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, TextField, Typography, Container, Alert } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login realizado com sucesso!");
      // Aqui você pode redirecionar ou atualizar estado global etc.
    } catch (err) {
      setError("Erro ao fazer login: " + err.message);
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "2rem" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
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
          style={{ marginTop: "1rem" }}
        >
          Entrar
        </Button>
      </form>
    </Container>
  );
}
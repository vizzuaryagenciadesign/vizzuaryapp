import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const token = await userCredential.user.getIdToken();
      console.log('ID Token:', token); // Copie esse token e use no Postman
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;

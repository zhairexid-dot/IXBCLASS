import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err) {
      setError('Gagal login/daftar: ' + err.message);
    }
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">{isSignup ? 'Daftar' : 'Login'}</Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField margin="normal" fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>{isSignup ? 'Daftar' : 'Login'}</Button>
          <Button onClick={() => setIsSignup(!isSignup)} sx={{ mt: 2 }}>{isSignup ? 'Sudah punya akun? Login' : 'Belum punya akun? Daftar'}</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;

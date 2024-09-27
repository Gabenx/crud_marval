import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importamos el hook useNavigate
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';

const Login = ({ setAuthToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Declara navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', {
        username,
        password,
      });

      const token = response.data.token;
      setAuthToken(token);
      localStorage.setItem('token', token);
      setError('');

      // Redirige a /proveedores después del inicio de sesión exitoso
      navigate('/proveedores');

    } catch (error) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }}>
        <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Iniciar sesión
          </Typography>
        </Box>

        <form onSubmit={handleLogin}>
          <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" sx={{ marginBottom: '20px' }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '20px' }}
          >
            Iniciar sesión
          </Button>
        </form>

        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
          <Typography variant="body2">
            ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;

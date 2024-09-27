import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();  // Creamos una instancia del hook useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/signup', {
        username,
        password,
        rol: 'user', // Rol por defecto para los nuevos usuarios
      });

      // Verifica si el registro fue exitoso
      if (response.status === 201) {
        setSuccessMessage('Usuario registrado con éxito');
        setError('');
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      // Captura los errores y muestra mensajes
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Error al registrar usuario');
      }
      setSuccessMessage('');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: '20px', marginTop: '50px' }}>
        <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Registrarse
          </Typography>
        </Box>

        <form onSubmit={handleRegister}>
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

          {successMessage && (
            <Typography color="primary" sx={{ marginBottom: '20px' }}>
              {successMessage}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '20px' }}
          >
            Registrarse
          </Button>
        </form>

        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
          <Typography variant="body2">
            ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;

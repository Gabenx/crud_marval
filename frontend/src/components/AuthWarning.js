import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Button, Box } from '@mui/material';

const AuthWarning = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige al login después de 5 segundos
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000);

    // Limpiar el temporizador si el componente se desmonta antes de que pase el tiempo
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: '30px', textAlign: 'center', marginTop: '40px' }}>
        <Typography variant="h4" color="error" gutterBottom>
          Acceso denegado
        </Typography>
        <Typography variant="body1" gutterBottom>
          Es necesario autenticarse para acceder a estos recursos.
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Redirigiendo al login en 5 segundos...
        </Typography>
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/login')}
          >
            Ir al Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthWarning;

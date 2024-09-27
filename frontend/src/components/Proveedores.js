import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import axios from 'axios';

const Proveedores = ({ authToken, handleLogout }) => {
  const [proveedores, setProveedores] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await axios.get('/proveedores', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setProveedores(response.data);
      } catch (error) {
        setError('Error al cargar los proveedores');
      }
    };

    fetchProveedores();
  }, [authToken]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: '40px' }}>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" gutterBottom>
            Lista de Proveedores
          </Typography>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ marginBottom: '20px' }}>
            {error}
          </Typography>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>NIT</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Cédula</TableCell>
                <TableCell>Tipo de Proveedor</TableCell>
                <TableCell>Tipo de Persona</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {proveedores.map((proveedor) => (
                <TableRow key={proveedor.nit}>
                  <TableCell>{proveedor.nit}</TableCell>
                  <TableCell>{proveedor.nombre}</TableCell>
                  <TableCell>{proveedor.apellido}</TableCell>
                  <TableCell>{proveedor.cedula}</TableCell>
                  <TableCell>{proveedor.tipo_proveedor}</TableCell>
                  <TableCell>{proveedor.tipo_persona}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginRight: 1 }}
                      onClick={() => {
                        window.location.href = `/view-proveedor?id=${proveedor.nit}`;
                      }}
                    >
                      Ver/Modificar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        // Función para eliminar proveedor
                      }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              window.location.href = '/add-proveedor';
            }}
          >
            Añadir Proveedor
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Proveedores;

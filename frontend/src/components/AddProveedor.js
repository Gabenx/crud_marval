import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Grid, Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';
import { handleBeneficiarioChange, handleChange, handleDatosBancariosChange, handleAddBeneficiario, validarCampos, handleDeleteBeneficiario } from '../utils/proveedorUtils';


const AddProveedor = ({ handleLogout }) => {
  const [proveedor, setProveedor] = useState({
    nit: '',
    nombre: '',
    apellido: '',
    cedula: '',
    tipo_proveedor: 'Nacional',
    tipo_persona: 'Natural',
    beneficiarios: [{ nombre: '', cedula: '' }],
    datos_bancarios: { banco: '', cuenta: '', tipo_cuenta: 'Ahorros' },
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Verifica si todos los campos requeridos están llenos
    if (!validarCampos(proveedor)) {
      alert("Todos los campos deben ser completados");
      return; // Detiene la ejecución si hay campos vacíos
    }
    e.preventDefault();
    try {
      await axios.post('/proveedor', proveedor);
      setMessage('Proveedor añadido exitosamente');
      setError('');
      // Redirigir a /proveedores después de añadir el proveedor exitosamente
      navigate('/proveedores');
    } catch (error) {
      setError('Error al añadir el proveedor');
      setMessage('');
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '40px' }}>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Añadir Proveedor
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
        {message && (
          <Typography color="primary" sx={{ marginBottom: '20px' }}>
            {message}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="NIT"
                name="nit"
                value={proveedor.nit}
                onChange={(e) => handleChange(e, setProveedor)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                name="nombre"
                value={proveedor.nombre}
                onChange={(e) => handleChange(e, setProveedor)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Apellido"
                name="apellido"
                value={proveedor.apellido}
                onChange={(e) => handleChange(e, setProveedor)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Cédula"
                name="cedula"
                value={proveedor.cedula}
                onChange={(e) => handleChange(e, setProveedor)}
                fullWidth
                required
              />
            </Grid>

            {/* Tipo de Proveedor */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Tipo de Proveedor</InputLabel>
                <Select
                  name="tipo_proveedor"
                  value={proveedor.tipo_proveedor}
                  onChange={(e) => handleChange(e, setProveedor)}
                >
                  <MenuItem value="Nacional">Nacional</MenuItem>
                  <MenuItem value="Internacional">Internacional</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Tipo de Persona */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Tipo de Persona</InputLabel>
                <Select
                  name="tipo_persona"
                  value={proveedor.tipo_persona}
                  onChange={(e) => handleChange(e, setProveedor)}
                >
                  <MenuItem value="Natural">Natural</MenuItem>
                  <MenuItem value="Jurídica">Jurídica</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Beneficiarios */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Beneficiarios
              </Typography>
            </Grid>
            {proveedor.beneficiarios.map((beneficiario, index) => (
              <Grid container spacing={2} key={index} sx={{ marginBottom: '10px', ml:0.4 }}>
                <Grid item xs={12} sm={5}>
                  <TextField
                    label={`Nombre Beneficiario ${index + 1}`}
                    value={beneficiario.nombre}
                    onChange={(e) => handleBeneficiarioChange(index, 'nombre', e.target.value, proveedor.beneficiarios, setProveedor)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    label={`Cédula Beneficiario ${index + 1}`}
                    value={beneficiario.cedula}
                    onChange={(e) => handleBeneficiarioChange(index, 'cedula', e.target.value, proveedor.beneficiarios, setProveedor)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  {proveedor.beneficiarios.length > 1 && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteBeneficiario(setProveedor, proveedor, index)}
                      fullWidth
                    >
                      Eliminar
                    </Button>
                  )}
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleAddBeneficiario(setProveedor, proveedor)}
                size="small"
              >
                Añadir Beneficiario
              </Button>
            </Grid>

            {/* Datos Bancarios */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Datos Bancarios
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Banco"
                value={proveedor.datos_bancarios.banco}
                onChange={(e) => handleDatosBancariosChange('banco', e.target.value, setProveedor)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Número de Cuenta"
                value={proveedor.datos_bancarios.cuenta}
                onChange={(e) => handleDatosBancariosChange('cuenta', e.target.value, setProveedor)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required>
                <InputLabel>Tipo de Cuenta</InputLabel>
                <Select
                  name="tipo_cuenta"
                  value={proveedor.datos_bancarios.tipo_cuenta}
                  onChange={(e) => handleDatosBancariosChange('tipo_cuenta', e.target.value, setProveedor)}
                >
                  <MenuItem value="Ahorros">Ahorros</MenuItem>
                  <MenuItem value="Corriente">Corriente</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Botón para añadir proveedor */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Añadir Proveedor
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddProveedor;

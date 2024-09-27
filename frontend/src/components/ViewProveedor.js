import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { handleBeneficiarioChange, handleChange, handleDatosBancariosChange, handleAddBeneficiario, validarCampos, handleDeleteBeneficiario } from '../utils/proveedorUtils';
import { Container, Paper, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const ViewProveedor = () => {
  const [proveedorId, setProveedorId] = useState('');
  const [proveedor, setProveedor] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.rol === 'admin') {
        setIsAdmin(true);  // El usuario es admin
      }
    }
  }, []);

  const handleFetchProveedor = async () => {
    try {
      const response = await axios.get(`/proveedor/${proveedorId}`);
      setProveedor(response.data);
      setError('');
    } catch (error) {
      setError('Error al obtener el proveedor');
    }
  };

  const handleValidarProveedor = (estado, id) => {
    axios.put(`/proveedor/${id}/validar`, { estado }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(response => {
        setProveedor(prevState => ({ ...prevState, estado }));  // Actualizar el estado del proveedor
      })
      .catch(error => {
        console.error('Error al validar proveedor', error);
      });
  };

  const handleDeleteProveedor = async () => {
    try {
      await axios.delete(`/proveedor/${proveedorId}`);
      alert('Proveedor eliminado exitosamente');
      setProveedor(null);
    } catch (error) {
      setError('Error al eliminar el proveedor');
    }
  };

  const handleUpdateProveedor = async () => {
    if (!validarCampos(proveedor)) {
      alert("Todos los campos deben ser completados");
      return;
    }

    try {
      await axios.put(`/proveedor/${proveedorId}`, proveedor);
      alert('Proveedor actualizado exitosamente');
      setIsEditing(false);
    } catch (error) {
      setError('Error al actualizar el proveedor');
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '40px' }}>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Ver, Modificar o Eliminar Proveedor
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} sx={{ marginBottom: '20px' }}>
            <TextField
              label="ID del Proveedor"
              value={proveedorId}
              onChange={(e) => setProveedorId(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFetchProveedor}
              fullWidth
            >
              Obtener Proveedor
            </Button>
          </Grid>
        </Grid>

        {proveedor && (
          <div>
            {isEditing ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="NIT"
                    value={proveedor.nit}
                    onChange={(e) => handleChange(e, setProveedor)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nombre"
                    value={proveedor.nombre}
                    onChange={(e) => handleChange(e, setProveedor)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Apellido"
                    value={proveedor.apellido}
                    onChange={(e) => handleChange(e, setProveedor)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Cédula"
                    value={proveedor.cedula}
                    onChange={(e) => handleChange(e, setProveedor)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Tipo de Proveedor</InputLabel>
                    <Select
                      value={proveedor.tipo_proveedor}
                      onChange={(e) => handleChange(e, setProveedor)}
                    >
                      <MenuItem value="Nacional">Nacional</MenuItem>
                      <MenuItem value="Internacional">Internacional</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Tipo de Persona</InputLabel>
                    <Select
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
                  {proveedor.beneficiarios && proveedor.beneficiarios.map((beneficiario, index) => (
                    <Grid container spacing={2} key={index} sx={{ marginBottom: '15px' }}>
                      <Grid item xs={12} sm={5}>
                        <TextField
                          label={`Nombre Beneficiario ${index + 1}`}
                          value={beneficiario.nombre}
                          onChange={(e) => handleBeneficiarioChange(index, 'nombre', e.target.value, proveedor.beneficiarios, setProveedor)}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <TextField
                          label={`Cédula Beneficiario ${index + 1}`}
                          value={beneficiario.cedula}
                          onChange={(e) => handleBeneficiarioChange(index, 'cedula', e.target.value, proveedor.beneficiarios, setProveedor)}
                          fullWidth
                        />
                      </Grid>
                      {proveedor.beneficiarios.length > 1 && (
                        <Grid item xs={12} sm={2}>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteBeneficiario(setProveedor, proveedor, index)}
                            fullWidth
                          >
                            Eliminar
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  ))}
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleAddBeneficiario(setProveedor, proveedor)}
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
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Número de Cuenta"
                    value={proveedor.datos_bancarios.cuenta}
                    onChange={(e) => handleDatosBancariosChange('cuenta', e.target.value, setProveedor)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Tipo de Cuenta</InputLabel>
                    <Select
                      value={proveedor.datos_bancarios.tipo_cuenta}
                      onChange={(e) => handleDatosBancariosChange('tipo_cuenta', e.target.value, setProveedor)}
                    >
                      <MenuItem value="Ahorros">Ahorros</MenuItem>
                      <MenuItem value="Corriente">Corriente</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={handleUpdateProveedor}>
                    Actualizar
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={() => navigate('/proveedores')}
                  >
                    VOLVER A PROVEEDORES
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <div>
                <Typography variant="h6" gutterBottom>
                  Detalles del Proveedor
                </Typography>
                <p><strong>NIT:</strong> {proveedor.nit}</p>
                <p><strong>Nombre:</strong> {proveedor.nombre}</p>
                <p><strong>Apellido:</strong> {proveedor.apellido}</p>
                <p><strong>Cédula:</strong> {proveedor.cedula}</p>
                <p><strong>Tipo de Proveedor:</strong> {proveedor.tipo_proveedor}</p>
                <p><strong>Tipo de Persona:</strong> {proveedor.tipo_persona}</p>

                {/* Beneficiarios */}
                <Typography variant="h6" gutterBottom>
                  Beneficiarios
                </Typography>
                <ul>
                  {proveedor.beneficiarios.map((beneficiario, index) => (
                    <li key={index}>
                      Nombre: {beneficiario.nombre}, Cédula: {beneficiario.cedula}
                    </li>
                  ))}
                </ul>

                {/* Datos bancarios */}
                <Typography variant="h6" gutterBottom>
                  Datos Bancarios
                </Typography>
                <p><strong>Banco:</strong> {proveedor.datos_bancarios.banco}</p>
                <p><strong>Cuenta:</strong> {proveedor.datos_bancarios.cuenta}</p>
                <p><strong>Tipo de Cuenta:</strong> {proveedor.datos_bancarios.tipo_cuenta}</p>

                <p><strong>Estado:</strong> {proveedor.estado}</p>

                {/* Botones de aprobar o rechazar solo para admin */}
                {isAdmin && (
                  <div>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleValidarProveedor('Aprobado', proveedorId)}
                    >
                      Aprobar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleValidarProveedor('Rechazado', proveedorId)}
                      sx={{ marginLeft: '10px' }}
                    >
                      Rechazar
                    </Button>
                  </div>
                )}

                <Button variant="contained" color="primary" onClick={() => setIsEditing(true)} sx={{ marginTop: '20px' }}>
                  Modificar
                </Button>
                <Button variant="outlined" color="error" onClick={handleDeleteProveedor} sx={{ marginTop: '20px', marginLeft: '10px' }}>
                  Eliminar
                </Button>
              </div>
            )}
          </div>
        )}

        {error && (
          <Typography color="error" sx={{ marginTop: '20px' }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ViewProveedor;

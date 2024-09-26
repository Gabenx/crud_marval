import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Proveedores = ({ authToken, handleLogout }) => {
  const [proveedores, setProveedores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchProveedores = async () => {
    try {
      const response = await axios.get('/proveedores', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setProveedores(response.data);
    } catch (error) {
      console.error('Error al cargar proveedores:', error);
      setError('Error al cargar los proveedores');
    }
  };

  const handleCreateProveedor = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/proveedor',
        {
          nombre,
          apellido,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setSuccess('Proveedor creado exitosamente');
      setError('');
      fetchProveedores();
    } catch (error) {
      console.error('Error al crear proveedor:', error);
      setError('Error al crear proveedor');
      setSuccess('');
    }
  };

  const handleDeleteProveedor = async (id) => {
    try {
      await axios.delete(`/proveedor/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setSuccess('Proveedor eliminado exitosamente');
      setError('');
      fetchProveedores();
    } catch (error) {
      console.error('Error al eliminar proveedor:', error);
      setError('Error al eliminar proveedor');
      setSuccess('');
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  return (
    <div>
      <h2>Gestión de Proveedores</h2>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      
      <form onSubmit={handleCreateProveedor}>
        <div>
          <label>Nombre del proveedor:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label>Apellido del proveedor:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
        <button type="submit">Crear Proveedor</button>
      </form>

      <h3>Lista de Proveedores</h3>
      <ul>
        {proveedores.map((proveedor) => (
          <li key={proveedor.id}>
            {proveedor.nombre} {proveedor.apellido}
            <button onClick={() => handleDeleteProveedor(proveedor.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Proveedores;

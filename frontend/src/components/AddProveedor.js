import React, { useState } from 'react';
import axios from 'axios';

const AddProveedor = () => {
  const [proveedor, setProveedor] = useState({
    nit: '',
    nombre: '',
    apellido: '',
    cedula: '',
    tipo_proveedor: '',
    tipo_persona: '',
    beneficiarios: '',
    datos_bancarios: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setProveedor({
      ...proveedor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/proveedores', proveedor);
      alert('Proveedor añadido exitosamente');
    } catch (error) {
      setError('Error al añadir el proveedor');
    }
  };

  return (
    <div>
      <h1>Añadir Proveedor</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nit" placeholder="NIT" value={proveedor.nit} onChange={handleChange} />
        <input type="text" name="nombre" placeholder="Nombre" value={proveedor.nombre} onChange={handleChange} />
        <input type="text" name="apellido" placeholder="Apellido" value={proveedor.apellido} onChange={handleChange} />
        <input type="text" name="cedula" placeholder="Cédula" value={proveedor.cedula} onChange={handleChange} />
        <input type="text" name="tipo_proveedor" placeholder="Tipo de Proveedor" value={proveedor.tipo_proveedor} onChange={handleChange} />
        <input type="text" name="tipo_persona" placeholder="Tipo de Persona" value={proveedor.tipo_persona} onChange={handleChange} />
        <textarea name="beneficiarios" placeholder="Beneficiarios" value={proveedor.beneficiarios} onChange={handleChange}></textarea>
        <textarea name="datos_bancarios" placeholder="Datos Bancarios" value={proveedor.datos_bancarios} onChange={handleChange}></textarea>
        <button type="submit">Añadir Proveedor</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default AddProveedor;

import React, { useState } from 'react';
import axios from 'axios';
import { handleBeneficiarioChange, handleChange, handleDatosBancariosChange, handleAddBeneficiario, validarCampos, handleDeleteBeneficiario } from '../utils/proveedorUtils';

const AddProveedor = () => {
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
      setError('')
    } catch (error) {
      setError('Error al añadir el proveedor');
      setMessage('')
    }
  };

  return (
    <div>
      <h1>Añadir Proveedor</h1>
      <form onSubmit={handleSubmit}>
        <label>NIT: </label>
        <input type="text" name="nit" placeholder="NIT" value={proveedor.nit} onChange={(e) => handleChange(e, setProveedor)} />
        <label>Nombre: </label>
        <input type="text" name="nombre" value={proveedor.nombre} onChange={(e) => handleChange(e, setProveedor)} />
        <label>Apellido: </label>
        <input type="text" name="apellido" value={proveedor.apellido} onChange={(e) => handleChange(e, setProveedor)} />
        <label>Cedula: </label>
        <input type="text" name="cedula" placeholder="Cédula" value={proveedor.cedula} onChange={(e) => handleChange(e, setProveedor)} />

        {/* Tipo de Proveedor (Lista de opciones) */}
        <label>Tipo de Proveedor:</label>
        <select name="tipo_proveedor" value={proveedor.tipo_proveedor} onChange={(e) => handleChange(e, setProveedor)}>
          <option value="Nacional">Nacional</option>
          <option value="Internacional">Internacional</option>
        </select>

        {/* Tipo de Persona (Lista de opciones) */}
        <label>Tipo de Persona:</label>
        <select name="tipo_persona" value={proveedor.tipo_persona} onChange={(e) => handleChange(e, setProveedor)}>
          <option value="Natural">Natural</option>
          <option value="Jurídica">Jurídica</option>
        </select>

        {/* Beneficiarios (Lista de objetos) */}
        <h3>Beneficiarios</h3>
        {proveedor.beneficiarios && proveedor.beneficiarios.map((beneficiario, index) => (
          <div key={index}>
            <label>Nombre Beneficiario: </label>
            <input
              type="text"
              value={beneficiario.nombre}
              onChange={(e) => handleBeneficiarioChange(index, 'nombre', e.target.value, proveedor.beneficiarios, setProveedor)}
            />
            <label>Cédula Beneficiario: </label>
            <input
              type="text"
              value={beneficiario.cedula}
              onChange={(e) => handleBeneficiarioChange(index, 'cedula', e.target.value, proveedor.beneficiarios, setProveedor)}
            />
            {proveedor.beneficiarios.length > 1 && (
              <button type="button" onClick={() => handleDeleteBeneficiario(setProveedor, proveedor, index)}>Eliminar Beneficiario</button>
            )}
          </div>

        ))}
        <button type="button" onClick={() => handleAddBeneficiario(setProveedor, proveedor)}>Añadir Beneficiario</button>

        {/* Datos Bancarios (Objeto JSON) */}
        <h3>Datos Bancarios</h3>
        {proveedor.datos_bancarios && (
          <div>
            <label>Banco: </label>
            <input
              type="text"
              value={proveedor.datos_bancarios.banco}
              onChange={(e) => handleDatosBancariosChange('banco', e.target.value, setProveedor)}
            />
            <label>Número de Cuenta: </label>
            <input
              type="text"
              value={proveedor.datos_bancarios.cuenta}
              onChange={(e) => handleDatosBancariosChange('cuenta', e.target.value, setProveedor)}
            />
            <label>Tipo de Cuenta: </label>
            <select name="tipo_cuenta" value={proveedor.datos_bancarios.tipo_cuenta} onChange={(e) => handleDatosBancariosChange('tipo_cuenta', e.target.value, setProveedor)}>
              <option value="Ahorros">Ahorros</option>
              <option value="Corriente">Corriente</option>
            </select>
          </div>
        )}
        <button type="submit">Añadir Proveedor</button>
      </form>
    </div>
  );
};

export default AddProveedor;

import React, { useState } from 'react';
import axios from 'axios';
import { handleBeneficiarioChange, handleChange, handleDatosBancariosChange, handleAddBeneficiario, validarCampos } from '../utils/proveedorUtils';

const ViewProveedor = () => {
  const [proveedorId, setProveedorId] = useState('');
  const [proveedor, setProveedor] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleFetchProveedor = async () => {
    try {
      const response = await axios.get(`/proveedor/${proveedorId}`);
      setProveedor(response.data);
      setError('');
    } catch (error) {
      setError('Error al obtener el proveedor');
    }
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
      return; // Detiene la ejecución si hay campos vacíos
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
    <div>
      <h1>Ver, Modificar o Eliminar Proveedor</h1>
      
      <input type="text" placeholder="ID del Proveedor" value={proveedorId} onChange={(e) => setProveedorId(e.target.value)} />
      <button onClick={handleFetchProveedor}>Obtener Proveedor</button>

      {proveedor && (
        <div>
          {isEditing ? (
            <div>
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
              <button onClick={handleUpdateProveedor}>Actualizar</button>
            </div>
          ) : (
            <div>
              <h2>Detalles del Proveedor</h2>
                <p><strong>NIT:</strong> {proveedor.nit}</p>
                <p><strong>Nombre:</strong> {proveedor.nombre}</p>
                <p><strong>Apellido:</strong> {proveedor.apellido}</p>
                <p><strong>Cédula:</strong> {proveedor.cedula}</p>
                <p><strong>Tipo de Proveedor:</strong> {proveedor.tipo_proveedor}</p>
                <p><strong>Tipo de Persona:</strong> {proveedor.tipo_persona}</p>

                {/* Beneficiarios, si es un arreglo */}
                <h3>Beneficiarios:</h3>
                <ul>
                    {proveedor.beneficiarios.map((beneficiario, index) => (
                    <li key={index}>
                        Nombre: {beneficiario.nombre}, Cédula: {beneficiario.cedula}
                    </li>
                    ))}
                </ul>

                {/* Datos bancarios */}
                <h3>Datos Bancarios:</h3>
                <p><strong>Banco:</strong> {proveedor.datos_bancarios.banco}</p>
                <p><strong>Cuenta:</strong> {proveedor.datos_bancarios.cuenta}</p>
                <p><strong>Tipo de Cuenta:</strong> {proveedor.datos_bancarios.tipo_cuenta}</p>

                <p><strong>Estado:</strong> {proveedor.estado}</p>
              <button onClick={() => setIsEditing(true)}>Modificar</button>
              <button onClick={handleDeleteProveedor}>Eliminar</button>
            </div>
          )}
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default ViewProveedor;

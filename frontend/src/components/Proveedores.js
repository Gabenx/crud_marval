import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Proveedores = ({ authToken }) => {
  const [proveedores, setProveedores] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await axios.get('/proveedores', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setProveedores(response.data);
      } catch (error) {
        setError('Error al cargar los proveedores');
      }
    };

    fetchProveedores();
  }, [authToken]);

  return (
    <div>
      <h2>Proveedores</h2>
      {error && <p>{error}</p>}
      <ul>
        {proveedores.map((proveedor) => (
          <li key={proveedor.id}>
            {proveedor.nombre} {proveedor.apellido} - {proveedor.estado}
            {proveedor.estado === 'Pendiente' && (
              <button
                onClick={async () => {
                  try {
                    await axios.put(`/proveedor/${proveedor.id}/validar`, {
                      estado: 'Aprobado'
                    }, {
                      headers: {
                        Authorization: `Bearer ${authToken}`
                      }
                    });
                    setProveedores((prev) =>
                      prev.map((p) =>
                        p.id === proveedor.id ? { ...p, estado: 'Aprobado' } : p
                      )
                    );
                  } catch (error) {
                    console.error('Error al aprobar proveedor');
                  }
                }}
              >
                Aprobar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Proveedores;

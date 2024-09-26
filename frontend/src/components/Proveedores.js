import React from 'react';
import { useNavigate } from 'react-router-dom';

const Proveedores = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Gestión de Proveedores</h1>
      
      <button onClick={() => navigate('/add-proveedor')}>
        Añadir Proveedor
      </button>
      
      <button onClick={() => navigate('/view-proveedor')}>
        Ver, Modificar o Eliminar Proveedor
      </button>
    </div>
  );
};

export default Proveedores;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Acceso denegado</h2>
      <p>Es necesario autenticarse para acceder a estos recursos.</p>
      <p>Redirigiendo al login en 5 segundos...</p>
    </div>
  );
};

export default AuthWarning;

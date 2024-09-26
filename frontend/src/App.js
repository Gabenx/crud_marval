import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Proveedores from './components/Proveedores';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  if (!authToken) {
    return <Login setAuthToken={setAuthToken} />;
  }

  return (
    <div>
      <h1>Bienvenido</h1>
      <Proveedores authToken={authToken} />
      <button onClick={() => {
        localStorage.removeItem('token');
        setAuthToken(null);
      }}>Cerrar sesión</button>
    </div>
  );
}

export default App;

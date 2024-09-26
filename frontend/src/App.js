import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Proveedores from './components/Proveedores';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  return (
    <Router>
      <div>
        {/* Definimos las rutas para el login, registro y proveedores */}
        <Routes>
          {/* Ruta de inicio de sesión */}
          <Route
            path="/login"
            element={<Login setAuthToken={setAuthToken} />}
          />
          
          {/* Ruta de registro */}
          <Route
            path="/register"
            element={<Register />}
          />

          {/* Ruta de CRUD de proveedores, requiere autenticación */}
          <Route
            path="/proveedores"
            element={
              authToken ? (
                <Proveedores authToken={authToken} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Redirección por defecto a /login si no hay otra ruta */}
          <Route
            path="*"
            element={<Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

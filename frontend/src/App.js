import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Proveedores from './components/Proveedores';
import AddProveedor from './components/AddProveedor';
import ViewProveedor from './components/ViewProveedor';
import AuthWarning from './components/AuthWarning'; // Añade el nuevo componente

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  // Manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  return (
    <Router>
      <Routes>
        {/* Ruta de login */}
        <Route
          path="/login"
          element={<Login setAuthToken={setAuthToken} />}
        />

        {/* Ruta de registro */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Ruta protegida: CRUD de proveedores */}
        <Route
          path="/proveedores"
          element={
            authToken ? (
              <Proveedores authToken={authToken} handleLogout={handleLogout} />
            ) : (
              <AuthWarning />
            )
          }
        />

        {/* Ruta protegida: Añadir proveedor */}
        <Route
          path="/add-proveedor"
          element={
            authToken ? (
              <AddProveedor authToken={authToken} />
            ) : (
              <AuthWarning />
            )
          }
        />

        {/* Ruta protegida: Ver, Modificar o Eliminar proveedor */}
        <Route
          path="/view-proveedor"
          element={
            authToken ? (
              <ViewProveedor authToken={authToken} />
            ) : (
              <AuthWarning />
            )
          }
        />

        {/* Ruta predeterminada */}
        <Route
          path="*"
          element={<Navigate to={authToken ? '/proveedores' : '/login'} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

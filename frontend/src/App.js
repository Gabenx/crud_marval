import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Proveedores from './components/Proveedores';
import AddProveedor from './components/AddProveedor';
import ViewProveedor from './components/ViewProveedor';
import AuthWarning from './components/AuthWarning'; 
import { setupAxiosInterceptors } from './axiosConfig';  
import { jwtDecode } from 'jwt-decode';


function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);  // Decodificar el token JWT
        const currentTime = Date.now() / 1000;   // Obtener tiempo actual en segundos

        if (decodedToken.exp < currentTime) {
          // Si el token ha expirado, eliminarlo y redirigir al login
          localStorage.removeItem('token');
          setAuthToken(null);
        } else {
          setAuthToken(token);  // Si no ha expirado, mantener el token
        }
      } catch (error) {
        console.error('Error decoding token', error);
        localStorage.removeItem('token');
        setAuthToken(null);
      }
    }

    // Configurar el interceptor de Axios una vez que el token se valide
    setupAxiosInterceptors();

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
              <Navigate to="/login" />
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
              <Navigate to="/login" />
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
              <Navigate to="/login" />
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

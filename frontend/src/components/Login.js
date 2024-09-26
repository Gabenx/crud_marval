import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importamos el hook useNavigate


const Login = ({ setAuthToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Declara navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', {
        username,
        password,
      });

      const token = response.data.token;
      setAuthToken(token);
      localStorage.setItem('token', token);
      setError('');

      // Redirige a /proveedores después del inicio de sesión exitoso
      navigate('/proveedores');

    } catch (error) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
      <p>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p> {/* Agregamos enlace a registro */}
    </div>
  );
};

export default Login;

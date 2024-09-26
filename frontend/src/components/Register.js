import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importamos el hook useNavigate

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();  // Creamos una instancia del hook useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Usamos el endpoint /signup para el registro
      const response = await axios.post('/signup', {
        username,
        password,
        rol: 'user'  // El rol siempre será 'user' para este formulario
      });

      setSuccess('Usuario registrado exitosamente');
      setError('');

      // Redirigimos a la página de login después de 2 segundos
      setTimeout(() => {
        navigate('/login');  // Redirige a la página de login
      }, 2000);

    } catch (error) {
      setError('Error al registrar usuario');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
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
        {success && <p>{success}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;

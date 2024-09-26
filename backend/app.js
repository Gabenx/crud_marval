const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(express.json());

// Configura la conexión a PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Rutas y lógica del CRUD aquí...

// Crear un nuevo proveedor
app.post('/proveedor', async (req, res) => {
    const { nit, nombre, apellido, cedula, tipo_proveedor, tipo_persona, beneficiarios, datos_bancarios } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO proveedores (nit, nombre, apellido, cedula, tipo_proveedor, tipo_persona, beneficiarios, datos_bancarios) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [nit, nombre, apellido, cedula, tipo_proveedor, tipo_persona, JSON.stringify(beneficiarios), JSON.stringify(datos_bancarios)]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error al crear el proveedor: ", error)
        res.status(500).json({ error: 'Error al crear proveedor' });
    }
});

// Leer información de un proveedor
app.get('/proveedor/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM proveedores WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error al obtener el proveedor: ", error)
        res.status(500).json({ error: 'Error al obtener proveedor' });
    }
});

// Ruta para obtener todos los proveedores
app.get('/proveedores', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM proveedores');
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener proveedores:", error);
        res.status(500).json({ error: 'Error al obtener proveedores' });
    }
});

// Actualizar un proveedor
app.put('/proveedor/:id', async (req, res) => {
    const { id } = req.params;
    const { nit, nombre, apellido, cedula, tipo_proveedor, tipo_persona, beneficiarios, datos_bancarios } = req.body;
    try {
        const result = await pool.query(
            'UPDATE proveedores SET nit = $1, nombre = $2, apellido = $3, cedula = $4, tipo_proveedor = $5, tipo_persona = $6, beneficiarios = $7, datos_bancarios = $8 WHERE id = $9 RETURNING *',
            [nit, nombre, apellido, cedula, tipo_proveedor, tipo_persona, JSON.stringify(beneficiarios), JSON.stringify(datos_bancarios), id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error al actualizar el proveedor: ", error)
        res.status(500).json({ error: 'Error al actualizar proveedor' });
    }
});

// Ruta para validar o rechazar un proveedor (solo administradores)
app.put('/proveedor/:id/validar', esAdmin, async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;  // Recibir el estado desde el cuerpo de la solicitud

    // Verifica que el estado sea "Aprobado" o "Rechazado"
    if (!['Aprobado', 'Rechazado'].includes(estado)) {
        return res.status(400).json({ error: 'El estado debe ser "Aprobado" o "Rechazado"' });
    }

    try {
        // Actualizar el estado del proveedor según lo enviado en la solicitud
        const result = await pool.query(
            'UPDATE proveedores SET estado = $1 WHERE id = $2 RETURNING *',
            [estado, id]
        );
        
        // Si no se encontró el proveedor
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }

        res.json({message: `El proveedor ha sido ${estado.toLowerCase()} satisfactoriamente`});  // Devolver el mensaje
    } catch (error) {
        console.error("Error al validar o rechazar proveedor:", error);
        res.status(500).json({ error: 'Error al validar o rechazar proveedor' });
    }
});



// Eliminar un proveedor
app.delete('/proveedor/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM proveedores WHERE id = $1', [id]);
        res.status(204).send();
    } catch (error) {
        console.error("Error al eliminar proveedor: ", error)
        res.status(500).json({ error: 'Error al eliminar proveedor' });
    }
});


// Endpoint para crear usuarios (sign up)
app.post('/signup', async (req, res) => {
    const { username, password, rol } = req.body;

    // Verifica que el rol sea válido ('admin' o 'user')
    if (!['admin', 'user'].includes(rol)) {
        return res.status(400).json({ error: 'El rol debe ser "admin" o "user"' });
    }

    try {
        // Verifica si el nombre de usuario ya existe
        const userExists = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);

        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        // Hashea la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);  // El número 10 es el salt rounds

        // Inserta el nuevo usuario en la base de datos
        const result = await pool.query(
            'INSERT INTO usuarios (username, password, rol) VALUES ($1, $2, $3) RETURNING *',
            [username, hashedPassword, rol]
        );

        res.status(201).json({ message: 'Usuario creado exitosamente', user: result.rows[0] });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});


// Endpoint de login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Busca al usuario en la base de datos
        const result = await pool.query('SELECT * FROM usuarios WHERE username = $1', [username]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        // Compara la contraseña ingresada con la contraseña hasheada almacenada
        const validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {
            // Genera un token JWT con el rol del usuario
            const token = jwt.sign({ username: user.username, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

// Middleware para verificar el rol de administrador
function esAdmin(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];  // Obtén el token del encabezado Authorization

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verifica el token

        if (decoded.rol === 'admin') {
            req.user = decoded;  // Añade los datos del usuario al request
            next();  // Si es admin, continúa
        } else {
            return res.status(403).json({ error: 'Acceso denegado: no tienes permisos de administrador' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
}



//Consumir API Externa
const axios = require('axios');

app.get('/external-api', async (req, res) => {
    try {
        const tokenResponse = await axios.post('https://analyticsdev.app.marval.com.co/api/jwtjde/loginjwt', {
            login: process.env.JWT_USERNAME,
            pswd: process.env.JWT_PASSWORD
        });
        const jwtToken = tokenResponse.data.accessToken;
        console.log(tokenResponse.data);
        
        const apiResponse = await axios.get('https://analyticsdev.app.marval.com.co/api/jwtjde/getAllProyectos', {
            headers: { Authorization: `Bearer ${jwtToken}` }
        });

        res.json(apiResponse.data);
    } catch (error) {
        console.error("Error al consumir API externa: ", error)
        res.status(500).json({ error: 'Error al consumir API externa' });
    }
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

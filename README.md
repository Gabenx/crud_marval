# Prueba Tecnica

Este proyecto es una aplicación web para la gestión de proveedores, donde puedes crear, modificar, eliminar y validar proveedores. Incluye funcionalidades tanto para usuarios normales como para administradores. La aplicación utiliza un backend basado en Node.js y un frontend en React con Material-UI para los estilos.

## Requisitos Previos
Antes de comenzar, asegúrate de tener instalados los siguientes requisitos en tu sistema:
* [NodeJs](https://nodejs.org/en)
* [PostgreSQL](https://www.postgresql.org/download/)
* [Pgadmin4](https://www.pgadmin.org/download/) (Opcional para facilitar la importación y el manejo de la base de datos)

## Configuracion de la Base de Datos
1. Asegúrate de tener PostgreSQL corriendo en tu máquina.
2. Crea una base de datos para este proyecto utilizando el comando: ```CREATE DATABASE gestion_proveedores;```
3. Importar la base de datos

## Clonación del Proyecto
Clona el repositorio en tu máquina local:
```bash
git clone https://github.com/gabenx/crud_marval.git
cd crud_marval
```

## Configuración del Backend
1. Navega al directorio del backend y ejecuta el siguiente comando para instalar las dependencias:
```bash
cd backend
npm install
```
2. Configura las variables de entorno y renombra el archivo .env.example a .env:
```makefile
DB_USER=tu_usuario_postgres
DB_HOST=localhost
DB_NAME=tu_nombre_database
DB_PASSWORD=tu_contraseña_postgres
DB_PORT=5432
DB_DATABASE=gestion_proveedores
JWT_SECRET=tu_secreto_jwt
JWT_USERNAME=tu_user_JWT
JWT_PASSWORD=tu_contraseña_JWT
```
3. Inicia el servidor del backend:
```bash
nodemon app.js
```
El servidor se ejecutará en http://localhost:5000.

## Configuración del Backend
1. Navega al directorio del frontend y ejecuta el siguiente comando para instalar las dependencias:
```bash
cd frontend
npm install
```
2. Inicia el servidor de desarrollo de React:
```bash
npm start
```
La aplicación se abrirá en http://localhost:3000.

## Colección de Postman
Se incluye un archivo de colección de Postman para probar los endpoints del backend. Para utilizarlo:
1. Abre Postman.
2. Ve a File -> Import.
3. Selecciona el archivo postman_collection.json incluido en este proyecto.
4. Utiliza las solicitudes predefinidas para probar las rutas de la API.

Las rutas incluidas en la colección cubren las siguientes funcionalidades:

* Registro de usuarios
* Inicio de sesión
* CRUD de proveedores
* Validación de proveedores por administradores
* Consumo de API externa para obtener proyectos usando token JWT

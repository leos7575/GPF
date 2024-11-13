// server.js
const express = require('express');
const cors = require('cors');
const db = require('../db');  // Conexión a la base de datos
const port = 3000;
const routes = require('../routes/routes');
const app = express();

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Usar CORS como middleware
app.use(cors());

// Usar las rutas de posts
app.use('/api', routes);
let datos = []; // Array para almacenar las ubicaciones

// Ruta para recibir datos del ESP32 y almacenarlos en el array
app.post('/api/data', (req, res) => {
    const data = req.body;
    datos.push(data); // Agregar la nueva ubicación al array
    res.status(200).send('Datos recibidos correctamente');
});

// Ruta para obtener las ubicaciones almacenadas
app.get('/api/datos', (req, res) => {
    res.json(datos); // Devolver las ubicaciones como JSON
});

// app.post('/api/animal', (req, res) => {
//     const { tipo_de_animal,raza,fecha_nacimiento, peso, estado_salud, observaciones } = req.body;
//     const query = 'INSERT INTO formulario (tipo_de_animal,raza,fecha_nacimiento, peso, estado_salud, observaciones) VALUES ( ?, ?, ?, ?, ?, ?)';
    
//     db.query(query, [tipo_de_animal,raza,fecha_nacimiento, peso, estado_salud, observaciones], (err, results) => {
//         if (err) {
//             console.error('Error al guardar los datos en la base de datos:', err);
//             res.status(500).send('Error al guardar los datos');
//         } else {
//             res.status(200).send('Datos guardados correctamente');
//         }
//     });
// });
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

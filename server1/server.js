const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Usar CORS como middleware
app.use(cors());
let datos = []; // Array para almacenar las ubicaciones

// Ruta para recibir datos del ESP32
app.post('/api/data', (req, res) => {
    const data = req.body;
    datos.push(data); // Agregar la nueva ubicación al array
    res.status(200).send('Datos recibidos correctamente');
});

// Ruta para obtener las ubicaciones almacenadas
app.get('/api/datos', (req, res) => {
    res.json(datos); // Devolver las ubicaciones como JSON
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

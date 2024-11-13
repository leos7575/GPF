// routes.js
const express = require('express');
const router = express.Router();
const db = require('../db');  // Importamos la conexión a la base de datos

// Ruta POST para agregar un nuevo animal
router.post('/animal', (req, res) => {
    const { tipo_de_animal, raza, fecha_nacimiento, peso, estado_salud, observaciones } = req.body;
    const query = 'INSERT INTO formulario (tipo_de_animal, raza, fecha_nacimiento, peso, estado_salud, observaciones) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.query(query, [tipo_de_animal, raza, fecha_nacimiento, peso, estado_salud, observaciones], (err, results) => {
        if (err) {
            console.error('Error al guardar los datos en la base de datos:', err);
            res.status(500).send('Error al guardar los datos');
        } else {
            res.status(200).send('Datos guardados correctamente');
        }
    });
});

// Ruta GET para obtener todos los animales
router.get('/animal', (req, res) => {
    const query = 'SELECT * FROM formulario';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los datos de la base de datos:', err);
            res.status(500).send('Error al obtener los datos');
        } else {
            res.status(200).json(results);  // Enviamos los resultados como respuesta en formato JSON
        }
    });
});

// Ruta GET para obtener un animal por su ID
router.get('/animal/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM formulario WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener los datos de la base de datos:', err);
            res.status(500).send('Error al obtener los datos');
        } else if (results.length === 0) {
            res.status(404).send('Animal no encontrado');
        } else {
            res.status(200).json(results[0]);  // Retornamos el primer (y único) resultado
        }
    });
});

// Ruta PUT para actualizar un animal
router.put('/animal/:id', (req, res) => {
    const { id } = req.params;
    const { tipo_de_animal, raza, fecha_nacimiento, peso, estado_salud, observaciones } = req.body;
    const query = 'UPDATE formulario SET tipo_de_animal = ?, raza = ?, fecha_nacimiento = ?, peso = ?, estado_salud = ?, observaciones = ? WHERE id = ?';

    db.query(query, [tipo_de_animal, raza, fecha_nacimiento, peso, estado_salud, observaciones, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar los datos en la base de datos:', err);
            res.status(500).send('Error al actualizar los datos');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Animal no encontrado');
        } else {
            res.status(200).send('Datos actualizados correctamente');
        }
    });
});

// Ruta DELETE para eliminar un animal
router.delete('/animal/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM formulario WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar los datos de la base de datos:', err);
            res.status(500).send('Error al eliminar los datos');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Animal no encontrado');
        } else {
            res.status(200).send('Animal eliminado correctamente');
        }
    });
});

module.exports = router;  // Exporta las rutas

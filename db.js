// db.js
const mysql = require('mysql');

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Cambia con tu usuario
    password: '',  // Cambia con tu contraseña
    database: 'gpf',  // Nombre de tu base de datos
});

// Conectar con la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

// Exportar la conexión para usarla en otros archivos
module.exports = db;

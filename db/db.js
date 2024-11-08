// Conexion a la BD

const mysql = require('mysql'); // Importamos el modulo para usar mysql

// Creamos la conexion
const db = mysql.createConnection({
    // Asignamos los valores necesarios
    host: 'localhost',
    user: 'root',
    database: 'gpf',
    password: ''
})

// Nos conectamos
db.connect((error)=>{
    // SI no hay conexion nos cenctamos
    if(error){
        console.log('ERRORRRRRRR' + error.stack);
        return; // terminamos la funcion si ahi un error
    }
    // Si hay conexion
    console.log('CONECTADOOOOO');
});
module.exports = db;
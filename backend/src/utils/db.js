const mysql = require('mysql2');

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appBlog'
}).promise();

module.exports = db;

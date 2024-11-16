const db = require('../utils/db');

// Obtener todos los autores
exports.getAllAutores = (callback) => {
    db.query('SELECT * FROM autores', (err, results) => {
        callback(err, results);
    });
};

// Crear un nuevo autor
exports.createAutor = (nombre, email, imagen, callback) => {
    const query = 'INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)';
    db.query(query, [nombre, email, imagen], (err, result) => {
        callback(err, result);
    });
};

// Obtener un autor por su ID
exports.getAutorById = (id, callback) => {
    db.query('SELECT * FROM autores WHERE id = ?', [id], (err, results) => {
        callback(err, results);
    });
};

const db = require('../utils/db');

// Obtener todos los posts junto con los datos del autor
exports.getAllPosts = (callback) => {
    const query = `
        SELECT posts.*, autores.nombre, autores.email, autores.imagen
        FROM posts
        JOIN autores ON posts.autor_id = autores.id
    `;
    db.query(query, (err, results) => {
        callback(err, results);
    });
};

// Crear un nuevo post
exports.createPost = (titulo, descripcion, categoria, autor_id, callback) => {
    const query = 'INSERT INTO posts (titulo, descripcion, categoria, autor_id) VALUES (?, ?, ?, ?)';
    db.query(query, [titulo, descripcion, categoria, autor_id], (err, result) => {
        callback(err, result);
    });
};

// Obtener posts por autor
exports.getPostsByAutor = (autorId, callback) => {
    const query = `
        SELECT posts.*, autores.nombre, autores.email, autores.imagen
        FROM posts
        JOIN autores ON posts.autor_id = autores.id
        WHERE autores.id = ?
    `;
    db.query(query, [autorId], (err, results) => {
        callback(err, results);
    });
};

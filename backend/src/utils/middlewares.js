const jwt = require('jsonwebtoken');
const { selectById: selectPostById } = require("../models/postModel"); // Adaptar según tu modelo de posts
const { selectById: selectAuthorById } = require('../models/autorModel'); // Adaptar según tu modelo de autores

// Middleware para verificar el token
const checkToken = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(403).json({ message: 'Debes incluir la cabecera de Authorization' });
    }

    const token = req.headers['authorization'];

    let data;
    try {
        data = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(403).json({ message: 'El token es incorrecto' });
    }

    const autor = await selectAuthorById(data.userId);
    if (!autor) {
        return res.status(403).json({ message: 'El autor no existe' });
    }

    req.user = autor;
    next();
};

// Middleware para verificar si el post existe
const checkPostId = async (req, res, next) => {
    const { postId } = req.params;

    // Si el postId no es un número
    if (isNaN(postId)) {
        return res.status(400).json({ message: 'El ID del post es incorrecto' });
    }

    // Si el post no existe en la base de datos
    const post = await selectPostById(postId);
    if (!post) {
        return res.status(404).json({ message: 'El post no existe en la BD' });
    }

    next();
};

// Middleware para verificar si el autor existe
const checkAuthorId = async (req, res, next) => {
    const { authorId } = req.params;

    // Si el authorId no es un número
    if (isNaN(authorId)) {
        return res.status(400).json({ message: 'El ID del autor es incorrecto' });
    }

    // Si el autor no existe en la base de datos
    const author = await selectAuthorById(authorId);
    if (!author) {
        return res.status(404).json({ message: 'El autor no existe en la BD' });
    }

    next();
};

// Middleware para verificar si el usuario es un autor
const checkIfAuthor = (req, res, next) => {
    if (req.user.role !== 'author') {
        return res.status(403).json({ message: 'Debes ser un autor para realizar esta acción' });
    }
    next();
};

module.exports = {
    checkToken,
    checkPostId,
    checkAuthorId,
    checkIfAuthor
};
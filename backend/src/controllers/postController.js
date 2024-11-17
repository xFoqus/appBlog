const postModel = require('../models/postModel');

// Crear un post
exports.createPost = (req, res) => {
    const { titulo, descripcion, categoria, autor_id } = req.body;
    postModel.createPost(titulo, descripcion, categoria, autor_id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error al crear el post' });
        res.status(201).json({ message: 'Post creado correctamente' });
    });
};

// Obtener todos los posts
exports.getAllPosts = (req, res) => {
    postModel.getAllPosts((err, results) => {
        if (err) return res.status(500).json({ message: 'Error al obtener los posts' });
        res.status(200).json(results);
    });
};

// Obtener posts por autor
exports.getPostsByAutor = (req, res) => {
    const autorId = req.params.autor_id;
    postModel.getPostsByAutor(autorId, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error al obtener los posts del autor' });
        res.status(200).json(results);
    });
};

// Obtener un post por ID
exports.getPostById = (req, res) => {
    const postId = req.params.id;  // Obtener el ID del post desde la URL
    postModel.getPostById(postId, (err, result) => {  // Llamar al modelo para obtener el post
        if (err) return res.status(500).json({ message: 'Error al obtener el post' });  // Manejar errores
        if (!result) return res.status(404).json({ message: 'Post no encontrado' });  // Si no se encuentra el post
        res.status(200).json(result);  // Retornar el post encontrado
    });
};

// Eliminar un post
exports.deletePost = (req, res) => {
    const postId = req.params.postId;
    postModel.deletePost(postId, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error al eliminar el post' });
        res.status(200).json({ message: 'Post eliminado correctamente' });
    });
};

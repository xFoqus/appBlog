// Importa el modelo de posts
const { Post } = require('../models/postModel');  // O usa el modelo que tengas configurado

// Función para crear un post
const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = await Post.create({ title, content });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el post', error });
    }
};

// Función para obtener un post por ID
const getPostById = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el post', error });
    }
};

module.exports = {
    createPost,
    getPostById
};

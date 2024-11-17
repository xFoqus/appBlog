const express = require('express');
const router = express.Router();

// Importar las funciones del controlador de posts
const { createPost, getPostById, getAllPosts, getPostsByAutor, deletePost } = require('../../controllers/postController');

// Importar los middlewares
const { } = require('../../utils/middlewares'); // Asegúrate de importar `checkIfAuthor`

module.exports = router;

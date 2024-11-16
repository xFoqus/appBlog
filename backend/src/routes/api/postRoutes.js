const express = require('express');
const router = express.Router();

// Importar las funciones del controlador de posts
const { createPost, getPostById } = require('../../controllers/postController');

// Importar los middlewares
const { checkPostId, checkIfAuthor } = require('../../utils/middlewares'); // Asegúrate de importar `checkIfAuthor`

// Crear un post (requiere token y rol de autor)
router.post('/', checkIfAuthor, createPost);

// Obtener un post por ID (requiere verificar la existencia del post)
router.get('/:postId', checkPostId, getPostById);

module.exports = router;

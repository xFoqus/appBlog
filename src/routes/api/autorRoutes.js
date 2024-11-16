const express = require('express');
const router = express.Router();

// Importar las funciones del controlador de autores
const { createAuthor, getAuthorById } = require('../../controllers/autorController');


// Importar los middlewares
const { checkAuthorId, checkIfAuthor } = require('../../utils/middlewares');

// Crear un autor (requiere token y rol de autor)
router.post('/', checkIfAuthor, createAuthor);

// Obtener un autor por ID (requiere verificar la existencia del autor)
router.get('/:authorId', checkAuthorId, getAuthorById);

module.exports = router;

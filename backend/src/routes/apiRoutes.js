const express = require('express');
const router = express.Router();

// Importar las rutas de autores y posts
const autorRoutes = require('./api/autorRoutes');
const postRoutes = require('./api/postRoutes');

// Importar los middlewares
const { checkToken } = require('../utils/middlewares');

// Usar las rutas de autores y posts dentro de `/api` y protegerlas con el middleware checkToken
router.use('/autores', checkToken, autorRoutes);  // Ruta para autores
router.use('/posts', checkToken, postRoutes);     // Ruta para posts

module.exports = router;

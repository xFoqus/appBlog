const router = require('express').Router();


router.use('/autores', require('./api/autorRoutes'));  // Ruta para obtener o modificar autores
router.use('/posts', require('./api/postRoutes'));     // Ruta para obtener, crear o eliminar posts

module.exports = router;

const router = require('express').Router();
const { registro, getAutorById } = require('../../controllers/autorController');
const { checkAutorId } = require('../../utils/middlewares');  // Si tienes middlewares que validen el autor
router.get('/:autorId', checkAutorId, getAutorById);
router.post('/registro', registro);
module.exports = router;

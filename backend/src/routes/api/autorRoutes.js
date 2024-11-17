const router = require('express').Router();

const { registro, getAutorById, getAllAutores } = require('../../controllers/autorController');
const { checkAutorId } = require('../../utils/middlewares');

router.get('/:autorId', checkAutorId, getAutorById);
router.get('/', getAllAutores);

router.post('/registro', registro);
module.exports = router;

const router = require('express').Router();

const { getPostByAutorId, newPost, getAllPosts } = require('../../controllers/postController');
const { checkAutorId } = require('../../utils/middlewares');
const { } = require('../../utils/middlewares');

router.get('/', getAllPosts);
router.get('/autores/:autorId', checkAutorId, getPostByAutorId);
router.post('/new', newPost);
module.exports = router;

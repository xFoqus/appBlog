const pool = require('../utils/db')


async function selectPostByAutorId(autorId) {
    const [posts] = await pool.query('select * from posts where autor_id = ?', [autorId]);
    if (posts.length === 0) {
        return null;
    }
    return posts;
}

async function selectPostById(postId) {
    const [posts] = await pool.query('select * from posts where id = ?', [postId]);

    if (posts.length === 0) {
        return null;
    }
    return posts[0];
}

async function selectAllPosts() {
    const [posts] = await pool.query('select * from posts');

    if (posts.length === 0) {
        return null;
    }
    return posts;
}


async function insertPost({ titulo, descripcion, fecha_creacion, categoria, autor_id }) {
    const [result] = await pool.query(
        'insert into posts (titulo, descripcion, fecha_creacion, categoria, autor_id) values (?,?,?,?,?)',
        [titulo, descripcion, fecha_creacion, categoria, autor_id]
    );
    return result.insertId;
}


module.exports = {
    selectPostByAutorId, insertPost, selectPostById, selectAllPosts
}
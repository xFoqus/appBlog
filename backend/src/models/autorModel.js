const pool = require('../utils/db')

async function selectAutorById(autorId) {
    const [autores] = await pool.query('select * from autores where id = ?', [autorId]);

    if (autores.length === 0) {
        return null;
    }
    return autores[0];
}

async function selectAllAutores() {
    const [autores] = await pool.query('select * from autores');

    if (autores.length === 0) {
        return null;
    }
    return autores;
}

async function insertAutor({ nombre, email, password }) {
    const [result] = await pool.query(
        'insert into autores (nombre, email, password) values (?, ?, ?)',
        [nombre, email, password]
    );
    return result.insertId;
}

module.exports = {
    selectAutorById, insertAutor, selectAllAutores
}
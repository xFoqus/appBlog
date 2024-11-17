const bcrypt = require('bcryptjs');
const pool = require('../utils/db')


async function selectById(autorId) {
    const [autores] = await pool.query('select * from autores where id = ?', [autorId]);

    if (autores.length === 0) {
        return null;
    }

    return autores[0];
}

// Crear un nuevo autor (usado para casos específicos)
exports.createAutor = (nombre, email, password, callback) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return callback(err);

        const query = 'INSERT INTO autores (nombre, email, password) VALUES (?, ?, ?)';
        db.query(query, [nombre, email, hashedPassword], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    });
};

// Actualizar autor por ID
exports.updateAutor = (id, data, callback) => {
    const { nombre, email, password } = data;
    let query = 'UPDATE autores SET nombre = ?, email = ?';
    const params = [nombre, email];

    if (password) {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return callback(err);
            query += ', password = ?';
            params.push(hashedPassword);
            params.push(id);
            query += ' WHERE id = ?';
            db.query(query, params, (err, result) => {
                if (err) return callback(err);
                callback(null, result);
            });
        });
    } else {
        query += ' WHERE id = ?';
        params.push(id);
        db.query(query, params, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }
};

// Eliminar autor por ID
exports.deleteAutor = (id, callback) => {
    const query = 'DELETE FROM autores WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};



// Verificar si el email ya está registrado
exports.checkIfEmailExists = (email, callback) => {
    const query = 'SELECT * FROM autores WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err) return callback(err);
        callback(null, result.length > 0); // Retorna true si el email existe
    });
};

async function insertAutor({ nombre, email, password }) {
    const [result] = await pool.query(
        'insert into autores (nombre, email, password) values (?, ?, ?)',
        [nombre, email, password]
    );
    return result.insertId;
}

module.exports = {
    selectById, insertAutor
}
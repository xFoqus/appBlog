const bcrypt = require('bcryptjs');
const { selectById, insertAutor } = require("../models/autorModel");

// Ejemplo de funciones que podrías tener en el controlador
const getAllAutores = (req, res) => {
    // Lógica para obtener todos los autores
    res.json({ message: "Obteniendo todos los autores" });
};

const registro = async (req, res, next) => {
    // BODY: usuario, email, password
    req.body.password = await bcrypt.hash(req.body.password, 10);

    try {
        const insertId = await insertAutor(req.body);
        const autor = await selectById(insertId);
        res.json(autor);
    } catch (error) {
        next(error);
    }
}

const getAutorById = async (req, res, next) => {
    const { autorId } = req.params;
    try {
        const autor = await selectById(autorId);
        res.json(autor);
    } catch (error) {
        next(error);
    }
};


const updateAutor = (req, res) => {
    // Lógica para actualizar un autor por ID
    res.json({ message: "Actualizando autor por ID" });
};

const deleteAutor = (req, res) => {
    // Lógica para eliminar un autor por ID
    res.json({ message: "Eliminando autor por ID" });
};

// Exportar todas las funciones
module.exports = {
    getAllAutores,
    registro,
    getAutorById,
    updateAutor,
    deleteAutor
};

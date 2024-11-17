const { selectAutorById, insertAutor, selectAllAutores } = require("../models/autorModel");

const registro = async (req, res, next) => {
    try {
        const insertId = await insertAutor(req.body);
        const autor = await selectAutorById(insertId);
        res.json(autor);
    } catch (error) {
        next(error);
    }
}

const getAutorById = async (req, res, next) => {
    const { autorId } = req.params;
    try {
        const autor = await selectAutorById(autorId);
        res.json(autor);
    } catch (error) {
        next(error);
    }
};

const getAllAutores = async (req, res, next) => {
    try {
        const autores = await selectAllAutores();
        res.json(autores);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllAutores,
    registro,
    getAutorById
};

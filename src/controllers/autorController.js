// Importa el modelo de autores
const { Author } = require('../models/autorModel');  // O usa el modelo que tengas configurado

// Función para crear un autor
const createAuthor = async (req, res) => {
    try {
        const { name, bio } = req.body;
        const newAuthor = await Author.create({ name, bio });
        res.status(201).json(newAuthor);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el autor', error });
    }
};

// Función para obtener un autor por ID
const getAuthorById = async (req, res) => {
    const { authorId } = req.params;

    try {
        const author = await Author.findByPk(authorId);
        if (!author) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el autor', error });
    }
};

module.exports = {
    createAuthor,
    getAuthorById
};

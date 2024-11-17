const jwt = require('jsonwebtoken');
const { selectAutorById: selectById } = require("../models/autorModel");

// Middleware para verificar si el autor existe
const checkAutorId = async (req, res, next) => {
    const { autorId } = req.params;

    // Validar que el autorId esté presente y sea un número
    if (!autorId || isNaN(autorId)) {

        return res.status(400).json({ message: 'El ID del autor es incorrecto' });
    }

    try {
        // Verificar que el autor exista en la base de datos
        const autor = await selectById(autorId);
        if (!autor) {
            return res.status(404).json({ message: 'El autor no existe en la BD' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Error al verificar el autor', error: error.message });
    }
};

module.exports = {
    checkAutorId
};

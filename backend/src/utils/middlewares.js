
// Middleware para verificar si el autor existe
const checkAutorId = async (req, res, next) => {
    const { authorId } = req.params;

    // Validar que el authorId esté presente y sea un número
    if (!authorId || isNaN(authorId)) {
        return res.status(400).json({ message: 'El ID del autor es incorrecto' });
    }

    try {
        // Verificar que el autor exista en la base de datos
        const author = await selectAuthorById(authorId);
        if (!author) {
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

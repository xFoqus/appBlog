const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');  // El modelo de usuario
const dotenv = require('dotenv');

dotenv.config();

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validar que los campos email y password no estén vacíos
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    try {
        // Buscar al usuario en la base de datos por su email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });  // Evitar revelar si el usuario existe o no
        }

        // Verificar que la contraseña coincida
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });  // Evitar revelar si la contraseña es incorrecta
        }

        // Generar un JWT si la autenticación fue exitosa
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Devolver el token al usuario
        return res.json({ token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error en el servidor. Intenta de nuevo más tarde.' });
    }
});

module.exports = router;

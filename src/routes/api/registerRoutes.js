const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/userModel');  // El modelo del usuario
const dotenv = require('dotenv');

dotenv.config();

// Ruta de registro de usuario
router.post('/register', async (req, res) => {
    const { nombre, email, password, imagen } = req.body;

    // Validar que los campos no estén vacíos
    if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Nombre, email y contraseña son requeridos' });
    }

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);  // Salto de 10 es estándar

        // Crear el nuevo usuario
        const newUser = await User.create({
            nombre,
            email,
            password: hashedPassword,  // Almacenar la contraseña cifrada
            imagen
        });

        // Generar un JWT (opcional si lo deseas tras el registro)
        const token = jwt.sign(
            { userId: newUser.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Responder con el token (o cualquier otra cosa que necesites)
        return res.status(201).json({ token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error en el servidor. Intenta de nuevo más tarde.' });
    }
});

module.exports = router;

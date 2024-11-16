// app.js
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// Middleware para manejar los datos JSON
app.use(bodyParser.json());

// Usar las rutas de la API
app.use('/api', apiRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
});

module.exports = app;  // Asegúrate de exportar el app para que lo use index.js

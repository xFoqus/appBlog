// Creation and configuration of the Express APP
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', require('./routes/apiRoutes'));

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
});

module.exports = app; 

const express = require('express');
const app = express();

// Middleware para permitir procesamiento de JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Almacenamiento temporal para los horarios (en lugar de una base de datos)
let horarios = [];

// Endpoint para obtener todos los horarios
app.get('/horarios', (req, res) => {
    res.json(horarios);
});

// Endpoint para agregar un nuevo horario
app.post('/horarios', (req, res) => {
    const { hora_inicio, hora_fin, dia } = req.body;

    // Validar que se proporcionen todos los campos
    if (!hora_inicio || !hora_fin || !dia) {
        return res.status(400).json({ error: 'Debe proporcionar hora_inicio, hora_fin y dia' });
    }

    // Crear un nuevo objeto horario
    const nuevoHorario = {
        id: horarios.length + 1, // ID simple basado en el índice
        hora_inicio,
        hora_fin,
        dia
    };

    horarios.push(nuevoHorario); // Agregar al arreglo

    res.status(201).json(nuevoHorario); // Respuesta de creación exitosa
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor de horarios activo en http://localhost:3000');
});

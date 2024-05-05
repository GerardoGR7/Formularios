const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Índice para moverse entre formularios
app.get('/', (req, res) => {
    res.render('index');
});

// Ruta para el índice
app.get('/', (req, res) => {
    res.render('index');
});

// Rutas para formularios
app.get('/registrar-usuario', (req, res) => {
    res.render('registrar-usuario'); // Asegúrate de tener el archivo EJS correspondiente
});

app.get('/registrar-empleado', (req, res) => {
    res.render('registrar-empleado'); // Asegúrate de tener el archivo EJS correspondiente
});

app.get('/registrar-paciente', (req, res) => {
    res.render('registrar-paciente'); // Asegúrate de tener el archivo EJS correspondiente
});

// Validaciones para registrar usuarios
app.post('/registrar-usuario', [
    body('nom_us', 'El nombre es obligatorio').exists().isLength({ min: 3 }),
    body('pat_us', 'Apellido paterno obligatorio').exists().isLength({ min: 3 }),
    body('mat_us', 'Apellido materno obligatorio').exists().isLength({ min: 3 }),
    body('cor_datacc', 'Ingrese un E-mail válido').exists().isEmail(),
    body('pas_datacc', 'Contraseña debe ser al menos de 6 caracteres').exists().isLength({ min: 6 })
    
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const valores = req.body;
        const validaciones = errors.array();
        return res.render('registrar-usuario', { validaciones, valores });
    }
    res.send('¡Usuario registrado con éxito!');
});

// Validaciones para registrar empleados (cuidadores/enfermeros)
app.post('/registrar-empleado', [
    body('nom_emp', 'El nombre es obligatorio').exists().isLength({ min: 3 }),
    body('pat_emp', 'Apellido paterno obligatorio').exists().isLength({ min: 3 }),
    body('mat_emp', 'Apellido materno obligatorio').exists().isLength({ min: 3 }),
    body('cor_datacc', 'Ingrese un E-mail válido').exists().isEmail(),
    body('pas_datacc', 'Contraseña debe ser al menos de 6 caracteres').exists().isLength({ min: 6 }),
    body('rol_emp', 'Seleccione el rol de empleado').exists().isIn(['cuidador', 'enfermero'])
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const valores = req.body;
        const validaciones = errors.array();
        return res.render('registrar-empleado', { validaciones, valores });
    }
    res.send('¡Empleado registrado con éxito!');
});

// Validaciones para registro de paciente

app.post('/registrar-paciente', [
    body('nom_pac', 'El nombre es obligatorio').exists().isLength({ min: 3 }),
    body('pat_pac', 'Apellido paterno obligatorio').exists().isLength({ min: 3 }),
    body('mat_pac', 'Apellido materno obligatorio').exists().isLength({ min: 3 }),
    body('user_id', 'ID del Usuario es obligatorio').exists().isNumeric(),
    body('medicamentos').optional().isString(),
    body('descripcion').optional().isString(),
    body('tratamiento').optional().isString(),
    body('recetas').optional().isString()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const valores = req.body;
        const validaciones = errors.array();
        return res.render('registrar-paciente', { validaciones, valores });
    }
    res.send('¡Paciente registrado con éxito!');
});

app.listen(3000, () => {
    console.log('Servidor activo en http://localhost:3000');
});

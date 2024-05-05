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

app.get('/registrar-solicitud', (req, res) => {
    res.render('registrar-solicitud'); // Asegúrate de tener el archivo EJS correspondiente
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

app.post('/registrar-paciente', [
    // Validaciones para registrar un paciente
    body('nom_pac', 'El nombre es obligatorio y debe tener al menos 3 caracteres').exists().isLength({ min: 3 }),
    body('pat_pac', 'El apellido paterno es obligatorio y debe tener al menos 3 caracteres').exists().isLength({ min: 3 }),
    body('mat_pac', 'El apellido materno es obligatorio y debe tener al menos 3 caracteres').exists().isLength({ min: 3 }),
    body('fot_pac', 'Debe proporcionar una foto válida').optional({ checkFalsy: true }).isString(),
    
    // Validaciones para historial médico
    body('med_hm', 'Debe proporcionar información sobre los medicamentos').exists().isLength({ min: 5 }),
    body('des_hm', 'La descripción médica es obligatoria y debe tener al menos 5 caracteres').exists().isLength({ min: 5 }),
    body('trat_hm', 'Debe proporcionar información sobre el tratamiento').exists().isLength({ min: 5 }),
    body('rec_hm', 'Debe proporcionar la receta médica').optional({ checkFalsy: true }).isString(),

    // Validación para ID del usuario
    body('id_us', 'Debe proporcionar el ID del usuario').exists().isInt(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const valores = req.body; // Captura valores ingresados por el usuario
        const validaciones = errors.array(); // Captura errores de validación

        // Renderiza el formulario con errores
        return res.render('registrar-paciente', { validaciones, valores });
    }

    // Código para procesar y registrar al paciente
    res.send('¡Paciente registrado con éxito!');
});

app.post('/registrar-solicitud', [
    // Validaciones para registrar una solicitud
    body('des_sol', 'La descripción es obligatoria').exists().isLength({ min: 5 }),
    body('tipo_sol', 'Debe seleccionar un tipo válido').exists().isIn(['cuid', 'enfe']),
    body('cost_sol', 'El costo debe ser un número decimal válido').exists().isDecimal(),
    body('id_hor', 'Debe seleccionar un horario válido').exists().isInt(),
    body('id_us', 'Debe proporcionar el ID de usuario').exists().isInt(),
    body('id_pac', 'Debe proporcionar el ID del paciente').exists().isInt(),
    body('id_dir', 'Debe proporcionar el ID de la dirección').exists().isInt(),
    
], (req, res) => {
    // Obtener las validaciones
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const valores = req.body; // Valores enviados
        const validaciones = errors.array(); // Array de errores

        // Volver a renderizar el formulario mostrando los errores
        return res.render('registrar-solicitud', { validaciones, valores });
    }

    // Si no hay errores, se procesa la solicitud
    res.send('¡Solicitud registrada con éxito!');
});

app.listen(3000, () => {
    console.log('Servidor activo en http://localhost:3000');
});

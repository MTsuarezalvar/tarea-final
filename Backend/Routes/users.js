const express = require('express');
const router = express.Router();

// Array temporal para almacenar usuarios (normalmente se usaría una base de datos)
const users = [];

// Crear usuario
router.post('/', (req, res) => {
    const { email, nombre, password } = req.body;
    
    // Validar datos de entrada
    if (!email || !nombre || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    
    // Verificar si el usuario ya existe
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }
    
    // Crear nuevo usuario y añadirlo a la lista
    const newUser = { email, nombre, password };
    users.push(newUser);
    res.status(201).json({ message: 'Usuario creado exitosamente' });
});

module.exports = router;

const jwt = require('jsonwebtoken');

// Login de usuario
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Validar datos de entrada
    if (!email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    
    // Verificar si el usuario existe
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(400).json({ message: 'Credenciales incorrectas' });
    }
    
    // Crear JWT
    const token = jwt.sign({ email: user.email, nombre: user.nombre }, 'secret_key');
    res.status(200).json({ token });
});

// Array temporal para almacenar tokens activos (normalmente se usaría una base de datos)
let activeTokens = [];

// Desconectar usuario
router.post('/disconnect', (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    
    // Eliminar el token de la lista de tokens activos
    activeTokens = activeTokens.filter(t => t !== token);
    res.status(200).json({ message: 'Usuario desconectado exitosamente' });
});

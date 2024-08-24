const express = require('express');
const router = express.Router();

// Array temporal para almacenar regalos (normalmente se usaría una base de datos)
const presents = [];

// Crear regalo
router.post('/', (req, res) => {
    const { name, description, url, price } = req.body;
    const { email } = req.user;  // Suponiendo que el email se obtiene del token JWT
    
    // Validar datos de entrada
    if (!name || !description || !url || !price) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    
    // Crear nuevo regalo
    const newPresent = { id: presents.length + 1, userId: email, name, description, url, price, chosenBy: null };
    presents.push(newPresent);
    res.status(201).json({ message: 'Regalo creado exitosamente', present: newPresent });
});

module.exports = router;

// Listar regalos del usuario
router.get('/', (req, res) => {
    const { email } = req.user;
    const userPresents = presents.filter(present => present.userId === email);
    res.status(200).json(userPresents);
});

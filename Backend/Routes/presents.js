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

// Eliminar regalo
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const { email } = req.user;
    
    const presentIndex = presents.findIndex(present => present.id === parseInt(id) && present.userId === email);
    if (presentIndex === -1) {
        return res.status(404).json({ message: 'Regalo no encontrado o no pertenece al usuario' });
    }
    
    presents.splice(presentIndex, 1);
    res.status(200).json({ message: 'Regalo eliminado exitosamente' });
});

// Modificar regalo
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, url, price } = req.body;
    const { email } = req.user;
    
    const present = presents.find(present => present.id === parseInt(id) && present.userId === email);
    if (!present) {
        return res.status(404).json({ message: 'Regalo no encontrado o no pertenece al usuario' });
    }
    
    // Actualizar los campos del regalo
    if (name) present.name = name;
    if (description) present.description = description;
    if (url) present.url = url;
    if (price) present.price = price;
    
    res.status(200).json({ message: 'Regalo modificado exitosamente', present });
});

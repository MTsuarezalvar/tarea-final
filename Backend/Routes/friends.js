const express = require('express');
const router = express.Router();

// Array temporal para almacenar amigos (normalmente se usaría una base de datos)
const friends = [];

// Añadir amigo
router.post('/', (req, res) => {
    const { email } = req.body;
    const { email: userEmail } = req.user;
    
    // Validar datos de entrada
    if (!email) {
        return res.status(400).json({ message: 'El correo electrónico es obligatorio' });
    }
    
    // Verificar si el amigo ya está en la lista
    const friendExists = friends.find(friend => friend.email === email && friend.userId === userEmail);
    if (friendExists) {
        return res.status(400).json({ message: 'El amigo ya está en la lista' });
    }
    
    // Añadir nuevo amigo
    const newFriend = { userId: userEmail, email };
    friends.push(newFriend);
    res.status(201).json({ message: 'Amigo añadido exitosamente' });
});

module.exports = router;

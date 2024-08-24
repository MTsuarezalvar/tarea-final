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

// Listar amigos del usuario
router.get('/', (req, res) => {
    const { email: userEmail } = req.user;
    const userFriends = friends.filter(friend => friend.userId === userEmail);
    res.status(200).json(userFriends);
});

// Eliminar amigo
router.delete('/:email', (req, res) => {
    const { email } = req.params;
    const { email: userEmail } = req.user;
    
    const friendIndex = friends.findIndex(friend => friend.email === email && friend.userId === userEmail);
    if (friendIndex === -1) {
        return res.status(404).json({ message: 'Amigo no encontrado o no pertenece al usuario' });
    }
    
    friends.splice(friendIndex, 1);
    res.status(200).json({ message: 'Amigo eliminado exitosamente' });
});

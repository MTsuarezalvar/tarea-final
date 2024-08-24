const express = require('express');
const app = express();

app.use(express.json());

// Importar y usar las rutas de usuarios
const userRoutes = require('./Routes/users');
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const presentRoutes = require('./Routes/presents');
app.use('/presents', presentRoutes);

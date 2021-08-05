const { Router } = require('express');
const pokemonsRoutes = require('./pokemons')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemonsRoutes) // /api/characters/


module.exports = router;

const { Router } = require('express');
const pokemonsRoutes = require('./pokemons')
const typesRoutes = require('./types')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemonsRoutes) // 
router.use('/types', typesRoutes) //


module.exports = router;

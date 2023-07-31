const {Router} = require('express');
const pokemonRouter = require('./pokemonsRouter');
const typesRouter = require('./typesRouter');

const mainRouter = Router();

mainRouter.use('/pokemon',pokemonRouter);
mainRouter.use('/type', typesRouter)



module.exports = mainRouter;

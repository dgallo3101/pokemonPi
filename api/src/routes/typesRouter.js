const {Router} = require('express');
const {getTypePokemonHandler} = require('../handlers/pokemonTypeHandlers');

const typesRouter = Router();

typesRouter.get('/', getTypePokemonHandler);

module.exports = typesRouter;


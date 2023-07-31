const {Router} = require('express');

const {getPokemonsHandler,
     getPokemonByIdHandler,  
     createPokemonHandler
    } = require('../handlers/pokemonsHandlers');

const pokemonRouter = Router();


const validate = ( req, res, next) => {
    const {nombre,
        imagen,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,} = req.body;

    if(!nombre) return res.status(400).json({error: 'Falta nombre'});
    if(!imagen) return res.status(400).json({error: 'Falta imagen'});
    if(!vida) return res.status(400).json({error:'Falta vida '})
    if(!ataque) return res.status(400).json({error:'Falta ataque '})
    if(!defensa) return res.status(400).json({error:'Falta defensa'})
    if(!velocidad) return res.status(400).json({error:'Falta velocidad'})
    if(!altura) return ress.status(400).json({error: 'Falta altura'});
    if(!peso) return ress.status(400).json({error: 'Falta peso'});

}



pokemonRouter.get('/', getPokemonsHandler);


pokemonRouter.get('/:id', getPokemonByIdHandler);

pokemonRouter.post('/', validate, createPokemonHandler);


module.exports = pokemonRouter;
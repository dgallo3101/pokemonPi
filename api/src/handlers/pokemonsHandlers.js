const {createPokemon, getPokemonById, searchPokemonByName, getAllPokemons} = require('../controllers/pokemonsControllers')

const getPokemonsHandler = async (req, res) => {
    const {name} = req.query
    
    const results = name ? await searchPokemonByName(name) :  await getAllPokemons()

    res.status(200).json(results);
};



const getPokemonByIdHandler = async (req, res) => {
    const {id} = req.params;

    const source = isNaN(id) ? 'bdd' : 'api';

    try {
        const pokemon = await getPokemonById(id, source);
        res.status(200).json(pokemon)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



const createPokemonHandler = async (req, res) => {
    try {
        const { 
             nombre,
             imagen, 
             vida, 
             ataque,
             defensa,
             velocidad, 
             altura, 
             peso 
            } = req.body;
    
            const newPokemon = await createPokemon(
                nombre,
                imagen, 
                vida, 
                ataque,
                defensa,
                velocidad, 
                altura, 
                peso);
            
            res.status(201).json(newPokemon);
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = {
    getPokemonsHandler,
    getPokemonByIdHandler,
    createPokemonHandler,
}
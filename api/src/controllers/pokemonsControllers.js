const { Pokemons, Type } = require('../db');
const axios = require('axios');





const getPokemonById = async (id, source) => {
    const pokemom = source === 'api'
        ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`))
            .data
        : await Pokemons.findByPk(id);

    return pokemom;

};


const getAllPokemons = async () => {
    const databasePokemons = await Pokemons.findAll({
      include: {
        model: Type, 
        attributes: ['nombre'],
      }
    });

    const apiPokemons = [];

    const { data } = await axios(
        `https://pokeapi.co/api/v2/pokemon`
    );

    const pokemonPromises = data.results.map(async (elem) => {
        const response = await axios.get(elem.url);
        const { id, name, sprites, stats, height, weight, types} = response.data;

        apiPokemons.push({
            id: id,
            name: name,
            image: sprites.front_default,
            attack: stats[1].base_stat,
            defense: stats[2].base_stat,
            speed: stats[5].base_stat,
            height: height,
            weight: weight,
            types: types.map((type) => {
              return type.type.name;
            }),
            created: false
        });
    })

    await Promise.all(pokemonPromises);


    return [...databasePokemons, ...apiPokemons];
};



const searchPokemonByName = async (name) => {
    const newPokemons = [];
    const databasePokemons = await Pokemons.findAll({
      where: { nombre: name.toLowerCase() },
      attributes: [ 'id', 'nombre', 'imagen', 'vida', 'ataque', 'defensa', 'velocidad', 'altura', 'peso'],

      include:{
        model: Type, 
        attributes: ['nombre'],
      }
      
    });
  
    if (databasePokemons.length > 0) {
      newPokemons.push(...databasePokemons);
    } else {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (Object.keys(data).length > 0) {
        newPokemons.push({
          id: data.id,
          nombre: data.name,
          image: data.sprites?.other?.["official-artwork"]?.["front_default"] || null,
          vida: data.stats.find((stat) => stat.stat.name === 'hp')?.base_stat || null,
          ataque: data.stats.find((stat) => stat.stat.name === 'attack')?.base_stat || null,
          defensa: data.stats.find((stat) => stat.stat.name === 'defense')?.base_stat || null,
          velocidad: data.stats.find((stat) => stat.stat.name === 'speed')?.base_stat || null,
          altura: data.height || null,
          peso: data.weight || null,
        });
      }
    }
  
    return newPokemons;
  };
  

    



const createPokemon = async (nombre,
    imagen,
    vida,
    ataque,
    defensa,
    velocidad,
    altura,
    peso,
) => {

    const newPokemon = await Pokemons.create({
        nombre,
        imagen,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
    });
    return newPokemon;

};




module.exports = {
    createPokemon,
    getPokemonById,
    searchPokemonByName,
    getAllPokemons,
}

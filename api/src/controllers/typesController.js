const { Type } = require('../db');
const axios = require('axios');

const getPokemonTypesFromApi = async () => {
    const { data } = await axios.get('https://pokeapi.co/api/v2/type');
    return data.results.map((type) => {
        
        return  type.name;
        
    });

};


const getTypesController = async () => {
    let typesM = await Type.findAll();

    if (typesM) {
        const apiTypes = await getPokemonTypesFromApi();
        if (apiTypes.length > 0) {
            typesM = await Type.bulkCreate(apiTypes.map((name) => ({ nombre: name })))
        }
    }

    return typesM;
};

module.exports = { getTypesController };


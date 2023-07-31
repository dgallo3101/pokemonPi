const {Sequelize} = require('sequelize');
const PokemonModel = require('./models/Pokemons');
const TypeModel = require('./models/Type');

require('dotenv').config(); 

const {
    DB_USER, DB_PASSWORD, DB_HOST
} = process.env

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemons`,
    {
       logging: false, 
       native: false, 
    }
 );

PokemonModel(sequelize);
TypeModel(sequelize);
 
const {Pokemons, Type } = sequelize.models;

Pokemons.belongsToMany(Type, {through: 'PokemonsTypes'});
Type.belongsToMany(Pokemons, {through: 'PokemonsTypes'})


 module.exports = {sequelize, ...sequelize.models}
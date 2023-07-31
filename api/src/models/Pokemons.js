const {DataTypes} = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Pokemons',{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull: false,
    
        }, 
        imagen:{
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        vida:{
            type: DataTypes.INTEGER,
            allowNull: false,
    
        }, 
        ataque:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        defensa:{
            type: DataTypes.INTEGER
        },
        velocidad:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 
        altura:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        peso:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
     }, {timestamps:false });
    
};
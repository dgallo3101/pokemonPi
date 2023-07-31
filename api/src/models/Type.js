const {DataTypes} = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('Type', {
        nombre: {
            type: DataTypes.STRING,
            
        }
    
    });
}
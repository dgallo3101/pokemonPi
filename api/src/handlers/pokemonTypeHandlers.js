const {getTypesController} = require('../controllers/typesController');


const getTypePokemonHandler = async (req, res) => {

    try {
        const types = await getTypesController();
        res.status(200).json(types);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
};


module.exports = {getTypePokemonHandler};

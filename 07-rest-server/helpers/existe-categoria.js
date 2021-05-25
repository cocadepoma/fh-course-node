

const { Categoria } = require('../models/');

const existeCategoria = async (id = '') => {

    const existeCategoria = await Categoria.findById(id);

    if (!existeCategoria) {
        throw new Error('No existe esa categoría');
    }

}

module.exports = {
    existeCategoria
}
const { Producto } = require('../models/');

const existeProducto = async (id = '') => {

    const existeProducto = await Producto.findById(id);

    if (!existeProducto) {
        throw new Error('No existe ese producto');
    }

}

module.exports = {
    existeProducto
}
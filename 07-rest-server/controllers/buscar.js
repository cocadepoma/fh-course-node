const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);

        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    // estable una expresión regular con la palabra que le estamos pasando
    // con la i, le decimos que no sea case sensitive
    // al pasarle a mongoDB la regex, devolver los resultados que cumplan con ese término
    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { email: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    });
}
const buscarCategorias = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const categoria = await Categoria.findById(termino);

        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    // estable una expresión regular con la palabra que le estamos pasando
    // con la i, le decimos que no sea case sensitive
    // al pasarle a mongoDB la regex, devolver los resultados que cumplan con ese término
    const regex = new RegExp(termino, 'i');

    let categorias = await Categoria.find({ nombre: regex, estado: true })
        .populate('usuario', 'nombre');

    //const userName = categorias.usuario.nombre;

    res.json({
        results: categorias
    });
}

const buscarProductos = async (termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const producto = await Producto.findById(termino)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre');;

        return res.json({
            results: (producto) ? [producto] : []
        });
    }

    // estable una expresión regular con la palabra que le estamos pasando
    // con la i, le decimos que no sea case sensitive
    // al pasarle a mongoDB la regex, devolver los resultados que cumplan con ese término
    const regex = new RegExp(termino, 'i');

    // Precio mayor = 4 y menor= 20
    const productos = await Producto.find({
        $or: [{ nombre: regex }],
        $and: [{ precio: { $lte: 20, $gte: 4 } }]
    }).populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json({
        results: productos
    });
}


/* Producto.find({
    price: { $lte: precioMax || 1000000000, $gte: precioMin || 0 }

    
}); */
const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);

            break;
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se le olvidó realizar esta búsqueda'
            });
    }

}

module.exports = {
    buscar
}
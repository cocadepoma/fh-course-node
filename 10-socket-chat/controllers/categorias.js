const { response } = require("express");
const { Categoria } = require('../models');

const obtenerCategorias = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    try {
        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .populate('usuario', 'nombre')
                .skip(Number(desde))
                .limit(Number(limite))

        ]);

        res.json({
            msg: 'get categorias',
            total,
            categorias
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contacto con el administrador'
        });
    }
}

const obtenerCategoria = async (req, res = response) => {

    const { id } = req.params;

    try {
        const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

        res.json({
            msg: 'obtenercategoria',
            categoria
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contacte con el administrador'
        });
    }

}

const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${nombre} ya existe`
        });
    }

    // Generar los datos a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json(categoria);
}

const actualizarCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const { id } = req.params;

    try {
        const categoriaDB = await Categoria.findOne({ nombre });

        if (categoriaDB) {
            return res.status(400).json({
                msg: `La categoria ${nombre} ya existe`
            });
        }

        // // Generar los datos a guardar
        const data = {
            nombre,
            usuario: req.usuario._id
        }

        const newCategoria = await Categoria.findByIdAndUpdate(id, data, { returnOriginal: false });

        res.json({ newCategoria });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contacte con el administrador'
        });
    }
}

const borrarCategoria = async (req, res = response) => {

    const { id } = req.params;

    try {

        const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { returnOriginal: false });

        res.json({
            categoria
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contacte con el administrador'
        });
    }

}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}
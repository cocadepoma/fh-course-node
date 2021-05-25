const { response } = require("express");
const { Producto } = require("../models");


const obtenerProductos = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    try {
        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.json({
            total, productos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const obtenerProducto = async (req, res = response) => {

    const { id } = req.params;

    try {
        const producto = await Producto.findById(id);

        res.json({
            producto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }


}

const crearProducto = async (req, res = response) => {

    const { estado, usuario, ...body } = req.body;

    const nombre = req.body.nombre.toUpperCase();

    const existeProducto = await Producto.findOne({ nombre });

    if (existeProducto) {
        return res.status(400).json({
            msg: `El producto ${nombre} ya existe en la BBDD`
        });
    }

    try {
        const data = {
            ...body,
            nombre,
            usuario: req.usuario._id,
        }

        const producto = new Producto(data);

        await producto.save();

        res.status(201).json({
            producto
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarProducto = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...body } = req.body;
    const nombre = req.body.nombre.toUpperCase();
    body.usuario = req.usuario._id;

    const productoOld = await Producto.findById(id);

    // Nombre antigo == nuevo, comprueba si el nuevo existe
    if (nombre !== productoOld.nombre) {
        const existeProducto = await Producto.findOne({ nombre });

        if (existeProducto) {
            return res.status(400).json({
                msg: `El producto ${existeProducto.nombre} ya existe en la BBDD`
            });
        }
    }

    try {

        const data = {
            ...body,
            nombre
        }

        const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

        res.json({
            producto
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const eliminarProducto = async (req, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        producto
    });
}


module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}
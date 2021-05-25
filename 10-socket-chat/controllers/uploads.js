
const path = require("path");
const fs = require("fs");

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const { Usuario, Producto } = require("../models");


const cargarArchivo = async (req, res = response) => {

    try {
        const nombre = await subirArchivo(req.files, ['application/pdf'], 'docs');

        res.json({
            nombre
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: error
        });
    }
}

const actualizarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':

            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({
                msg: 'Se me olvidó validar la colección'
            });
    }

    // Borrar la imagen antigua si es que existe
    try {
        if (modelo.img) {
            const pathImagen = path.join(__dirname, '../public/assets/', coleccion, modelo.img);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }
        }
    } catch (error) {
        console.log('Error al borrar la imagen' + error);
    }

    try {

        const nombre = await subirArchivo(req.files, undefined, coleccion);
        modelo.img = nombre;
        await modelo.save();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }

    res.json({
        modelo
    });
}

const mostrarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':

            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({
                msg: 'Se me olvidó validar la colección'
            });
    }

    // Devolver la imagen si es que existe
    try {
        if (modelo.img) {
            const pathImagen = path.join(__dirname, '../public/assets/', coleccion, modelo.img);
            if (fs.existsSync(pathImagen)) {
                return res.sendFile(pathImagen);
            }
        }
    } catch (error) {
        console.log('Error al borrar la imagen' + error);
    }

    const defaultImage = path.join(__dirname, '../public/assets/', 'img', 'no-image.jpg');
    res.sendFile(defaultImage);
}



const actualizarImagenCloudinary = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':

            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
            break;
        case 'productos':

            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }
            break;

        default:
            return res.status(500).json({
                msg: 'Se me olvidó validar la colección'
            });
    }

    // Borrar la imagen antigua si es que existe
    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');

        // await es opcional
        cloudinary.uploader.destroy(public_id);
    }


    const { tempFilePath } = req.files.archivo;

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;

    await modelo.save();

    res.json({
        modelo
    });
}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}
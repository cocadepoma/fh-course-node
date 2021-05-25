const { response } = require('express');
const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');

const getUsuarios = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    // TODO: Check limite && desde if number

    const query = { estado: true };
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite))

    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.json({ total, usuarios });
}

const addUser = async (req, res) => {

    const { nombre, email, password, rol } = req.body;
    const usuario = new Usuario({ nombre, email, password, rol });

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar en DB
    await usuario.save();

    res.json(usuario);
}

const updateUser = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    // Validar contra BBDD
    if (password) {
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const deleteUser = async (req, res) => {

    const { id } = req.params;

    const uid = req.uid;
    const usuarioAutenticado = req.usuario;

    // Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, { returnOriginal: false });

    res.json({
        usuario,
        uid
    });
}

const patchUser = (req, res) => {
    res.json({
        message: 'patch api'
    });
}

module.exports = {
    getUsuarios,
    updateUser,
    addUser,
    deleteUser,
    patchUser
}

const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


const validarJWT = async (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Invalid token'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Invalid token - usuario no existe'
            });
        }


        // Verificar si el uid tiene estado en true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Invalid token - usuario estado false'
            });
        }

        req.uid = uid;
        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }

}

module.exports = {
    validarJWT
}
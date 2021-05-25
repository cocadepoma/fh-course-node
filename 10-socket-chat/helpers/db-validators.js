
const Role = require('../models/rol');
const Usuario = require('../models/usuario');

// Verificar si el rol existe en BBDD
const esRolValido = async (rol = '') => {

    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BBDD`);
    }

}

const emailExiste = async (email = '') => {

    // Verificar si el correo existe en BBDD
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
        throw new Error(`El email ${email} ya está registrado`);
    }

}

const existeUsuarioPorID = async (id = '') => {

    // Verificar si el correo existe en BBDD
    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`);
    }

}


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorID
}
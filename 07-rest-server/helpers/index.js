const dbValidators = require('./db-validators');
const generarJWT = require('./generar-jwt');
const googleVerify = require('./google-verify');
const existeProducto = require('./existe-producto');
const existeCategoria = require('./existe-categoria');
const subirArchivo = require('./subir-archivo');


module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...existeProducto,
    ...existeCategoria,
    ...subirArchivo,
}
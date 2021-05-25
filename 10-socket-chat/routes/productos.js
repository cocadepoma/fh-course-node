
const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productos');
const { existeCategoria } = require('../helpers/existe-categoria');

const { existeProducto } = require('../helpers/existe-producto');

const { validarCampos, esAdminRole, validarJWT } = require('../middlewares/');

const router = Router();

// Obtener todas los productos - publico
router.get('/', obtenerProductos);

// Obtener una producto por id - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], obtenerProducto);

// Crear un producto - persona con token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
], crearProducto);

// Actualizar una categoria - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('categoria', 'La categoria es obligatoria').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeProducto),
    validarCampos
], actualizarProducto);

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], eliminarProducto);

module.exports = router;
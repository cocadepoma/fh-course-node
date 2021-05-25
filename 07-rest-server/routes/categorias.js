
const { Router } = require('express');
const { check } = require('express-validator');
const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria } = require('../controllers/categorias');

const { existeCategoria } = require('../helpers/existe-categoria');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares/');

const router = Router();

// Obtener todas las categorías - publico
router.get('/', obtenerCategorias);

// Obtener una categorias por id - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], obtenerCategoria);

// Crear una categoria - persona con token válido
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
], crearCategoria);

// Actualizar una categoria - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], actualizarCategoria);

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], borrarCategoria);

module.exports = router;
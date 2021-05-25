
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole } = require('../middlewares');

const { esRolValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');

const {
    getUsuarios,
    updateUser,
    addUser,
    deleteUser,
    patchUser
} = require('../controllers/usuarios');

const router = Router();



router.get('/', getUsuarios);


router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom(esRolValido),
    validarCampos
], updateUser);


router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de tener más de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('email').custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos
], addUser);

// Podemos aplicar esAdminRole, que sólo permitirá que borren administradores
// o podemos usar tieneRole, el cual mirará entre varios roles que definamos
// para poder borrar
router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
], deleteUser);

router.patch('/', patchUser);


module.exports = router;
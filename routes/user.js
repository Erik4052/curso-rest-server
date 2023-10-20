const { Router } = require('express');
const { check } = require('express-validator');
const {validRole, existEmail, userExistsById} = require('../helpers/db-validators');
const { getUsers, updateUsers, deleteUsers, createUsers, patchUsers} = require('../controllers/users.controller');

/* const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole, hasRole } = require('../middlewares/validate-role'); */

const {validateFields,validateJWT,hasRole,isAdminRole} = require('../middlewares/index');
const router = Router();



router.get('/', getUsers );

  router.put('/:id',
    check('id','id is not valid').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom( validRole),
    validateFields,
    updateUsers);

  router.delete('/:id',[
  validateJWT,
  //isAdminRole,
  hasRole('ADMIN_ROLE', 'SALES_ROLE'),
  check('id','id is not valid').isMongoId(),
  check('id').custom(userExistsById),
  validateFields],
  deleteUsers);

  router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required and it has to be more than 6 letters').isLength({min:6}),
    check('email', 'Invalid email').isEmail(),
    check('email').custom(existEmail),
    //check('role', 'This is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(role => validRole(role)), //We can use this also: check('role').custom( validRole)
    validateFields
  ], createUsers);

  router.patch('/', patchUsers);










module.exports = router;
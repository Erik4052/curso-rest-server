const { Router } = require('express');
const {getUsers, updateUsers, deleteUsers, createUsers, patchUsers} = require('../controllers/users.controller');
const router = Router();


router.get('/', getUsers );

  router.put('/:id', updateUsers);

  router.delete('/', deleteUsers);

  router.post('/', createUsers);

  router.patch('/', patchUsers);










module.exports = router;
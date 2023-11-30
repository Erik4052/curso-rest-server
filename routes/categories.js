const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { createCategory, getCategories, getCategoriesById, updateCategories, deleteCategory } = require('../controllers/categories.controller');
const { validateJWT } = require('../middlewares');

const router = Router();


router.post('/',[validateJWT, check('name','Category Name is required').not().isEmpty(), validateFields], createCategory);
router.get('/getCategories',[], getCategories);
router.get('/:id', [],getCategoriesById);
router.put('/:id',[], updateCategories);
router.delete('/:id',[], deleteCategory);






module.exports = router
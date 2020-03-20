const categoryRouter = require('express').Router();
const Category = require('../controller/CategoryController');
const passport = require('passport');

//get all categories
categoryRouter.get('/', async (req, res) => await Category.getAllCategories(req,res) );

//add new category
categoryRouter.post('/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => Category.addNewCategory(req,res));

//get all books from spacafec category
categoryRouter.get('/:id', (req, res) => Category.getBooksCategory(req,res));

// update category by id
categoryRouter.put('/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => Category.updateCategoryById(req,res));

//delete category by id
categoryRouter.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => Category.deleteCategoryById(req,res));

module.exports = categoryRouter;

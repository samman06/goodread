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


module.exports = categoryRouter;

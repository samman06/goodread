const categoryRouter = require('express').Router();
const Category = require('../controller/CategoryController');
const passport = require('passport');

//get all categories
categoryRouter.get('/', async (req, res) => await Category.getAllCategories(req,res) );

//add new category
categoryRouter.post('/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => Category.addNewCategory(req,res));

module.exports = categoryRouter;

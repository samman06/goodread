const categoryRouter = require('express').Router();
const Category = require('../controller/CategoryController');

//get all categories
categoryRouter.get('/', async (req, res) => await Category.getAllCategories(req,res) );

module.exports = categoryRouter;

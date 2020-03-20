const CategoryModel = require('../models/category');

class CategoryController {

    async getAllCategories(req, res) {
        try {
            const categories = await CategoryModel.find()
            return res.json(categories)
        } catch (e) {
            return res.json({msg: 'error in getting data'})
        }
    }


}

const Category = new CategoryController();
module.exports = Category;

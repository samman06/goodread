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

    async addNewCategory(req, res) {
        const {name} = req.body;
        if (!req.user.isAdmin) return res.status(400).json({msg: 'Un Authorized Access'});
        try {
            let category = await CategoryModel.findOne({name});
            if (category) return res.json({errors: {name: 'category already exists'}});
            category = new CategoryModel({name});
            category = await category.save();
            return res.json({category})
        } catch (err) {
            res.json({err})
        }

    }

}

const Category = new CategoryController();
module.exports = Category;

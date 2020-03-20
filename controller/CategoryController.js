const BookModel = require('../models/book');
const CategoryModel = require('../models/category');
const validation = require("../validation/inputsValidation");

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
        const {errors, isValid} = validation.validateCategoryInputs(name);
        if (!isValid) return res.json({errors});
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

    async getBooksCategory({params}, res) {
        try {
            const books = await BookModel.find({categoryId: params.id})
            return res.json(books)
        } catch (err) {
            return res.json({err})
        }
    }

    async updateCategoryById({user, body, params}, res) {
        const {name} = body;
        if (!user.isAdmin) return res.status(400).json({msg: 'Un Authorized Access'});
        const {errors, isValid} = validation.validateCategoryInputs(name);
        if (!isValid) return res.json(errors);
        try {
            await CategoryModel.updateOne({_id: params.id}, {$set: {name: name},});
            return res.json({message: 'updated'})
        } catch (err) {
            return res.json({err})
        }
    }

    async deleteCategoryById(req, res) {
        if (!req.user.isAdmin) return res.status(400).json({msg: 'Un Authorized Access'});
        try {
            await CategoryModel.findByIdAndRemove(req.params.id)
            try {
                await BookModel.remove({categoryId: req.params.id})
            } catch (err) {
                return res.json({err})
            }
            return res.json({message: 'deleted'})
        } catch (err) {
            return res.json({err})
        }
    }
}

const Category = new CategoryController();
module.exports = Category;

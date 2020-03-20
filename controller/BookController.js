const BookModel = require('../models/book');
const CategoryModel = require('../models/category');
const AuthorModel = require('../models/author');
const validation = require("../validation/inputsValidation");


class BookController {

    async getAllBooks(req, res) {
        try {
            const books = await BookModel.find().populate('authorId');
            return res.json({books})
        } catch (e) {
            console.log(e)
        }
    }

    async addNewBook(req, res) {
        if (req.user.isAdmin != true) return res.status(400).json({msg: 'Un Authorized Access'});
        const {name, categoryId, authorId, authorName, photo = ""} = req.body;
        const {errors, isValid} = validation.validateBookInputs(name);
        if (!isValid) return res.json({errors});
        try {
            console.log(categoryId, name, authorId, authorName);
            const category = await CategoryModel.findById(categoryId);
            if (!category) return res.json({errors: {categoryName: 'this category dose not exist'}});
            const author = await AuthorModel.findOne({authorName});
            if (!author) return res.json({errors: {author: 'this AuthorModel dose not exist'}});
            let book = await BookModel.findOne({name, authorId, categoryId});
            if (book) return res.json({errors: {name: 'this book already exist'}});
            book = new BookModel({photo, name, categoryId, authorId});
            book = await book.save();
            return res.json({book})
        } catch (e) {
            return res.json({error: e});
        }
    }

}

const Book = new BookController();
module.exports = Book;

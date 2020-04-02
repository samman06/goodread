const BookModel = require('../models/book');
const CategoryModel = require('../models/category');
const userBooksModel = require('../models/userBook');
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

    async getAllBooksAndUserRattedBooks(req, res) {
        const userId = req.user._id;
        let books = await BookModel.find();
        let userBooks = await userBooksModel.find({userId}, {userId: 0});
        let userRattedBook = {};
        await userBooks.map(book => {
            userRattedBook[book.bookId] = book;
        });
        books = await books.map(({_id, rate, photo, name, categoryId, authorId}) => ({
            _id, rate, photo, name, categoryId, authorId, userBook: userRattedBook[_id]
        }));

        return res.json({books})
    }

    async addNewBook(req, res) {
        if (req.user.isAdmin !== true) return res.status(400).json({msg: 'Un Authorized Access'});
        const {name, categoryId, authorId, authorName, photo = ""} = req.body;
        const {errors, isValid} = validation.validateBookInputs(name);
        if (!isValid) return res.json({errors});
        try {
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


    async getBookById({params, user}, res) {
        try {
            let book = await BookModel.findById(params.id).populate('categoryId')
                .populate('authorId', ["firstName", "lastName", "_id"]);
            let {_id, photo, name, categoryId, authorId} = book;
            const bookUser = await userBooksModel.findOne({bookId: params.id, userId: user._id});
            if (bookUser) book = {_id, photo, name, categoryId, authorId, bookUser};
            return res.json({book})
        } catch (err) {
            return res.json({msg: err});
        }
    }

    async getCategoryBooks(req, res) {
        let {categoryId} = req.params;
        try {
            const books = await BookModel.find({categoryId}).populate('categoryId');
            return res.json({books})
        } catch (e) {
            console.log("no books")
        }
    }

    async getAuthorBooks(req, res) {
        let {authorId} = req.params;
        try {
            const books = await BookModel.find({authorId});
            return res.json({books})
        } catch (e) {
            console.log("no books")
        }
    }

    async updateBookById(req, res) {
        if (!req.user.isAdmin) return res.status(400).json({msg: 'Un Authorized Access'});
        const {name, categoryId, authorId, rate, photo} = req.body;
        const {errors, isValid} = validation.validateBookInputs(name);
        if (!isValid) return res.json({errors});
        try {
            const book = await BookModel.findOneAndUpdate(req.params.id, {
                photo, name, categoryId, authorId, rate
            });
            return res.json({book})
        } catch (err) {
            return res.json({err});
        }
    }

    async deleteBookById(req, res) {
        if (!req.user.isAdmin) return res.status(400).json({msg: 'Un Authorized Access'});
        try {
            await BookModel.findByIdAndRemove(req.params.id);
            return res.json({message: "deleted"})
        } catch (err) {
            return res.json({errors: {err}});
        }
    }
}

const Book = new BookController();
module.exports = Book;

const express = require('express');
const bookRouter = express.Router();
const multer = require('multer');
const passport = require('passport');
const {storage, fileFilter} = require('../configs/multr');
const Book = require("../controller/BookController");
const upload = multer({
    storage, fileFilter,
    limits: {fileSize: 1024 * 1024 * 5},
});

//get all books
bookRouter.get('/',
    passport.authenticate('jwt', {session: false}),
    async (req, res) =>
        await Book.getAllBooks(req, res)
);

//get all books and user rated books
bookRouter.get('/user',
    passport.authenticate('jwt', {session: false}),
    async (req, res) =>
        await Book.getAllBooksAndUserRattedBooks(req, res)
);

//add new book
bookRouter.post('/',
    passport.authenticate('jwt', {session: false}),
    upload.single('photo'),
    async (req, res) =>
        await Book.addNewBook(req, res)
);


//get book by id
bookRouter.get('/:id',
    passport.authenticate('jwt', {session: false}),
    async (req, res) =>
        await Book.getBookById(req, res)
);

//get book by id
bookRouter.get('/category/:categoryId',
    async (req, res) => await Book.getCategoryBooks(req, res)
);

//get book by id
bookRouter.get('/author/:authorId',
    async (req, res) => await Book.getAuthorBooks(req, res)
);

// update book by id
bookRouter.put('/:id',
    passport.authenticate('jwt', {session: false}),
    upload.single('photo'),
    async (req, res) =>
        await Book.updateBookById(req, res)
);

//delete book by id
bookRouter.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    async (req, res) =>
        await Book.deleteBookById(req, res)
);

module.exports = bookRouter;

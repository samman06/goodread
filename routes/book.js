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
    async (req, res) =>
        await Book.getAllBooks(req, res)
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
    async (req, res) =>
        await Book.getBookById(req, res)
);

module.exports = bookRouter;

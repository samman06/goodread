const express = require('express');
const bookRouter = express.Router();
const Book = require("../controller/BookController");

//get all books
bookRouter.get('/',
    async (req, res) =>
        await Book.getAllBooks(req, res)
);


module.exports = bookRouter;

const BookModel = require('../models/book');


class BookController {

    async getAllBooks(req, res) {
        try {
            const books = await BookModel.find().populate('authorId');
            return res.json({books})
        } catch (e) {
            console.log(e)
        }
    }

}

const Book = new BookController();
module.exports = Book;

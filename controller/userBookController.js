const userBooksModel = require('../models/userBook');
const authorModel = require('../models/author');

class UserBooks {
    async addUserBook(req, res) {
        const {bookId, userId, shelve, rate} = req.body;
        try {
            let book = new userBooksModel({bookId, userId, shelve, rate});
            book = await book.save();
            return res.json({book});
        } catch (err) {
            return res.json({err})
        }
    }

    async getUserBooks(req, res) {
        const {userId} = req.params;
        try {
            let books = await userBooksModel.find({userId}, {userId: 0})
                .populate('bookId', ["name", "authorId", "photo"]);
            books = books.map(async (book) => {
                book.bookId.authorId = await authorModel.findById(book.bookId.authorId, {firstName: 1, lastName: 1});
                return book;
            });
            books = await Promise.all(books);
            return res.json({books});
        } catch (err) {
            return res.json({err})
        }
    }

}

const userBooksController  = new UserBooks();
module.exports = userBooksController ;

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

    async updateUserBookById(req, res) {
        const {rateId, shelve, rate} = req.body;
        let userBook = {shelve, rate,};
        try {
            console.log(1);
            console.log(userBook);
            await userBooksModel.findByIdAndUpdate(rateId, {...userBook});
            return res.json({book: "OK"})
        } catch (err) {
            return res.json({err})
        }
    }

    async updateUserBookByName(req, res) {
        let userId = req.user._id;
        const {bookId, shelve, rate} = req.body;
        let userBook = {shelve, rate};
        try {
            console.log(userBook);
            console.log(bookId);
            console.log(userId);
            await userBooksModel.findOneAndUpdate({bookId,userId}, {...userBook},{
                new: true,
                upsert: true
            });
            return res.json({book: "OK"})
        } catch (err) {
            return res.json({err})
        }
    }

    async removeUserBook(req, res) {
        try {
            await userBooksModel.findByIdAndRemove(req.params.id);
            return res.json({message: "deleted "})
        } catch (err) {
            console.log(err);
            return res.json({err: err})
        }
    }
}

const userBooksController  = new UserBooks();
module.exports = userBooksController ;

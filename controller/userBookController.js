const userBooksModel = require('../models/userBook');

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

}

const userBooksController  = new UserBooks();
module.exports = userBooksController ;

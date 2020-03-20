const AuthorModel = require('../models/author');

class AuthorController {
    async getAllAuthors(req, res) {
        try {
            const authors = await AuthorModel.find();
            return res.json(authors)
        } catch (e) {
            return res.send('error in getting data')
        }
    }

}

const Author = new AuthorController();
module.exports = Author;

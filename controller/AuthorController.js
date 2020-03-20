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

    async addNewAuthor(req, res) {
        if (!req.user.isAdmin) return res.json({msg: 'Un Authorized Access'});
        const {dateOfBirth, photo, description, firstName, lastName} = req.body;
        try {
            let author = await AuthorModel.findOne({firstName, lastName});
            if (author) return res.json({errors: {firstName: 'author already exists'}});
            const newAuthor = new AuthorModel({
                photo: photo || '',
                firstName, lastName, dateOfBirth,
                description: description || ''
            });
            author = await newAuthor.save();
            console.log(author);
            return res.json({author})
        } catch (e) {
            return res.json({error: e})
        }
    }

}

const Author = new AuthorController();
module.exports = Author;

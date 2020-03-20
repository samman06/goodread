const AuthorModel = require('../models/author');
const validation = require("../validation/inputsValidation");

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
        const {errors, isValid} = validation.validateAuthorInputs(req.body);
        if (!isValid) return res.json({errors});
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

    async getAuthorById({params}, res) {
        try {
            const author = await AuthorModel.findById(params.id);
            return res.send(author)
        } catch (e) {
            return res.send('error in getting data');
        }
    }
}

const Author = new AuthorController();
module.exports = Author;

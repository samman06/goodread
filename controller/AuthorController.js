const AuthorModel = require('../models/author');
const BookModel = require('../models/book');
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

    async updateAuthorById({body, params}, res) {
        if (!req.user.isAdmin) return res.json({msg: 'Un Authorized Access'});
        const {errors, isValid} = validation.validateAuthorInputs(body);
        if (!isValid) return res.json(errors);
        const {firstName, lastName, dateOfBirth, description, photo} = body;
        try {
            await AuthorModel.findOneAndUpdate(params.id, {
                photo, firstName, lastName, dateOfBirth, description
            });
            return res.send({message: 'updated'})
        } catch (e) {
            return res.send({error: 'error in update data'});
        }
    }

    async deleteAuthorById({user, params}, res) {
        if (!user.isAdmin) return res.json({msg: 'Un Authorized Access'});
        try {
            await AuthorModel.findByIdAndRemove(params.id);
            await BookModel.remove({authorId: params.id});
            return res.json({message: 'deleted'});
        } catch (e) {
            return res.send({error: 'error in delete data '});
        }
    }

    async getAuthorBooks({params}, res) {
        try {
            const authorBooks = await BookModel.find({authorId: params.id});
            return res.json(authorBooks)
        } catch (e) {
            return res.send('error in getting data ' + e)
        }
    }
}

const Author = new AuthorController();
module.exports = Author;

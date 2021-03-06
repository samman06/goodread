const express = require('express');
const authorRouter = express.Router();
const passport = require('passport');
const upload = require('../configs/multr');
const AuthorController = require("../controller/AuthorController");

//get all authors
authorRouter.get('/', (req, res) =>
    AuthorController.getAllAuthors(req, res)
);

//add new author
authorRouter.post('/',
    passport.authenticate('jwt', {session: false}),
    upload.single('photo'),
    (req, res) => AuthorController.addNewAuthor(req, res)
);

//get author by id
authorRouter.get('/:id',
    (req, res) => AuthorController.getAuthorById(req, res)
);

// update author by id
authorRouter.put('/:id',
    passport.authenticate('jwt', {session: false}), upload.single('photo'),
    (req, res) => AuthorController.updateAuthorById(req, res)
);

//delete author by id
authorRouter.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => AuthorController.deleteAuthorById(req, res)
);

//get books of specific author 
authorRouter.get('/:id/books',
    (req, res) => AuthorController.getAuthorBooks(req, res)
);

module.exports = authorRouter;

const express = require('express');
const authorRouter = express.Router();
const multer = require('multer');
const passport = require('passport');
const {storage, fileFilter} = require('../configs/multr');
const AuthorController = require("../controller/AuthorController");

const upload = multer({
    storage, fileFilter,
    limits: {fileSize: 1024 * 1024 * 5},
});
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

module.exports = authorRouter;

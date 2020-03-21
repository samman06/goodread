const express = require('express');
const passport = require('passport');
const userBookRouter = express.Router();
const userBooksController = require("../controller/userBookController");

userBookRouter.post('/', (req, res) =>
    userBooksController.addUserBook(req, res)
);

userBookRouter.get('/:userId',
    passport.authenticate('jwt', {session: false}),
    (req, res) =>
    userBooksController.getUserBooks(req, res)
);

userBookRouter.put('/',
    passport.authenticate('jwt', {session: false}),
    (req, res) =>
    userBooksController.updateUserBookById(req, res)
);

userBookRouter.put('/book',
    passport.authenticate('jwt', {session: false}),
    (req, res) =>
    userBooksController.updateUserBookByName(req, res)
);

userBookRouter.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    (req, res) =>
    userBooksController.removeUserBook(req, res)
);

module.exports = userBookRouter;

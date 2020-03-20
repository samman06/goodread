const express = require('express');
const userBookRouter = express.Router();
const userBooksController = require("../controller/userBookController");

userBookRouter.post('/', (req, res) =>
    userBooksController.addUserBook(req, res)
);

userBookRouter.get('/:userId', (req, res) =>
    userBooksController.getUserBooks(req, res)
);

userBookRouter.put('/', (req, res) =>
    userBooksController.updateUserBook(req, res)
);

module.exports = userBookRouter;

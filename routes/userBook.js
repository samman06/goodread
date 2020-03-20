const express = require('express');
const userBookRouter = express.Router();
const userBooksController = require("../controller/userBookController");

userBookRouter.post('/', (req, res) =>
    userBooksController.addUserBook(req, res)
);

module.exports = userBookRouter;

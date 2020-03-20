const express = require('express');
const authorRouter = express.Router();
const AuthorController = require("../controller/AuthorController");


//get all authors
authorRouter.get('/', (req, res) =>
    AuthorController.getAllAuthors(req, res)
);


module.exports = authorRouter;

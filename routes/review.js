const express = require('express');
const reviewRouter = express.Router();
const reviewsController = require("../controller/reviewController");

reviewRouter.post('/', (req, res) => reviewsController.addReview(req, res));


module.exports = reviewRouter;
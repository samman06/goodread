const express = require('express');
const passport = require('passport');
const reviewRouter = express.Router();
const reviewsController = require("../controller/reviewController");

reviewRouter.post('/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => reviewsController.addReview(req, res));

reviewRouter.get('/:id', (req, res) => reviewsController.getBookReviews(req, res));

reviewRouter.put('/:id', (req, res) => reviewsController.updateReview(req, res));

reviewRouter.delete('/:id', (req, res) => reviewsController.removeReview(req, res));

module.exports = reviewRouter;

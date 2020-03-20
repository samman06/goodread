const ReviewModel = require('../models/review');
const validation = require("../validation/inputsValidation");

class Reviews {
    async addReview(req, res) {
        const {review, bookId, userId} = req.body;
        const {errors, isValid} = validation.validationReviewInput(review);
        if (!isValid) return res.status(404).json(errors);
        try {
            const newReview = new ReviewModel({review, bookId, userId});
            await newReview.save();
            return res.json({msg: 'review saved'});
        } catch (e) {
            return res.json({msg: e});
        }
    }

    async getBookReviews(req, res) {
        try {
            const reviews = await Review.find()
                .populate('bookId')
                .populate('userId');
            return res.json(reviews)
        } catch (e) {
            return res.json(e);
        }
    }

    async updateReview(req, res) {
        const {body, userId, bookId} = req.body;
        try {
            const review = await Review.findOneAndUpdate(req.params.id, {body, userId, bookId})
            return res.json({review})
        } catch (e) {
            return res.json({msg: e})
        }
    }

    
}

const ReviewsController = new Reviews();
module.exports = ReviewsController;

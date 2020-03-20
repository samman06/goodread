const ReviewModel = require('../models/review');
const validation = require("../validation/inputsValidation");

class Reviews {
    async addReview({user, body}, res) {
        const {_id} = user;
        const {review, bookId} = body;
        const {errors, isValid} = validation.validationReviewInput(review);
        if (!isValid) return res.json({errors});
        try {
            let newReview = new ReviewModel({review, bookId, userId: _id});
            newReview = await newReview.save();
            return res.json({review:newReview});
        } catch (e) {
            return res.json({e});
        }
    }

    async getBookReviews({params}, res) {
        try {
            const reviews = await ReviewModel.find({bookId: params.id}, {_id: 1, userId: 1, review: 1})
                .populate('userId', ["_id", "firstName", "lastName"]);
            return res.json({reviews})
        } catch (e) {
            return res.json(e);
        }
    }

    async updateReview(req, res) {
        const {body, userId, bookId} = req.body;
        try {
            const review = await ReviewModel.findOneAndUpdate(req.params.id, {body, userId, bookId})
            return res.json({review})
        } catch (err) {
            return res.json({err})
        }
    }

    async removeReview(req, res) {
        try {
            const review = await ReviewModel.findByIdAndRemove(req.params.id);
            return res.json({review})
        } catch (err) {
            return res.json({err})
        }
    }


}

const ReviewsController = new Reviews();
module.exports = ReviewsController;

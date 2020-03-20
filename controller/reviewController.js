const ReviewModel = require('../models/review');
const validation = require("../validation/inputsValidation");

class Reviews {
    async addReview({user, body}, res) {
        const userId = user._id;
        let {review, bookId} = body;
        const {errors, isValid} = validation.validationReviewInput(review);
        if (!isValid) return res.json({errors});
        try {
            let newReview = new ReviewModel({review, bookId, userId});
            review = await newReview.save();
            let populateOptions = {path: "userId", select: ["_id", "firstName", "lastName"]}
            review = await ReviewModel.populate(review, populateOptions);
            return res.json({review});
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

    async removeReview({params}, res) {
        try {
            await ReviewModel.findByIdAndRemove(params.id);
            return res.json({message: "review removed"})
        } catch (err) {
            return res.json({err})
        }
    }


}

const ReviewsController = new Reviews();
module.exports = ReviewsController;

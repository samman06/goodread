const ReviewModel = require('../models/review');

class Reviews {
    async addReview(req, res) {
        const {review, bookId, userId} = req.body;
        try {
            const newReview = new ReviewModel({review, bookId, userId});
            await newReview.save();
            return res.json({msg: 'review saved'});
        } catch (e) {
            return res.json({msg: e});
        }
    }
}

const ReviewsController = new Reviews();
module.exports = ReviewsController;

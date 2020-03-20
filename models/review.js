const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books"
    }
});

const Review = mongoose.model('reviews', reviewSchema);
module.exports = Review;

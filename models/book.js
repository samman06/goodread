const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    photo: String,
    name: String,
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'categories'},
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'authors'},
    rate: {type: Number, default: 0},
});

const Book = mongoose.model('books', bookSchema);
module.exports = Book;

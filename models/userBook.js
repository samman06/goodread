const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userBookSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books"
    },
    shelve: { type: 'String', enum: ['reading', 'wilRead', 'read','not'], default: null },
    rate: { type: Number, default: null }
});

const UserBook = mongoose.model('userBooks', userBookSchema);
module.exports = UserBook;

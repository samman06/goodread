const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required: "First Name is required"},
    lastName: {type: String, required: "Last Name is required"},
    // userName: {type: String, trim: true, required: 'Username is required'},
    email: {
        type: String, trim: true, lowercase: true, unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {type: String, required: "Password is required"},
    photo: String,
    isAdmin: {type: Boolean, default: false},
    Books: [{}],
    selectedBook: {
        photo: String, name: String,
        category: String, author: String,
        rate: {type: Number, default: null},
        shelve: {type: String, default: null}
    }
});


module.exports = User = mongoose.model('users', userSchema);
;

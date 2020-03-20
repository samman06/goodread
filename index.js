const express = require('express');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const passport = require('passport');
const keys = require('./configs/keys');

const adminRouter = require('./routes/admin');
const authorRouter = require('./routes/authors');
const categoryRouter = require('./routes/categories');
const bookRouter = require('./routes/book');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/uploads', express.static('uploads'));

const uri = keys.mongoURI;
mongoose.set('useCreateIndex', true);
mongoose.connect(uri, {useNewUrlParser: true})
    .then(() => console.log("done"))
    .catch(err => {
        console.log(err);
    });

app.use(passport.initialize());
require("./configs/passport")(passport);
//admin router
app.use('/admin', adminRouter);
//authors router
app.use('/authors', authorRouter);
//categories router
app.use('/categories', categoryRouter);
// books router
app.use('/books', bookRouter);

app.listen(PORT, (req, res) => {
    console.log("server running on port: " + PORT);
});


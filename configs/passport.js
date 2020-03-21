const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const user = mongoose.model("users");
const keys = require("../configs/keys_dev");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
    passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
        user.findById(jwt_payload._id)
            .then(user => {
                if (user) return done(null, user);
                else return done(null, false)
            })
            .catch(err => console.log("proplem with passport function that return current user"))
    })
    );
};
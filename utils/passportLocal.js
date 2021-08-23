var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/userModels");
module.exports = function (passport) {
    passport.use(new LocalStrategy(
        function (username, password, done) {
            console.log("hello from local");
            User.findOne({ email: username }, async function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!(await user.correctPassword(password, user.password))) {
                    console.log(password, user.password);
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(err, user);
            }).select('+password');
        }
    ));
}
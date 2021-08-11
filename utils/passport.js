var jwtStrategy = require("passport-jwt").Strategy;
var extractJwt = require("passport-jwt").ExtractJwt;
const User = require("./../models/userModels");
module.exports = function (passport) {
    passport.use(
        new jwtStrategy({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
        },
            function (jwtPayload, next) {
                User.findById(jwtPayload.id, function (err, emp) {
                    if (err) {
                        return next(err, false)
                    }
                    if (emp) {
                        next(null, emp);
                    }
                    else {
                        next(null, false);
                    }
                });
            }
        )
    )

}
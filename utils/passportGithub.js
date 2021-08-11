var GitHubStrategy = require('passport-github').Strategy;


module.exports = function (passport) {
    passport.use(new GitHubStrategy({
        clientID: "a9bc44a661d9a64060bd",
        clientSecret: "19a64dc6e785ec06471aaf217225310824ce4fc8",
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
        function (accessToken, refreshToken, profile, cb) {
            // User.findOrCreate({ githubId: profile.id }, function (err, user) {
            //     return cb(err, user);
            // });
            console.log(profile);
            cb(null, profile);
        }
    ));
}

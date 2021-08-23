var axios = require('axios');
var User = require("./../models/userModels")
var GitHubStrategy = require('passport-github').Strategy;
module.exports = function (passport) {
    passport.use(new GitHubStrategy({
        clientID: process.env.PASSPORT_CLIENTID_GITHUB,
        clientSecret: process.env.PASSPORT_SECRET_GITHUB,
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
        function (accessToken, refreshToken, profile, cb) {
            console.log("hello from github");

            console.log(profile.emails[0].value);
            var data = JSON.stringify({
                "access_token": accessToken
            });
            var config = {
                method: 'post',
                url: 'https://api.github.com/applications/a9bc44a661d9a64060bd/token',
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': 'Basic YTliYzQ0YTY2MWQ5YTY0MDYwYmQ6MTlhNjRkYzZlNzg1ZWMwNjQ3MWFhZjIxNzIyNTMxMDgyNGNlNGZjOA==',
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)
                .then(function (response) {
                    if (response.data.user.id == (profile.id)) {
                        console.log("User authenticated");
                        User.find({ email: profile.emails[0].value }, function (err, user) {
                            return cb(err, user[0]);
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    ));
    // passport.serializeUser(function (user, cb) {
    //     console.log("serialize", user)
    //     cb(null, user._id);//this is setting ID to session
    // })
    // passport.deserializeUser(function (id, cb) {
    //     User.findById(id, function (err, user) {
    //         console.log("deserialize", id);
    //         cb(null, user);//user object attached to req.user
    //     });
    // });
}

const express = require('express');

const mongoSanitize = require('express-mongo-sanitize');

const xss = require('xss-clean');

const hpp = require('hpp');

const rateLimit = require('express-rate-limit');

const helmet = require('helmet');

const morgan = require('morgan');

const AppError = require('./utils/appError');

const globalErrorHandler = require('./controller/errorController');

const tourRouter = require('./Routes/tourRoutes');

const reviewRouter = require('./Routes/reviewRoutes');

const userRouter = require('./Routes/userRoutes');

var passport = require("passport");

const User = require("./models/userModels");

const session = require("express-session");

var GitHubStrategy = require('passport-github').Strategy;
const app = express();
//set security http headers
app.use(helmet());
//body parser to read data from body into req.body
app.use(express.json({ limit: '10kb' }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//Data sanitisation against noSql query injection
app.use(mongoSanitize());
//Data sanitisation against xss
app.use(xss());
//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ], //agar duration 2 bar ayega query me to koi problem nhi hai but agr sort 2 bar aya to galat hai isiliye usme hum sirf last wala lenge
  })
);
//Limit requests from same API
const limiter = rateLimit({
  max: 100, //itni requests per hour
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP please try again in 1 hour',
});

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
}));
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     secure: false,
//     maxAge: 24 * 60 * 60 * 1000,
//   }
// }));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, cb) {
  console.log("serialize", user);
  cb(null, user);
})
passport.deserializeUser(function (id, cb) {
  console.log("deserialize", id);
  User.findById(id, function (err, user) {
    cb(null, id);
  });
});
passport.use(new GitHubStrategy({
  clientID: process.env.PASSPORT_CLIENTID,
  clientSecret: process.env.PASSPORT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
},
  function (accessToken, refreshToken, profile, cb) {
    console.log(profile);
    console.log("accesstoken", accessToken);
    User.find({ githubProfileUrl: profile.profileUrl }, function (err, user) {
      console.log("user", user);
      return cb(err, user[0]);
    });
    // cb(null, profile);
  }
));

function ensureAuthenticated(req, res, next) {
  // console.log("usercheck", req._passport.session.user);
  console.log("req.user", req.user);
  if (req.user) {
    console.log("hello");
    return next();
  }
  res.send("Not logged in");
}
app.use('/api', limiter);
app.use("/api", ensureAuthenticated);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/api/v1/tours');
  });
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`), 404);
});
app.use(globalErrorHandler);
module.exports = app;

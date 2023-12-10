const express = require('express');

const mongoSanitize = require('express-mongo-sanitize');

const xss = require('xss-clean');

const hpp = require('hpp');

// const mongoose = require("mongoose");

const rateLimit = require('express-rate-limit');

const helmet = require('helmet');

const morgan = require('morgan');

const bodyParser = require("body-parser");

const AppError = require('./utils/appError');

const globalErrorHandler = require('./controller/errorController');

const tourRouter = require('./Routes/tourRoutes');

const reviewRouter = require('./Routes/reviewRoutes');

const userRouter = require('./Routes/userRoutes');

var flash = require('connect-flash');

var passport = require("passport");

const User = require("./models/userModels");

const session = require("express-session");

// const MongoDBSession = require("connect-mongodb-session")(session);

// const DB = process.env.DATABASE;
// mongoose
//   .connect(DB, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log('Connection successful for session '));

// const store = new MongoDBSession({
//   uri: process.env.DATABASE,
//   collection: "mySessions"
// })
const app = express();
const port = 8080;

app.get("/",(req,res)=>{
  res.status(200).json({
    "message":"Hi"}
                      )})
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// app.use(bodyParser.urlencoded({ extended: false }));
// //set security http headers
// app.use(helmet());
// //body parser to read data from body into req.body
// app.use(express.json({ limit: '10kb' }));
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }
// //Data sanitisation against noSql query injection
// app.use(mongoSanitize());
// //Data sanitisation against xss
// app.use(xss());
// //Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       'duration',
//       'ratingsQuantity',
//       'ratingsAverage',
//       'maxGroupSize',
//       'difficulty',
//       'price',
//     ], //agar duration 2 bar ayega query me to koi problem nhi hai but agr sort 2 bar aya to galat hai isiliye usme hum sirf last wala lenge
//   })
// );
// //Limit requests from same API
// const limiter = rateLimit({
//   max: 100, //itni requests per hour
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP please try again in 1 hour',
// });

// app.use(session({
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: false,
//   store: store,
//   cookie: { maxAge: 24 * 60 * 60 * 1000 },
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
// passport.serializeUser(function (user, cb) {
//   console.log("serialize", user)
//   cb(null, user._id);//this is setting ID to session
// })
// passport.deserializeUser(function (id, cb) {
//   User.findById(id, function (err, user) {
//     console.log("deserialize", id);
//     cb(null, user);//user object attached to req.user
//   });
// });
// require("./utils/passportGithub")(passport);
// require("./utils/passportLocal")(passport);
// app.use('/api', limiter);
// app.use('/api/v1/tours', tourRouter);
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/reviews', reviewRouter);

// //Github Authenticate
// app.get('/auth/github',
//   passport.authenticate('github'));

// app.get('/auth/github/callback',
//   passport.authenticate('github', { failureRedirect: '/' }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/api/v1/tours');
//   });

// //Google authenticate 

// // app.get('/auth/google',
// //   passport.authenticate('google', { scope: ['profile'] }));

// // app.get('/auth/google/callback',
// //   passport.authenticate('google', { failureRedirect: '/' }),
// //   function (req, res) {
// //     res.redirect('/api/v1/tours');
// //   });

// app.get('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) throw err;
//   })
//   res.send('Successfully logged out');
// })

// //Passport local strategy
// app.post('/login',
//   passport.authenticate('local', {
//     successRedirect: '/api/v1/tours',
//     failureRedirect: '/',
//     failureFlash: true
//   })
// );
// app.set('view engine', 'ejs');
// app.get("/", (req, res) => {
//   res.render("home")
// })
// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server`), 404);
// });
// app.use(globalErrorHandler);
// module.exports = app;

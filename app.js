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
app.use('/api', limiter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`), 404);
});
app.use(globalErrorHandler);
module.exports = app;

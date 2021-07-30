const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const { promisify } = require('util');

const AppError = require('../utils/appError');

const sendEmail = require('../utils/email');

const catchAsync = require('../utils/catchAsync');

const User = require('../models/userModels');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id); //payload and secret code
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined; // this is for new user creation
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: user,
    },
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    // role: req.body.role,
  });
  createSendToken(newUser, 201, res);
  console.log("Hello world");
});
exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password'), 400);
  }
  const user = await User.findOne({ email: email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  createSendToken(user, 200, res);
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in. PLease login to get access', 401)
    );
  }
  //We re checking user exist or not
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to the token does not exist', 401)
    );
  } // here we are checking if user changed the password after issuing token then from previous token no one else could login
  if (currentUser.changePasswordAfter(decoded.iat)) {
    //this function is created in usermodels
    return next(
      new AppError('User recently changed password please login again'),
      401
    );
  }
  req.user = currentUser;
  next();
});
exports.restrictTo =
  (...roles) =>
    //roles is an array example [admin,lead-guide]
    (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to do this action'),
          403
        );
      }
      next();
    };
exports.forgotPassword = catchAsync(async (req, res, next) => {
  //isme input me email dalenge
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('No user with that email address'), 404);
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new paassword and passwordConfrom to:${resetURL}.\n If you didn't forgot your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token(valid for 10 min)',
      message,
    });
    res.status(200).json({
      status: 'success',
      message: 'Token sent to mail',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'There was a problem in sending email. Please try again later'
      ),
      500
    );
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or expired'), 400);
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm; //now we are updating password updated at property as a middleware
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  createSendToken(user, 200, res);
});
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('password');
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong'), 401);
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createSendToken(user, 200, res);
});

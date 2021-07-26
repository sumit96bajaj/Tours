const User = require('../models/userModels');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

const catchAsync = require('../utils/catchAsync');
const { useFakeTimers } = require('sinon');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
// exports.getAllUsers = factory.getAll(User);
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    console.log(req.body, req.user);
    return next(new AppError('This route is not for password updates', 400));
  }
  const filteredBody = filterObj(req.body, 'name', 'email'); // Hum sab kuch update nhi kara sakte jaise role agar vo admin ban gaya to gadbad ho jayega
  const updatedUser = await User.findByIdAndUpdate(req.user, filteredBody, {
    new: true, // it will return that updated object
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
exports.deleteMe = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: 'null',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined please use route /signup',
  });
};
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.getUser = factory.getOne(User);
// Do not update passwords in this
exports.updateUser = factory.updateOne(User);
// exports.deleteUser = factory.deleteOne(User);
exports.deleteUser = async (req, res, next) => {
  const doc = await User.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError('No doc found with that id', 404));
  }
  res.status(200).json({
    data: doc
  });
};
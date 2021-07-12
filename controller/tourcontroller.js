const AppError = require('../utils/appError');

const Tour = require('../models/tourModels');

const factory = require('./handlerFactory');

const APIFeatures = require('../utils/apiFeatures');

const catchAsync = require('../utils/catchAsync');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};
exports.getAllTours = factory.getAll(Tour);

// exports.getAllTours = catchAsync(async (req, res, next) => {
//   const features = new APIFeatures(Tour.find(), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();
//   // console.log(features);
//   const tours = await features.query;
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// });
exports.getTour = factory.getOne(Tour, { path: 'reviews' });
// exports.getTour = catchAsync(async (req, res, next) => {
//   //we need to write populate in all query where there is find so we are creatinga middleware function
//   const tour = await Tour.findById(req.params.id).populate('reviews');
//   if (!tour) {
//     return next(new AppError('No tour found with that id', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// });

// exports.createTour = catchAsync(async (req, res, next) => {
//   const newTour = await Tour.create(req.body);
//   res.status(201).json({
//     status: 'success',
//     data: {
//       tour: newTour,
//     },
//   });
// });
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);
// exports.updateTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!tour) {
//     return next(new AppError('No tour found with that id', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// });
// exports.deleteTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndDelete(req.params.id);
//   if (!tour) {
//     return next(new AppError('No tour found with that id', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// });
exports.getTourStats = catchAsync(async (req, res) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: '$difficulty',
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 }, //avgprice wali property uparwali hi hai naki object wali hum ab jan bhi sorting karenge tov group ke andar ke elements ke hisab se karenge
    },
    // {
    //   $match: { _id: { $ne: 'easy' } },
    // },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
exports.getMonthlyPlan = catchAsync(async (req, res) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },

    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numTourStarts: -1 },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});
// exports.getToursWithin = catchAsync(async (req, res, next) => {
//   const { distance, latlng, unit } = req.params;
//   const [lat, lon] = latlng.split(',');
//   // We are checking ki unit miles me hai ya km me uske bas use radius of earth se divide mar rahe taki value radians me mile
//   const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
//   if (!lat || !lon) {
//     next(
//       new AppError(
//         'Please provide latitude and longitude in the format lat,lon.',
//         400
//       )
//     );
//   }
//   const tours = await Tour.find({
//     startLocation: { $geoWithin: { $centerSphere: [[lon, lat], radius] } },
//   });
//   console.log(distance, lat, lon, unit);
//   res.status(200).json({
//     status: 'Success',
//     results: tours.length,
//     data: {
//       data: tours,
//     },
//   });
// });
// exports.getDistances = catchAsync(async (req, res, next) => {
//   const { latlng, unit } = req.params;
//   const [lat, lng] = latlng.split(',');
//   const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
//   // We are checking ki unit miles me hai ya km me uske bas use radius of earth se divide mar rahe taki value radians me mile
//   if (!lat || !lng) {
//     next(
//       new AppError(
//         'Please provide latitude and longitude in the format lat,lon.',
//         400
//       )
//     );
//   }
//   const distances = await Tour.aggregate([
//     {
//       //Hamesha geonear hi pehla field hona chahiye aggregation me... Ek bar aggregation ke pre middleware bhi check krna
//       $geoNear: {
//         near: {
//           type: 'Point',
//           coordinates: [lng * 1, lat * 1],
//         },
//         distanceField: 'distance',
//         distanceMultiplier: multiplier,
//       },
//     },
//     {
//       $project: {
//         distance: 1,
//         name: 1,
//       },
//     },
//   ]);
//   res.status(200).json({
//     status: 'Success',
//     data: {
//       data: distances,
//     },
//   });
// });

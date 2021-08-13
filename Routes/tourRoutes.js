const express = require('express');

const reviewRouter = require('./reviewRoutes');

const authController = require('../controller/authController');

const tourController = require('../controller/tourcontroller');

const router = express.Router();

var passport = require("passport");

require("./../utils/passport")(passport);
// router.param('id', tourController.checkId);
router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/monthly-plan/:year')
  // .get(
  //   authController.protect,
  //   authController.restrictTo('admin', 'lead-guide', 'guide'),
  //   tourController.getMonthlyPlan
  // );
  .get(
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );
// passport.authenticate("jwt", { session: false }),
// authController.restrictTo('admin', 'lead-guide', 'guide'),
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );
// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );
module.exports = router;

const express = require('express');
const userController = require('../controller/usercontroller');
const authController = require('../controller/authController');
const reviewController = require('../controller/reviewcontroller');

const router = express.Router();
router.post('/signup', authController.signup);
router.post('/login', authController.signin);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//Ab iske bad sare routes protected routes hain isiliye hum isme ek middleware use kar rahe auuth.protect
router.use(authController.protect);
router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// Ab iske neeche ke sare routes admin hi handle karte isiliye hum authcontroller.protect(admin) use karenge as a middleware
router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

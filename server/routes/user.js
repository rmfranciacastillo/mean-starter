const router = require('express').Router();
const passport = require('passport');

const userController = require('../controllers/userController');

router.route('/')
  .post(userController.registerUser)
  .delete(passport.authenticate('jwt', { session: false }), userController.deleteUser);

router.route('/authenticate')
  .post(userController.loginUser);

router.route('/all')
  .get(userController.getAllUsers);

router.route('/forgot-password')
  .patch(userController.updateUserPassword);

router.route('/:id')
  .get(userController.getUser);

module.exports = router;

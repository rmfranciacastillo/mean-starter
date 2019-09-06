const router = require('express').Router();

const userController = require('../controllers/userController');

router.route('/')
  .post(userController.registerUser)
  .delete(userController.deleteUser);

router.route('/all')
  .get(userController.getAllUsers);

router.route('/forgot-password')
  .patch(userController.updateUserPassword);

router.route('/:id')
  .get(userController.getUser);

module.exports = router;

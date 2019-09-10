const router = require('express').Router();
const passport = require('passport');

const settingsController = require('../controllers/settingsController');

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), settingsController.getSettingsSetup)
  .post(passport.authenticate('jwt', { session: false }), settingsController.setupSettings)
  .patch(passport.authenticate('jwt', { session: false }), settingsController.updateSettings);

module.exports = router;

const router = require('express').Router();

const settingsController = require('../controllers/settingsController');

router.route('/')
  .get(settingsController.getSettingsSetup)
  .post(settingsController.setupSettings)
  .patch(settingsController.updateSettings);

module.exports = router;

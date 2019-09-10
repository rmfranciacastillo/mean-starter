const router = require('express').Router();
const passport = require('passport');

const storyController = require('../controllers/storyController');

router.route('/')
  .get(storyController.getAllStories)
  .post(passport.authenticate('jwt', { session: false }), storyController.postStory);

router.route('/:id')
  .get(storyController.getStory)
  .delete(passport.authenticate('jwt', { session: false }), storyController.deleteStory)
  .put(passport.authenticate('jwt', { session: false }), storyController.updateStory);

module.exports = router;

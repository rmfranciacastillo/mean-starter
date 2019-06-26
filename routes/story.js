const router = require('express').Router();
const storyController = require('../controllers/storyController');

router.route('/')
  .get(storyController.getAllStories)
  .post(storyController.postStory);

router.route('/:id')
  .get(storyController.getStory)
  .delete(storyController.deleteStory)
  .put(storyController.updateStory);

module.exports = router;

const { Story } = require('../models/Story');

const getAllStories = (req, res) => {
  Story.getAll()
    .then(stories => res.status(200).json({ success: true, msg: stories }))
    .catch(err => res.status(500).json({ success: false, err }));
};

const getStory = (req, res) => {
  const storyId = req.params.id;

  Story.getOneStory(storyId)
    .then(story => res.status(200).json({ success: true, msg: story }))
    .catch(err => res.status(500).json({ success: false, err }));
};

const postStory = (req, res) => {
  const story = new Story({
    author: req.body.author,
    title: req.body.title,
    text: req.body.text,
  });

  Story.createStory(story)
    .then(createdStory => res.status(200).json({ success: true, msg: createdStory }))
    .catch(err => res.status(500).json({ success: false, err }));
};

const deleteStory = (req, res) => {
  const storyId = req.params.id;

  Story.deleteStory(storyId)
    .then(() => res.status(200).json({ success: true, msg: 'Story is deleted' }))
    .catch(err => res.status(500).json({ success: true, err }));
};

const updateStory = (req, res) => {
  const storyId = req.params.id;
  const body = {
    author: req.body.author,
    title: req.body.title,
    text: req.body.text,
  };

  Story.updateStory(storyId, body)
    .then(story => res.status(200).json({ success: true, msg: story }))
    .catch(err => res.status(500).json({ success: false, err }));
};

module.exports = {
  getAllStories,
  postStory,
  getStory,
  deleteStory,
  updateStory,
};

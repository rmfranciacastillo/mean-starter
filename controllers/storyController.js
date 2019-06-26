const getAllStories = (req, res) => {
  res.send('GET all Stories');
};

const getStory = (req, res) => {
  res.send('GET single story');
};

const postStory = (req, res) => {
  res.send('POST story');
};

const deleteStory = (req, res) => {
  res.send('DELETE story');
};

const updateStory = (req, res) => {
  res.send('PUT story');
};

module.exports = {
  getAllStories,
  postStory,
  getStory,
  deleteStory,
  updateStory,
};

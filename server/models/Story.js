const { Schema, model } = require('mongoose');
const { ObjectID } = require('mongodb');

const StorySchema = Schema({
  author: { type: String, required: true },
  title: { type: String, required: true, minlength: 5 },
  text: { type: String },
  date_created: { type: Date, default: Date.now() },
});

/* eslint-disable func-names */
StorySchema.statics.createStory = function (story) {
  return story.save();
};

StorySchema.statics.getAll = function () {
  return this.find();
};

StorySchema.statics.getOneStory = function (id) {
  if (!ObjectID.isValid(id)) {
    return Promise.reject(new Error('ObjectID is not Valid!'));
  }
  return this.find({ _id: id });
};

StorySchema.statics.deleteStory = function (id) {
  if (!ObjectID.isValid(id)) {
    return Promise.reject(new Error('ObjectID is not Valid!'));
  }

  return this.findByIdAndRemove({ _id: id }, { useFindAndModify: false });
};

StorySchema.statics.updateStory = function (id, body) {
  if (!ObjectID.isValid(id)) {
    return Promise.reject(new Error('ObjectID is not Valid!'));
  }
  return this.findByIdAndUpdate(id, { $set: body }, { new: true, userFindAndModify: false });
};

const Story = model('Story', StorySchema);

module.exports = { Story };

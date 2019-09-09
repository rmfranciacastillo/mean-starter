const { model, Schema } = require('mongoose');
const { ObjectID } = require('mongodb');

const SettingsSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, default: '' },
});

SettingsSchema.statics.setupSettings = settings => settings.save();

SettingsSchema.statics.getSettings = function getSettings() {
  return this.find({});
};

SettingsSchema.statics.updateSettings = function updateSettings(id, body) {
  if (!ObjectID.isValid(id)) {
    return Promise.reject(new Error('ID not valid'));
  }
  return this.findByIdAndUpdate(id, { $set: body }, { new: true, useFindAndModify: false });
};

const Settings = model('Settings', SettingsSchema);

module.exports = { Settings };

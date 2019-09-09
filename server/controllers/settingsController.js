const { Settings } = require('../models/Settings');

const setupSettings = (req, res) => {
  const newSetup = new Settings({
    title: req.body.title,
    description: req.body.description,
  });

  Settings.setupSettings(newSetup)
    .then(settings => res.status(200).json({ success: true, settings }))
    .catch(err => res.status(500).json({ success: false, err }));
};

const getSettingsSetup = (req, res) => {
  Settings.getSettings()
    .then(settings => res.status(200).json({ success: true, settings }))
    .catch(err => res.status(404).json({ success: false, err }));
};

const updateSettings = (req, res) => {
  const { id } = req.body;
  const body = {
    title: req.body.title,
    description: req.body.description,
  };

  Settings.updateSettings(id, body)
    .then(settings => res.status(200).json({ success: true, settings }))
    .catch(err => res.status(500).json({ success: false, err }));
};

module.exports = {
  setupSettings,
  updateSettings,
  getSettingsSetup,
};

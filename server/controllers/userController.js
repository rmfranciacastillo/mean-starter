// TODO finish all USer Controllers
// TODO Test user controller
// const { ObjectID } = require('mongodb');

const { User } = require('../models/User');

const getAllUsers = (req, res) => {
  User.getAllUsers()
    .then(users => res.status(200).json({ success: true, users }))
    .catch(err => res.status(500).json({ success: false, err }));
};

module.exports = {
  getAllUsers,
};

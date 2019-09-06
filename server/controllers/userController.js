const { ObjectID } = require('mongodb');

const { User } = require('../models/User');

const getAllUsers = (req, res) => {
  User.getAllUsers()
    .then(users => res.status(200).json({ success: true, users }))
    .catch(err => res.status(500).json({ success: false, err }));
};

const getUser = (req, res) => {
  const userId = req.params.id;

  if (!ObjectID.isValid(userId)) {
    res.status(404).json({ success: false, msg: 'ID is not valid' });
  } else {
    User.getUserById(userId)
      .then((user) => {
        let statusCode = 200;
        let response = { success: true, user };

        if (user.length === 0) {
          statusCode = 404;
          response = { success: false, msg: 'User not found' };
        }
        res.status(statusCode).json(response);
      })
      .catch(err => res.status(404).json({ success: false, err }));
  }
};

// TODO finish all USer Controllers
// TODO Test user controller
const registerUser = (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // TODO check if user already exist
  User.createNewUser(user)
    .then(newUser => res.status(200).json({ success: true, user: newUser }))
    .catch(err => res.status(500).json({ success: false, err }));
};

const deleteUser = (req, res) => {
  const userId = req.body.id;

  if (!ObjectID.isValid(userId)) {
    res.status(404).json({ success: false, msg: 'ID is not valids' });
  } else {
    User.deleteUserById(userId)
      .then((user) => {
        let statusCode = 200;
        let response = { success: true, msg: user };

        if (user === null) {
          statusCode = 404;
          response = { success: false, msg: '' };
        }
        res.status(statusCode).json(response);
      })
      .catch(err => res.status(500).json({ success: false, err }));
  }
};

/* eslint-disable no-param-reassign */
const updateUserPassword = (req, res) => {
  const userId = req.body.id;
  const newPassword = req.body.password;

  User.getUserById(userId)
    .then((user) => {
      user.password = newPassword;
      return user.save();
    })
    .then(updatedUser => res.status(200).json({ success: true, user: updatedUser }))
    .catch(err => res.status(500).json({ success: false, err }));
};

module.exports = {
  getAllUsers,
  getUser,
  registerUser,
  deleteUser,
  updateUserPassword,
};

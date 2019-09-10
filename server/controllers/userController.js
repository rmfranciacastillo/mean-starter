const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

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

const registerUser = (req, res) => {
  const user = new User({
    username: req.body.username,
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

const loginUser = (req, res) => {
  const { username, password } = req.body;
  let user;

  User.getUserByUsername(username)
    .then((foundUser) => {
      if (foundUser) {
        user = foundUser;
        return user.comparePasswords(password);
      }
      return res.status(404).json({ success: false, msg: 'User not found!' });
    })
    .then((isMatch) => {
      if (isMatch) {
        const token = jwt.sign(user.toObject(), process.env.SECRET, { expiresIn: 604800 });
        return res.status(200).json({
          success: true,
          token: `Bearer ${token}`,
          user: {
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      }

      return res.status(403).json({ success: false, msg: 'Wrong Password' });
    })
    .catch(err => res.status(500).json({ success: false, err }));
};

module.exports = {
  getAllUsers,
  getUser,
  registerUser,
  deleteUser,
  updateUserPassword,
  loginUser,
};

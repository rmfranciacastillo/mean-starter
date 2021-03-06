/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');

const { ObjectID } = require('mongodb');
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
});

// User middleware
UserSchema.pre('save', function addPasswordHash(next) {
  if (!this.isModified('password')) { return next(); }

  bcrypt.genSalt(10, (genSaltErr, salt) => {
    if (genSaltErr) { return next(genSaltErr); }

    bcrypt.hash(this.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      this.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePasswords = function comparePasswords(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.statics.getAllUsers = function getAllUsers() {
  return this.find();
};

// CRUD
UserSchema.statics.createNewUser = user => user.save();

UserSchema.statics.getUserById = function getUserById(id) {
  if (!ObjectID.isValid(id)) {
    return Promise.reject(new Error('ObjectID is not valid'));
  }
  return this.findOne({ _id: id });
};

UserSchema.statics.getUserByUsername = function getUserByUsername(username) {
  return this.findOne({ username });
};

UserSchema.statics.deleteUserById = function deleteUserById(id) {
  if (!ObjectID.isValid(id)) {
    return Promise.reject(new Error('ObjectID is not valid'));
  }
  return this.findOneAndRemove({ _id: id }, { useFindAndModify: false });
};

UserSchema.statics.updateUser = function updateUser(id, body) {
  if (!ObjectID.isValid(id)) {
    return Promise.reject(new Error('ObjectID is not valid'));
  }

  return this.findByIdAndUpdate(id, { $set: body }, { new: true, useFindAndModify: false });
};

const User = model('User', UserSchema);

module.exports = {
  User,
};

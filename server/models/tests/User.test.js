const { expect } = require('chai');
const { ObjectID } = require('mongodb');

const { User } = require('../User');

const users = [{
  _id: new ObjectID(),
  name: 'Renato',
  email: 'user@gmail.com',
  password: 'user12345',
}, {
  _id: new ObjectID(),
  name: 'Nacho',
  email: 'nacho@gmail.com',
  password: 'nacho12345',
}];

beforeEach((done) => {
  User.deleteMany({})
    .then(() => User.create(users))
    .then(() => done());
});

describe('User Testing', () => {
  it('should get all users', () => {
    return User.getAllUsers().should.eventually.have.length(2);
  });
});

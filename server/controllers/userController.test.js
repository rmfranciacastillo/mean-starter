/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const { ObjectID } = require('mongodb');
const { expect } = require('chai');

const { app } = require('../server');
const { User } = require('../models/User');

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

describe('User Controller Tests', () => {
  describe('GET /api/user/all', () => {
    it('should get all users', (done) => {
      request(app)
        .get('/api/users/all')
        .expect(200)
        .expect((res) => {
          expect(res.body.users.length).equal(2);
        })
        .end(done);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user', (done) => {
      request(app)
        .get(`/api/users/${users[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.user.name).equal(users[0].name);
          expect(res.body.user.email).equal(users[0].email);
        })
        .end(done);
    });

    it('should return 404 if user not found', (done) => {
      const hexId = new ObjectID().toHexString();

      request(app)
        .get(`/api/users/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non-object Ids', (done) => {
      request(app)
        .get('/api/users/abc12345')
        .expect(404)
        .end(done);
    });
  });

  describe('POST /api/user', () => {
    it('should create a user', (done) => {
      const user = new User({
        name: 'Nachoman',
        email: 'nachoman@gmail.com',
        password: 'nachoman12345',
      });

      request(app)
        .post('/api/users')
        .send(user)
        .expect(200)
        .expect((res) => {
          expect(res.body.user.name).equal(user.name);
          expect(res.body.user.email).equal(user.email);
        })
        .end((err, res) => {
          if (err) { return done(err); }

          const userId = res.body.user._id;

          return User.getUserById(userId)
            .then((foundUser) => {
              expect(foundUser.name).equal(user.name);
              expect(foundUser.email).equal(user.email);
              done();
            })
            .catch((e) => { done(e); });
        });
    });

    it('should not create a user with invalid data', (done) => {
      request(app)
        .post('/api/users')
        .send({})
        .expect(500)
        .end((err) => {
          if (err) { return done(err); }

          return User.find()
            .then((foundUsers) => {
              expect(foundUsers.length).equal(2);
              done();
            })
            .catch(error => done(error));
        });
    });
  });

  describe('DELETE /api/users', () => {
    it('should remove a todo', (done) => {
      const userId = users[0]._id.toHexString();

      request(app)
        .delete('/api/users')
        .send({ id: userId })
        .expect(200)
        .expect((res) => {
          expect(res.body.success).equal(true);
          expect(res.body.msg).to.have.property('name');
          expect(res.body.msg).to.have.property('password');
          expect(res.body.msg).to.have.property('email');
        })
        .end((err) => {
          if (err) { done(err); }

          User.getAllUsers()
            .then((usersRetrieved) => {
              expect(usersRetrieved.length).to.equal(1);
              done();
            });
        });
    });
  });

  describe('PATCH /api/users/forgot-password', () => {
    it('should update a password', (done) => {
      const requestBody = { id: users[0]._id, password: 'newpassword' };

      request(app)
        .patch('/api/users/forgot-password')
        .send(requestBody)
        .expect(200)
        .expect(() => {
          User.getUserById(requestBody.id)
            .then((user) => {
              user.comparePasswords(requestBody.password, (err, isMatch) => {
                expect(isMatch).to.equal(true);
              });
            });
        })
        .end(done);
    });

    it('should return a 500 Error', (done) => {
      request(app)
        .patch('/api/users/forgot-password')
        .send({})
        .expect(500, done);
    });
  });
});

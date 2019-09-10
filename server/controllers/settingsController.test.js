/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const { expect } = require('chai');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Settings } = require('../models/Settings');
const { User } = require('../models/User');

const settings = [{
  _id: new ObjectID(),
  title: 'MEAN starter',
  description: 'A simple App',
}];

const users = [{
  _id: new ObjectID(),
  username: 'renato',
  name: 'Renato',
  email: 'user@gmail.com',
  password: 'user12345',
}];

beforeEach((done) => {
  Settings.deleteMany({})
    .then(() => Settings.insertMany(settings))
    .then(() => User.deleteMany({}))
    .then(() => User.create(users))
    .then(() => done());
});

describe('Settings API test', () => {
  describe('GET /api/settings', () => {
    let authToken;
    before((done) => {
      request(app)
        .post('/api/users/authenticate')
        .send({
          username: users[0].username,
          password: users[0].password,
        })
        .end((err, res) => {
          if (err) { done(err); }
          authToken = res.body.token;
          done();
        });
    });

    it('should return settings', (done) => {
      request(app)
        .get('/api/settings')
        .set('Authorization', authToken)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).to.equal(true);
        })
        .end(done);
    });
  });

  describe('POST /api/settings', () => {
    let authToken;
    beforeEach((done) => {
      request(app)
        .post('/api/users/authenticate')
        .send({
          username: users[0].username,
          password: users[0].password,
        })
        .end((err, res) => {
          if (err) { done(err); }
          authToken = res.body.token;
          done();
        });
    });

    it('should return 2 settings', (done) => {
      const newSetting = new Settings({
        title: 'Other Title',
        description: 'Another simple setting',
      });

      request(app)
        .post('/api/settings')
        .send(newSetting)
        .set('Authorization', authToken)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.settings.title).to.equal(newSetting.title);
          expect(res.body.settings.description).to.equal(newSetting.description);
        })
        .end((err) => {
          if (err) { return done(err); }

          return Settings.getSettings()
            .then((foundSettings) => {
              expect(foundSettings.length).to.equal(2);
              done();
            })
            .catch((e) => { done(e); });
        });
    });

    it('should return a 500 status', (done) => {
      request(app)
        .post('/api/settings')
        .send({})
        .set('Authorization', authToken)
        .expect(500, done);
    });
  });

  describe('PATCH /api/settings', () => {
    let authToken;
    beforeEach((done) => {
      request(app)
        .post('/api/users/authenticate')
        .send({
          username: users[0].username,
          password: users[0].password,
        })
        .end((err, res) => {
          if (err) { done(err); }
          authToken = res.body.token;
          done();
        });
    });

    it('should return updated settings', (done) => {
      const settingsID = settings[0]._id;
      const title = 'New Title';
      const description = 'New description';

      request(app)
        .patch('/api/settings')
        .send({ id: settingsID, title, description })
        .set('Authorization', authToken)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.settings.title).to.equal(title);
          expect(res.body.settings.description).to.equal(description);
        })
        .end(done);
    });

    it('should return 500 status', (done) => {
      request(app)
        .patch('/api/settings')
        .send({})
        .set('Authorization', authToken)
        .expect(500, done);
    });
  });
});

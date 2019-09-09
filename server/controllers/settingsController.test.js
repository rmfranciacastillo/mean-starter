/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const { expect } = require('chai');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Settings } = require('../models/Settings');

const settings = [{
  _id: new ObjectID(),
  title: 'MEAN starter',
  description: 'A simple App',
}];

beforeEach((done) => {
  Settings.deleteMany({})
    .then(() => Settings.insertMany(settings))
    .then(() => done());
});

describe('Settings API test', () => {
  describe('GET /api/settings', () => {
    it('should return settings', (done) => {
      request(app)
        .get('/api/settings')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).to.equal(true);
        })
        .end(done);
    });
  });

  describe('POST /api/settings', () => {
    it('should return 2 settings', (done) => {
      const newSetting = new Settings({
        title: 'Other Title',
        description: 'Another simple setting',
      });

      request(app)
        .post('/api/settings')
        .send(newSetting)
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
        .expect(500, done);
    });
  });

  describe('PATCH /api/settings', () => {
    it('should return updated settings', (done) => {
      const settingsID = settings[0]._id;
      const title = 'New Title';
      const description = 'New description';

      request(app)
        .patch('/api/settings')
        .send({ id: settingsID, title, description })
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
        .expect(500, done);
    });
  });
});

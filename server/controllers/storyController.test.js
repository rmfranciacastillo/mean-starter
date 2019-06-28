/* eslint-disable no-underscore-dangle */

const { expect } = require('chai');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Story } = require('../models/Story');

const stories = [{
  _id: new ObjectID(),
  author: 'Renato Francia',
  title: 'Sample title 1',
  text: 'Sample text',
}, {
  _id: new ObjectID(),
  author: 'NachoCode',
  title: 'Sample title 2',
  text: 'Other Sample text',
}];

beforeEach((done) => {
  Story.deleteMany({})
    .then(() => Story.insertMany(stories))
    .then(() => done());
});

describe('GET /stories', () => {
  it('should get all stories', (done) => {
    request(app)
      .get('/stories')
      .expect(200)
      .expect((res) => {
        expect(res.body.msg.length).equal(2);
      })
      .end(done);
  });
});

describe('POST /stories', () => {
  it('should create a story', (done) => {
    const story = new Story({
      author: 'Renato Francia',
      title: 'Story Posted',
      text: 'Story Sample text',
    });

    request(app)
      .post('/stories')
      .send(story)
      .expect(200)
      .expect((res) => {
        expect(res.body.msg.title).equal('Story Posted');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        const storyId = res.body.msg._id;

        return Story.getOneStory(storyId)
          .then((foundStories) => {
            expect(foundStories.length).equal(1);
            expect(foundStories[0].title).equal('Story Posted');
            expect(foundStories[0].author).equal('Renato Francia');
            expect(foundStories[0].text).equal('Story Sample text');
            done();
          })
          .catch((e) => { done(e); });
      });
  });

  it('should not create a story with invalid data', (done) => {
    request(app)
      .post('/stories')
      .send({})
      .expect(500)
      .end((err) => {
        if (err) {
          return done(err);
        }

        return Story.find()
          .then((foundStories) => {
            expect(foundStories.length).equal(2);
            done();
          })
          .catch(error => done(error));
      });
  });
});

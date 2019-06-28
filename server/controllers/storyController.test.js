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
        expect(res.body.msg.author).equal(story.author);
        expect(res.body.msg.title).equal(story.title);
        expect(res.body.msg.text).equal(story.text);
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

describe('GET /stories/:id', () => {
  it('should return story', (done) => {
    request(app)
      .get(`/stories/${stories[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.msg[0].title).equal(stories[0].title);
        expect(res.body.msg[0].author).equal(stories[0].author);
        expect(res.body.msg[0].text).equal(stories[0].text);
      })
      .end(done);
  });

  it('should return 404 if story not found', (done) => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .get(`/stories/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/stories/abc1234')
      .expect(404)
      .end(done);
  });
});

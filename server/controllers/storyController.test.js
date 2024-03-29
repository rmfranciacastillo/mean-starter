/* eslint-disable no-underscore-dangle */
const { expect } = require('chai');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Story } = require('../models/Story');
const { User } = require('../models/User');

const users = [{
  _id: new ObjectID(),
  username: 'renato',
  name: 'Renato',
  email: 'user@gmail.com',
  password: 'user12345',
}];

const stories = [{
  _id: new ObjectID(),
  author: users[0].username,
  title: 'Sample title 1',
  text: 'Sample text',
}, {
  _id: new ObjectID(),
  author: users[0].username,
  title: 'Sample title 2',
  text: 'Other Sample text',
}];

beforeEach((done) => {
  Story.deleteMany({})
    .then(() => Story.insertMany(stories))
    .then(() => User.deleteMany({}))
    .then(() => User.create(users))
    .then(() => done());
});

describe('Story Controller Tests', () => {
  describe('GET /api/stories', () => {
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

    it('should get all stories', (done) => {
      request(app)
        .get('/api/stories')
        .set('Authorization', authToken)
        .expect(200)
        .expect((res) => {
          expect(res.body.msg.length).equal(2);
        })
        .end(done);
    });
  });

  describe('POST /api/stories', () => {
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

    it('should create a story', (done) => {
      const story = new Story({
        author: 'Renato Francia',
        title: 'Story Posted',
        text: 'Story Sample text',
      });

      request(app)
        .post('/api/stories')
        .send(story)
        .set('Authorization', authToken)
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
        .post('/api/stories')
        .send({})
        .set('Authorization', authToken)
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

  describe('GET /api/stories/:id', () => {
    it('should return story', (done) => {
      request(app)
        .get(`/api/stories/${stories[0]._id.toHexString()}`)
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
        .get(`/api/stories/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
      request(app)
        .get('/api/stories/abc1234')
        .expect(404, done);
    });
  });

  describe('DELETE /api/stories/:id', () => {
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

    it('should remove a todo', (done) => {
      const hexId = stories[0]._id.toHexString();

      request(app)
        .delete(`/api/stories/${hexId}`)
        .set('Authorization', authToken)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).equal(true);
          expect(res.body.msg).to.have.property('author');
          expect(res.body.msg).to.have.property('title');
          expect(res.body.msg).to.have.property('text');
        })
        .end((err) => {
          if (err) {
            done(err);
          }

          Story.getAll()
            .then((storiesRetrieved) => {
              expect(storiesRetrieved.length).to.equal(1);
              done();
            });
        });
    });

    it('should return 404 if story not found', (done) => {
      const hexId = new ObjectID().toHexString();

      request(app)
        .delete(`/api/stories/${hexId}`)
        .set('Authorization', authToken)
        .expect(404)
        .end(done);
    });

    it('should return 404 is story is not valid', (done) => {
      request(app)
        .delete('/api/stories/123abc')
        .set('Authorization', authToken)
        .expect(404)
        .end(done);
    });
  });

  describe('PUT /api/stories/:id', () => {
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

    it('should return updated story', (done) => {
      const hexId = stories[0]._id.toHexString();
      const body = {
        author: 'New Author',
        title: 'Updated title',
        text: 'Updated text',
      };

      request(app)
        .put(`/api/stories/${hexId}`)
        .send(body)
        .set('Authorization', authToken)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).to.equal(true);
          expect(res.body.msg.author).to.equal(body.author);
          expect(res.body.msg.title).to.equal(body.title);
          expect(res.body.msg.text).to.equal(body.text);
        })
        .end(done);
    });
  });
});

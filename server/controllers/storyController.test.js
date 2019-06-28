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

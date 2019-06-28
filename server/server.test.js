/* eslint-disable no-unused-vars */
const { expect } = require('chai');
const request = require('supertest');

const { app } = require('./server');

describe('GET request to server', () => {
  it('Should return 200 OK', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

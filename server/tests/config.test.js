const { expect } = require('chai');

const { selectEnvironment } = require('../config/config');

describe('CONFIG test', () => {
  it('should return test', () => {
    expect(selectEnvironment('test')).to.equal('test');
  });

  it('should return development', () => {
    expect(selectEnvironment('development')).to.equal('development');
  });

  it('should return development', () => {
    expect(selectEnvironment('production')).to.equal('production');
  });
});

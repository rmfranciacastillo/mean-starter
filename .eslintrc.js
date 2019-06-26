/* eslint-disable */
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['mocha'],
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'mocha/no-exclusive-tests': 'error'
  },
};

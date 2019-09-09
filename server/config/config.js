const environment = process.env.NODE_ENV;

/* eslint-disable global-require */
const selectEnvironment = (env) => {
  if (env === 'development') {
    require('dotenv').config({ path: '.env.development' });
  } else if (env === 'test') {
    require('dotenv').config({ path: '.env.test' });
  } else {
    require('dotenv').config({ path: '.env' });
  }
  return env;
};

selectEnvironment(environment);

module.exports = {
  selectEnvironment,
};

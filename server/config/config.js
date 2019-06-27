const env = process.env.NODE_ENV;

/* eslint-disable global-require */
if (env === 'development') {
  require('dotenv').config({ path: '.env.development' });
} else if (env === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else {
  require('dotenv').config({ path: '.env' });
}

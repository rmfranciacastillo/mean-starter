/**
 *  Module dependencies
 */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const chalk = require('chalk');
const expressStatusMonitor = require('express-status-monitor');

/**
 *  Load environmental variables from .env file
 */
require('./config/config');

/**
 * Database config
 */
const { mongoose } = require('./config/db');

/**
 * Create Express Server
 */
const app = express();

/**
 * Middleware Configuration
 */

// Express Configuration
app.set('host', '0.0.0.0');
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger Middleware
app.use(logger('dev'));

// Monitor status Middleware
app.use(expressStatusMonitor());

// Routes
const storyRoute = require('./routes/story');

app.use('/stories', storyRoute);

// Static Files
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/webfonts', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'), { maxAge: 31557600000 }));

// Start Express Server
app.listen(app.get('port'), () => {
  /* eslint-disable no-console */
  console.log('%s Running server on port: %s', chalk.green('✓'), app.get('port'));
  console.log('  Press CTRL-C to stop\n');
  /* eslint-enable no-console */
});

module.exports = {
  app,
  mongoose,
};

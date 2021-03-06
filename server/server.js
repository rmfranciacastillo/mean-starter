/**
 *  Module dependencies
 */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const chalk = require('chalk');
const expressStatusMonitor = require('express-status-monitor');
const cors = require('cors');
const passport = require('passport');

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
app.set('port', process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// CORS middleware
app.use(cors());

// Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger Middleware
app.use(logger('dev'));

// Monitor status Middleware
app.use(expressStatusMonitor());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Routes
const storyRoute = require('./routes/story');
const userRoute = require('./routes/user');
const settingsRoute = require('./routes/settings');

app.use('/api/stories', storyRoute);
app.use('/api/users', userRoute);
app.use('/api/settings', settingsRoute);

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

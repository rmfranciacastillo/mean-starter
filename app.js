/**
 *  Module dependencies
 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const dotenv = require('dotenv');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');

/**
 *  Load environmental variables from .env file
 */
dotenv.config({ path: '.env' });

/**
 * Load Controller
 */
const homeController = require('./controllers/home');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Logger Middleware
app.use(logger('dev'));

// Monitor status Middleware
app.use(expressStatusMonitor());

// SASS Middleware
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
}));

// Static files
app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/chart.js/dist'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/jquery/dist'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd'), { maxAge: 31557600000 }));
app.use('/webfonts', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'), { maxAge: 31557600000 }));

// Loading Homepage
app.use('/', homeController.index);

// Start Express Server
app.listen(app.get('port'), () => {
  console.log('%s Running server on port: %s', chalk.green('✓'), app.get('port'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;

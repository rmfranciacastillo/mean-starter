const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');

const app = express();
const PORT = 5000 || process.env.PORT;

// Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Logger Middleware
app.use(logger('dev'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start Express Server
app.listen(PORT, () => {
  console.log(`%s Running server on port: ${PORT}`, chalk.green('✓'));
  console.log('  Press CTRL-C to stop\n');
});

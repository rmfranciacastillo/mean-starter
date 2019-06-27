const mongoose = require('mongoose');
const chalk = require('chalk');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

/* eslint-disable no-console */
mongoose.connection.on('connected', () => {
  console.log(`DB: Connected to ${chalk.green(process.env.MONGODB_URI)}`);
});

mongoose.connection.on('error', () => {
  console.log(`DB: Fail to connect to ${chalk.red(process.env.MONGODB_URI)}`);
});
/* eslint-enable no-console */

module.exports = {
  mongoose,
};

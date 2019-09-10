/* eslint-disable no-underscore-dangle */
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { User } = require('../models/User');

module.exports = function passportJwtUser(passport) {
  const opts = {};

  // passport-jwt options
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET;

  // passport Use
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    console.log(jwtPayload);

    User.getUserById(jwtPayload._id)
      .then(user => done(null, user))
      .catch((err) => { done(err); });
  }));
};

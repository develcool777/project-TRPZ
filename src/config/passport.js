const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
// const User = require('../models/User');

const Client = require('../models/Client');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ login: 'login' }, (login, password, done) => {
      // Match user
      Client.findOne({
        login: login
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Client.findByPk(id, function(err, user) {
      done(err, user);
    });
  });
};

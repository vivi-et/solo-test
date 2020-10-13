const User = require('../models/user');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      Users.findOne({ where: { username } })
        .then((users) => {
          if (!users) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!users.password === password) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, users);
        })
        .catch((err) => done(err));
    },
  ));

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });
};

const User = require('../models/User');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.use(new LocalStrategy(
    (username, password, done) => {
      User.findOne({ where: { username } })
        .then((users) => {
          if (!users) {
            return done(null, false, { message: 'Incorrect username.' });
          }

          bcrypt.compare(password, users.password, (_err, result) => {
            if (_err) throw _err;
            if (result === true) {
              return done(null, users);
            }
            return done(null, false);
          });

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

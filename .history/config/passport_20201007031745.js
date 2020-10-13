const User = require('../models/user');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (_err, result) => {
          if (_err) throw _err;
          if (result === true) {
            return done(null, user);
          }
          return done(null, false);
        });
      });
    }),
  );

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
passport.use(new LocalStrategy(
  (username, password, done) => {
    Users.findOne({ where: { username } })
      .then((users) => {
        if (!users) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        bcrypt.compare(password, user.password, (_err, result) => {
          if (_err) throw _err;
          if (result === true) {
            return done(null, user);
          }
          return done(null, false);
        });

        if (!users.password === password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, users);
      })
      .catch((err) => done(err));
  },
));

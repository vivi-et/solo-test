const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

async function FindUserById(id) {
  if (!id) throw new Error('Invalid argument: user_id');
  const result = await User.findOne({ where: { id } });

  if (result) return result;
  return false;
}
async function FindUserByUsername(username) {
  if (!username) throw new Error('Invalid argument: user_id');
  const result = await User.findOne({ where: { username } });

  if (result) return result;
  return false;
}

passport.use(new LocalStrategy(
  (username, password, done) => {
    FindUserByUsername(username)
      .then((user) => {
        bcrypt.compare(password, user.password)
          .then((match) => {
            if (match) { return done(null, user); }
            return done(null, false);
          });
      }).catch((err) => done(err));
  },
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  FindUserById(id).then((user) => done(err, user));
});

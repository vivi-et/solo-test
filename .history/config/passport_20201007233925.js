const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy(
  (username, password, done) => {

  },
));

async function FindUserbyId(uid) {
  if (!uid) throw new Error('Invalid argument: user_id');
  const user = await User.findOne({ where: { id: uid } });

  if (user) return user;
  return false;
}

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy(
  (username, password, done) => {
    const user = FindUserbyUsername(username);
  },
));

async function FindUserbyId(id) {
  if (!id) throw new Error('Invalid argument: user_id');
  const result = await User.findOne({ where: { id } });

  if (result) return result;
  return false;
}
async function FindUserbyUsername(username) {
  if (!username) throw new Error('Invalid argument: user_id');
  const result = await User.findOne({ where: { username } });

  if (result) return result;
  return false;
}

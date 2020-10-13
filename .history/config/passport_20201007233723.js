const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy(
  (username, password, done) => {

  },
));

async function FindUserbyId(uid) {

}

const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const auth = require('../config/auth');

const router = express.Router();
const User = require('../models/User');

router.use(express.urlencoded({ extended: false }));
router.get('/login', auth.checkNotAuthenticated, (req, res) => {
  res.render('login.hbs');
});

app.get('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.redirect(`/users/${user.username}`);
    });
  })(req, res, next);
});
// router.post(
//   '/login',
//   auth.checkNotAuthenticated,
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/auth/login',
//   }),
// );

router.get('/register', auth.checkNotAuthenticated, (req, res) => {
  res.render('register.hbs');
});

router.post('/register', auth.checkNotAuthenticated, async (req, res) => {
  console.log(req.body);
  console.log(req.body);
  console.log(req.body);
  console.log(req.body);
  const { username, email, password } = req.body;

  const errors = [];

  if (!username) {
    errors.push({ text: 'Please add username' });
  }
  if (!email) {
    errors.push({ text: 'Please add email' });
  }

  if (errors > 0) {
    res.render('login.hbs', { errors });
  }

  // const find = await User.findOne({
  //   where: {
  //     [Op.or]: [{ username }, { email }],
  //   },
  // });
  const findEmail = await User.findOne({
    where: {
      email,
    },
  });
  if (findEmail) {
    errors.push({ text: 'EMAIL ALREADY EXISTS!' });
    return res.render('login.hbs', { errors });
  }

  const findUser = await User.findOne({
    where: {
      username,
    },
  });
  if (findUser) {
    errors.push({ text: 'USERNAME ALREADY EXISTS!' });
    return res.render('login.hbs', { errors });
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.redirect('/auth/login');
  } catch {
    res.redirect('/auth/register');
  }
});

router.delete('/auth/logout', (req, res) => {
  req.logOut();
  res.redirect('/auth/login');
});

module.exports = router;

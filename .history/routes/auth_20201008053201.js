// =============================== /AUTH ROUTES ==============================
// =============================== /AUTH ROUTES ==============================
// =============================== /AUTH ROUTES ==============================

const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const auth = require('../config/auth');
const User = require('../models/User');

const router = express.Router();

router.use(express.urlencoded({ extended: false }));

// router.post('/page/login',
//   passport.authenticate('local', { failureRedirect: '/page/login' }),
//   (req, res) => {
//     res.redirect('/');
//   });

// router.get('/page/login', (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/page/login'); }
//     req.page/login(user, (err) => {
//       if (err) { return next(err); }
//       return res.redirect(`/users/${user.username}`);
//     });
//   })(req, res, next);

// });

router.post('/', passport.authenticate('local'), (req, res) => {
  res.render('index.hbs', { title: req.user.username });
});

router.get('/page/login', auth.checkNotAuthenticated, (req, res) => {
  res.render('page/login.hbs');
});

router.post('/page/login', passport.authenticate('local'), (req, res) => {
  res.locals.loggedIn = true;
  res.locals.username = req.user.username;
  res.redirect('/');
  // res.send(req.user);
});

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
    res.render('page/login.hbs', { errors });
  }

  // const find = await User.findOne({
  //   where: {
  //     [Op.or]: [{ username }, { email }],
  //   },
  // });

  const findEmail = await User.findOne({ where: { username } });
  if (findEmail) {
    errors.push({ text: 'EMAIL ALREADY EXISTS!' });
    return res.render('page/login.hbs', { errors });
  }

  const findUser = await User.findOne({ where: { username } });
  if (findUser) {
    errors.push({ text: 'USERNAME ALREADY EXISTS!' });
    return res.render('page/login.hbs', { errors });
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.redirect('/auth/page/login');
  } catch (error) {
    errors.push({ text: error });
    console.log(error);
    return res.redirect('/auth/register', { errors });
  }

  return res.send('NO WHERE');
});

router.get('/logout', (req, res) => {
  req.logout();
  return res.redirect('/auth/page/login');
});

module.exports = router;

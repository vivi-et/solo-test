if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');

const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const fs = require('fs');
const initializePassport = require('./passport-config');
const auth = require('./config/auth');
const db = require('./config/db');
const User = require('./models/User');

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id),
);

const dir = './uploads';
// INIT DIRECTORY
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get('/', auth.checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name });
});

app.get('/login', auth.checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
});

app.post(
  '/login',
  auth.checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }),
);

app.get('/register', auth.checkNotAuthenticated, (req, res) => {
  res.render('register.ejs');
});

app.post('/register', auth.checkNotAuthenticated, async (req, res) => {
  const { username, email, password } = req.body;

  const errors = [];

  if (!username) {
    errors.push({ text: 'Please add username' });
  }
  if (!email) {
    errors.push({ text: 'Please add email' });
  }

  if (errors > 0) {
    res.send(errors);
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
    console.log(findEmail);
    return res.send(`That email exitsts!${findEmail}`);
  }

  const findUser = await User.findOne({
    where: {
      username,
    },
  });
  if (findUser) {
    console.log(findUser);
    return res.send(`that email exitsts!${findUser}`);
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.redirect('/login');
  } catch {
    res.redirect('/register');
  }
});

app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

app.set('port', 5000);

app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));

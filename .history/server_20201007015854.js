if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// =============================== DEPENDENCY ===============================
const express = require('express');

const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const fs = require('fs');

// =============================== MODEL ===============================
const auth = require('./config/auth');
const db = require('./config/db');
const User = require('./models/User');

// =============================== IMPORTS ===============================
const initializePassport = require('./passport-config');

// =============================== PASSPORTS ===============================
initializePassport(
  passport,
  (email) => User.find((user) => user.email === email),
  (id) => User.find((user) => user.id === id),
);

const dir = './uploads';
// INIT DIRECTORY
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// =============================== VIEW ENGINE ===============================
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

// =============================== ROUTER ===============================
app.get('/', auth.checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name });
});

app.use('/auth', require('./routes/auth'));

// =============================== END ROUTER ===============================

app.set('port', 5000);

app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));

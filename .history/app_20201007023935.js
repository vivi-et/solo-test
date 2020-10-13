// FOLLOWING ESLINT - AIRBNB STYLE FORMAT

// =============================== SET ENV NODE ===============================
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// =============================== DEPENDENCY ===============================
const express = require('express');

const app = express();
const exphbs = require('express-handlebars');
const bcrypt = require('bcrypt');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const fs = require('fs');
const initializePassport = require('./passport-config');

// =============================== MODEL ===============================
const auth = require('./config/auth');
const db = require('./config/db');
const User = require('./models/User');

// =============================== ROUTES ===============================
app.get('/', auth.checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name });
});

app.use('/auth', require('./routes/auth'));

// =============================== DIRECTORY INIT ===============================
const dir = './uploads';
// INIT DIRECTORY
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// =============================== MIDDLEWARE & VIEW ENGINE ===============================
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
initializePassport(
  passport,
  (async email)  => await User.findOne({ attributes: ['email'] }, { where: email }),
  (id) => await User.findOne({ attributes: ['id'] }, { where: id }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// =============================== ROUTES ===============================
app.get('/', auth.checkAuthenticated, (req, res) => {
  res.render('index.hbs', { name: req.user.name });
});

app.use('/auth', require('./routes/auth'));

// =============================== PORT & SERVER ===============================

app.set('port', 5000);

app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));

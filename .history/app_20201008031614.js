// FOLLOWING ESLINT - AIRBNB STYLE FORMAT

// =============================== SET ENV NODE ===============================
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// =============================== DEPENDENCY ===============================
const express = require('express');

const app = express();
const session = require('express-session');
const exphbs = require('express-handlebars');
const bcrypt = require('bcrypt');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('express-flash');
// const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const fs = require('fs');
const LocalStrategy = require('passport-local').Strategy;
require('./config/passport');

// =============================== MODEL ===============================
const auth = require('./config/auth');
const db = require('./config/db');
const User = require('./models/User');

// =============================== PASSPORT INIT ===============================

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

// SESSION SET
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
// PASSPORT SET
app.use(passport.initialize());
app.use(passport.session()); // LOGIN SESSION

// =============================== ROUTES ==============================
app.use((req, res, next) => {
  res.locals.user = req.user; // This is the important line
  console.log(res.locals.user);
  next();
});
app.use(flash()); // use connect-flash for flash messages stored in session

// =============================== ROUTES ===============================
app.get('/', auth.checkAuthenticated, (req, res) => {
  res.render('index.hbs', { req });
  // res.json('index.hbs', { name: req.user.username });
});

app.use('/auth', require('./routes/auth'));

// =============================== PORT & SERVER ===============================

app.set('port', 5000);

app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));

console.log('==========================================================================');
console.log('==========================================================================');

// FOLLOWING ESLINT - AIRBNB STYLE FORMAT

// =============================== SET ENV NODE ===============================
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// =============================== DEPENDENCY ===============================
const express = require('express');

const app = express();
const session = require('express-session');
const hbs = require('express-hbs');
const passport = require('passport');
const flash = require('express-flash');
const path = require('path');
// const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const fs = require('fs');
const LocalStrategy = require('passport-local').Strategy;
require('./config/passport');

// =============================== MODEL ===============================
const auth = require('./config/auth');
const db = require('./config/db');
const User = require('./models/User');
const Notice = require('./models/Notice');

// =============================== STATIC FOLDER / RESOURCES ===============================
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// =============================== DIRECTORY INIT ===============================
const dir = './uploads';
// INIT DIRECTORY
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// =============================== MIDDLEWARE & VIEW ENGINE ===============================
// app.engine('hbs', exphbs({ extname: '.hbs' }));
// app.set('view engine', 'hbs');

app.engine('hbs', hbs.express4({
  partialsDir: `${__dirname}/views/partials`,
  layoutsDir: `${__dirname}/views/layouts`,
}));
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

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

app.use((req, res, next) => {
  res.locals.user = req.user; // STORE USER DATA IN SESSION FOR GLOBAL ACCESS
  next();
});
app.use(flash()); // FOR FLASH MESSAGE

// =============================== ROUTES ===============================
app.get('/', (req, res) => {
  res.render('index.hbs', { req });
});
// app.get('/', auth.checkAuthenticated, (req, res) => {
//   res.render('index.hbs', { req });
//   // res.json('index.hbs', { name: req.user.username });
// });
app.use('/auth', require('./routes/auth'));
app.use('/notice', auth.checkAuthenticated, require('./routes/notice'));

// =============================== PORT & SERVER ===============================

app.set('port', 5000);

app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));
// =============================== DB TABLE ===============================
db.sync();

console.log('==========================================================================');
console.log('==========================================================================');

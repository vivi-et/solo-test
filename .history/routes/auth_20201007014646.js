const express = require('express');
const auth = require('./config/auth');

const router = express.Router();

router.get('/login', auth.checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
});

router.post(
  '/login',
  auth.checkNotAuthenticated,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }),
);

router.get('/register', auth.checkNotAuthenticated, (req, res) => {
  res.render('register.ejs');
});

router.post('/register', auth.checkNotAuthenticated, async (req, res) => {
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
    return res.send(`That email already exists!!${findEmail}`);
  }

  const findUser = await User.findOne({
    where: {
      username,
    },
  });
  if (findUser) {
    console.log(findUser);
    return res.send(`that username already exists!!${findUser}`);
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

router.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

module.exports = router;

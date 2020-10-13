const express = require('express');

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

module.exports = router;

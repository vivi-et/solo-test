.get('/login', auth.checkNotAuthenticated, (req, res) => {
  res.render('login.hbs');
});
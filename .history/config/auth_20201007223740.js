exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  console.log('objectobjectobjectobjectobjectobject');
  console.log('objectobjectobjectobjectobjectobject');
  console.log('objectobjectobjectobjectobjectobject');
  return res.redirect('/auth/login');
};

exports.checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  return next();
};

function loggedOut(req, res, next) {
    if (req.session && req.session.userId) {
      res.redirect('/login');
    }
    // return next();
  }
  function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
      res.send('you are logged in');
    } else {
      res.send('You must be logged in to view this page.')
    }
  }
  module.exports.loggedOut = loggedOut;
  module.exports.requiresLogin = requiresLogin;
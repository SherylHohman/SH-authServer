const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// use jwt strategy, and
// if authenticated, dON'T create a COOKIE Session (passport's default)
const requireAuth  = passport.authenticate('jwt',   { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {

  // test passport (requireAuth defined above) on root route (via postman)
  app.get('/', requireAuth, function(req, res) {
    // dummy protected content, that requires auth
    res.send({ dummy: 'protected content' });
  });

  // requireLogin from passport.js, THEN Authentication, IF auth'd..
  // first confirm email/password (requireLogin), then get token from .login (2 middleares)
  app.post('/login', requireLogin, Authentication.login)

  // /signup route calls the signup function in our newly created authentication controller
  // creates user (if !exists), gets token directly as part of that process (1 middleware)
  app.post('/signup', Authentication.signup);
}
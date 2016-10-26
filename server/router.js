const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// use jwt strategy, and
// when authenticated, dON'T create a COOKIE Session (passport's default). we're using tokens
const requireAuth  = passport.authenticate('jwt',   { session: false });

// local strategy grants auth from email/password.
// However this step doesn't generate a token,
// tokens are sent with subsequent requests, and are needed to visit protected routes
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {

  // test passport (requireAuth defined above) on root route (via postman)
  // verifies jwt token is valid before allowing access to protected content
  app.get('/', requireAuth, function(req, res) {
    // dummy protected content, that requires auth
    res.send({ dummy: 'protected content' });
  });

  // requireLogin from passport.js, THEN Authentication, IF auth'd..
  // first confirm email/password (requireLogin), then get token from .login (2 middleares)
  // two steps. token is always verified before can reach any 'requireAuth' path
  // this generates token, if email/password are valid
  app.post('/login', requireLogin, Authentication.login)

  // /signup route calls the signup function in our newly created authentication controller
  // creates user (if !exists), gets token directly as part of that process (1 middleware)
  app.post('/signup', Authentication.signup);
}
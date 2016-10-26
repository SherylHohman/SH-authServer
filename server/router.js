const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// use jwt strategy, and
// if authenticated, dON'T create a COOKIE Session (passport's default)
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {

  // test passport (requireAuth defined above) on root route (via postman)
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });

  // /signup route calls the signup function in our newly created authentication controller
  app.post('/signup', Authentication.signup);
}
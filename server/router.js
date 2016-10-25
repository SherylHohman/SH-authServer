const Authentication = require('./controllers/authentication');

module.exports = function(app) {
  // replace dummy get request for / route, that coded its response inline,
  // with post request for the /signup route
  // that calls the signup function in our newly created authentication controller
  app.post('/signup', Authentication.signup);
}
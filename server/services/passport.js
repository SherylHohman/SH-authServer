const passport = require('passport');
const JwtStragety = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config');
const User = require('../models/user');

// a Stragety is a method Passport can use for authenticating a user
// Passport is a library for handling authentications. Usually is is used for cookie auth, however with passport-jwt, it can also be used with jwt.

// We'll have two passport Strategies:
// Strategy #1: Verify via JWT: new user signup, or already logged in
// Stragety #2: Verify via username and password: existing user is logging in
// could also do github, facebook, etc. goto passport library for more info


// JWT Strategy (new user signin, using token) ---------------

//Setup options for this JWT Strategy
const jwtOptions = {
  // tell passport where to find our token,
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),

  // and the key so it can be decoded
  secretOrKey: config.jwt_secret
};
// Create JWT Strategy
  // payload is the DEcoded jwt token
  // jwt will have the "sub" and "iat" properties
  // we need the jwtsecret to decode the jwt token

  // done is a passport method, thats called at the end of our "strategy"
//    and handles granting/denying athentication
const jwtLogin = new JwtStragety(jwtOptions, function(payload, done) {

  // See if the user ID in the payload exists in our db
  User.findById(payload.sub, function(err, user) {
    // error connecting to the db, or the search process fails, userobject: false
    if (err) { return done(err, false); }

    // if found user, return 'null' error, and found user
    // If it does, call 'done' with that user
    if (user) {
      done(null, user);

      // user not found, return 'null' no error, 'false' user not found
    } else {
      done(null, false);
    }
  });

});

// Tell Passport to use this Strategy defined (above)
passport.use(jwtLogin);



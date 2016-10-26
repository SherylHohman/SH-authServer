const passport = require('passport');
const JwtStragety = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config');
const User = require('../models/user');
const LocalStrategy = require('passport-local');


// Local Strategy
const localOptions = {
  usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, function(email, password, done){
  User.findOne({ email: email }, function(err, user){
    if (err)   { return done(err); }
    if (!user) { return done(null, false); }

    user.comparePasswords(password, function(err, isMatch) {
      if (err) { done(err) }
      if (!isMatch) { done(null, false); }

      return done(null, user);
    });
  });
});


// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.jwt_secret
};

const jwtLogin = new JwtStragety(jwtOptions, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);



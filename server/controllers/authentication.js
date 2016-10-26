const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

// html status code for Unprocessable Entity: recognized and syntatically correct request, by semantically erroneous
const UNPROCESSED = 422;

function createUserToken(user){

  // jwt standard keys sub: subject, iat: issued at time, (see jwt.io)
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user, iat: timestamp}, config.jwt_secret);
}

exports.login = function(req, res, next){
  // User has been auth'd by email and password
  //   they just need a token
  // in  passport.localLogin.js, our local strategy,
  // Passport adds the user to res.user, soit's avail to us here..

  res.send({ token: createUserToken(req.user) });
}

exports.signup = function(req, res, next){
  // req: incoming data (at req.body),
  // res: our response  (use res.send)
  // next: for error handling

  // pull email and password from req.data
  const email    = req.body.email;
  const password = req.body.password;

  // don't allow empty email or password fields into db
  // validation for proper email/pass will be handled on front end
  if (!password || !email) {
    return res.status(422).send({error: "You must provide email and password"});
  }

  // search User database for given email
  User.findOne({email: email}, function(err, existingUser){
    if (err) {return next(err);}

    if (existingUser) {
      // 422 is http status code for "Bad data.."
      return res.status(422).send({ error: 'Email already in use'});
    }

    // if user email does NOT exist:
    // create new user with email/password
    const user = new User({
      email: email,
      password: password
    });

    // save new user to db
    user.save(function(err){
      if (err) { return next(err); }

      // return user token (jwt) after successfully saved new user to db
      res.send({"token": createUserToken(user)});
    });

  });
}


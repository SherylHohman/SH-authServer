const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function createUserToken(user){

  const timestamp = new Date().getTime();
  return jwt.encode({sub: user, iat: timestamp}, config.jwt_secret);
}

exports.login = function(req, res, next){
  res.send({ token: createUserToken(req.user) });
}

exports.signup = function(req, res, next){
  const email    = req.body.email;
  const password = req.body.password;

  if (!password || !email) {
    return res.status(422).send({error: "You must provide email and password"});
  }

  User.findOne({email: email}, function(err, existingUser){
    if (err) {return next(err);}

    if (existingUser) {
      return res.status(422).send({ error: 'Email already in use'});
    }

    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err){
      if (err) { return next(err); }

      res.send({"token": createUserToken(user)});
    });

  });
}

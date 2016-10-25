const User = require('../models/user');
// html status code for Unprocessable Entity: recognized and syntatically correct request, by semantically erroneous
const UNPROCESSED = 422;   

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

      // on success respond that user was successfully created
      res.send({"success": "true"});
    });

  });
}
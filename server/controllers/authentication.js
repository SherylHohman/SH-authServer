const User = require('../models/user');

exports.signup = function(req, res, next){
  // req: incoming data (at req.body),
  // res: our response  (use res.send)
  // next: for error handling
  console.log(req.body);

  // test that signups route is wired up correctly
  // Postman post request to localhost:3090/signup
  // should return the following json object
  res.send({success: 'true'});

  // pull email and password from req.data
  const email    = req.body.email;
  const password = req.body.password;

  // see if user/email exists already in database
  User.findOne({email: email}, function(err, existingUser){

    // if user with email already exists:
    //   throw error, (or redirect to signin page)


    // if user email does NOT exist:
    //   add new user/email/password to database


    //  and send response indicating user has been created

  });
}
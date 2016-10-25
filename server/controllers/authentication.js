exports.signup = function(req, res, next){
  // req: incoming data (at req.body),
  // res: our response  (use res.send)
  // next: for error handling

  // test that signups route is wired up correctly
  // Postman post request to localhost:3090/signup
  // should return the following json object
  res.send({success: 'true'});
}
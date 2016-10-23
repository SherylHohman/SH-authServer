module.exports = function(app) {
  // incoming data, our response, next: for error handling
  app.get('/', function(req, res, next){
    res.send(['test', 'data', 'returned from auth server']);
  });
}
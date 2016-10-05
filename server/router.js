module.exports = function(app) {
  // incoming data, our response, next: for error handling
  app.get('/', function(req, res, next){
    res.send(['a', 'b', 'c']);
  });
}
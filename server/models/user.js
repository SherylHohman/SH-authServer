const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define the model / schema
const userSchema = new Schema({
  email: {
    // JS type of string
    type: String,
    // each email must be unique (case insensitive)
    unique: true,
    // force email into lowercase, as mongodb isn't case sensitive
    lowercase: true
  },
  password: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next){
  // get access to the user model
  const user = this;

  //generate a salt (asynch), then run callback
  bcrypt.genSalt(10, function(err, salt){
    if(err) { return next(err); }

    // hash (encrypt) our password using the salt (asynch)
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) { return next(err); }

      // overwrite plain text password with encrypted password + salt
      user.password = hash;

      // now go ahead and save to db (rem this is a pre-save hook)
      next();
    });
  });
});

// add this method to the userSchema
// compare supplied password (hashed) with hash password in db, to see if they match. if so, auth them
// this method will be called from inside passport file, on the found user


userSchema.methods.comparePasswords = function(candidatePassword, callback) {

  // this.password refers to the user model, on the found user
  // isMatch gets set by bcrypt.compare, and gets passed to the
  //   in the callback from passport.localLogin, which calls this func
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {return callback(err); }

    callback(null, isMatch);
  });
};


// name our schema 'user', create a model class from it
const UserModelClass = mongoose.model('user', userSchema);

module.exports = UserModelClass;
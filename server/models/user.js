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
    })
  })
})


// name our schema 'user', create a model class from it
const UserModelClass = mongoose.model('user', userSchema);

module.exports = UserModelClass;
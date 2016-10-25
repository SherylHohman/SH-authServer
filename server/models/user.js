const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the model / schema
const userSchema = new Schema({
  email: {
    // JS type of string
    type: String,
    // each email must be unique (case insensitive)
    unique: true,
    // force data into lowercase, as mongodb isn't case sensitive
    lowercase: true
  },
  password: String
});

// name our schema 'user', create a model class from it
const UserModelClass = mongoose.model('user', userSchema);

module.exports = UserModelClass;
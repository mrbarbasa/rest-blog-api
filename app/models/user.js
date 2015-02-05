var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * User Schema
 * username {String} - the name of the user
 * email {String}    - the user's email
 */
var userSchema = new Schema({
  // Implement
});

var User = mongoose.model('Users', userSchema);

module.exports = User;

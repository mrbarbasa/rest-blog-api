var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Post Schema
 * title {String}   - the title of the post
 * content {String} - the content of the post
 * user {User}      - the user who made the post
 * comments {[Comments]} - the comments on the post
 *
 * _Comments will be an object with the attributes:
 * content {String}
 * user {User}
 */
var postSchema = new Schema({
  // Implement
});

var Post = mongoose.model('Posts', postSchema);

module.exports = Post;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

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
  title: String,
  content: String,
  user: {
    id: Schema.Types.ObjectId,
    username: String
  },
  comments: [{
    content: String,
    user: {
      id: Schema.Types.ObjectId,
      username: String
    }
  }]
});

var Post = mongoose.model('Posts', postSchema);

module.exports = Post;

var mongoose = require('mongoose');
var Faker = require('faker');

var config = require('./config');
var User = require('./app/models/user');
var Post = require('./app/models/post');

mongoose.connect(config.MONGO_URL);

// Global to track the number of users.
var users = [];

// Some helpers
function getRandomUser() {
  return users[getRandomInt(users.length)];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max.toFixed(1));
}

function createUsers(numUsers, callback) {
  var user;

  for (var i=0; i < numUsers; i++) {
    console.log('Creating user ' + (i + 1));
    user = new User({
      username: Faker.internet.userName(),
      email: Faker.internet.email()
    });

    user.save(function (err, user) {
      users.push(user);

      if (users.length === numUsers) {
        // Execute next function
        callback();
      }
    });
  }
}

function createPosts(numPosts, callback) {
  var post;
  var user;
  var numComments;
  var postCount = 0;

  for (var i=0; i < numPosts; i++) {
    console.log('Creating post ' + (i + 1));
    user = getRandomUser();
    numComments = getRandomInt(10);

    post = new Post({
      title: Faker.lorem.words(3).join(' '),
      content: Faker.lorem.paragraph(),
      user: {
        id: user.id,
        username: user.username
      }
    });

    post = addComments(post, numComments);

    post.save(function (err, post) {
      postCount++;

      if (postCount === numPosts) {
        callback();
      }
    });
  }
}

function addComments(post, numComments) {
  var user;

  for (var i=0; i < numComments; i++) {
    user = getRandomUser();
    post.comments.push({
      content: Faker.lorem.sentence(),
      user: {
        id: user.id,
        username: user.username
      }
     });
  }

  return post;
}

if (require.main === module) {
  User.remove({}, function () {
    Post.remove({}, function () {
      createUsers(10, createPosts.bind(null, 100, process.exit));
    });
  });
}

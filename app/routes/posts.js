var express = require('express');
var router = express.Router();

var Post = require('../models/post');

router.get('/', function(req, res) {
  Post.find({}, function(err, posts) {
    if (err) {
      throw err;
    }
    else {
      res.json(posts);
    }
  })
});

router.post('/', function(req, res) {
  var post = Post({
    title: req.body.title,
    content: req.body.content,
    user: {
      id: "54d304dc08f9748b0da331bf",
      username: "Post Author"
    },
    comments: [{
      content: "First comment!!!",
      user: {
        id: "54d304dc08f9748b0da331c0",
        username: "Comment Author"
      }
    }]
  });

  post.save(function(err, post) {
    if (err) {
      throw err;
    }
    else {
      res.json(post);
    }
  })
});

router.get('/:id', function(req, res) {
  Post.find({
    "_id": req.params.id
  }, function(err, posts) {
    if (err) {
      throw err;
    }
    else {
      res.json(posts[0]);
    }
  });
});

router.put('/:id', function(req, res) {
  Post.update({
    "_id": req.params.id
  }, {
    title: req.body.title,
    content: req.body.content
  }, function(err, numberAffected, result) {
    if (err) {
      throw err;
    }
    else {
      // If update was successful, return the updated document
      if (result.updatedExisting) {
        Post.find({
          "_id": req.params.id
        }, function(err2, posts) {
          if (err2) {
            throw err2;
          }
          else {
            res.json(posts[0]);
          }
        });
      }
      else {
        res.json({
          "success": "false"
        });
      }
    }
  });
});

router.delete('/:id', function(req, res) {
  Post.remove({
    "_id": req.params.id
  }, function(err) {
    if (err) {
      throw err;
    }
    else {
      res.json({
        "success": "true"
      });
    }
  });
});

module.exports = router;

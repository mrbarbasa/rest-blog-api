var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      throw err;
    }
    else {
      res.json(users);
    }
  });
});

router.get('/:id', function(req, res) {
  User.find({
    "_id": req.params.id
  }, function(err, users) {
    if (err) {
      throw err;
    }
    else {
      res.json(users[0]);
    }
  });
});

router.put('/:id', function(req, res) {
  User.update({
    "_id": req.params.id
  }, {
    username: req.body.username,
    email: req.body.email
  }, function(err, numberAffected, result) {
    if (err) {
      throw err;
    }
    else {
      // If update was successful, return the updated document
      if (result.updatedExisting) {
        User.find({
          "_id": req.params.id
        }, function(err2, users) {
          if (err2) {
            throw err;
          }
          else {
            res.json(users[0]);
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

module.exports = router;

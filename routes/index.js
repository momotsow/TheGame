var express = require('express');
var router = express.Router();
var User = require('../models/user');


// GET /register
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Sign Up' });
  });
  
  // POST /register
  router.post('/', function(req, res, next) {
    // res.send(req.body);

    if (req.body.email &&
      
      req.body.password &&
      req.body.confirmPassword) {
  
        // confirm that user typed same password twice
        if (req.body.password !== req.body.confirmPassword) {
        res.send('Passwords do not match.');
        }
  
        // create object with form input
        var userData = {
          email: req.body.email,

          password: req.body.password
        };
  
        // use schema's `create` method to insert document into Mongo
        User.create(userData, function (error, user) {
          if (error) {
            res.send('user alredy exist');
          } 
          else {
        console.log(user);
            res.redirect('/login');
          }
        });
      } 
      else {
       res.send('user already exist')
      }
  });

  
  // GET /login
  router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Log In'});
  });
  
  // POST /login
  router.post('/login', function(req, res, next) {
    if (req.body.email && req.body.password) {
      User.authenticate(req.body.email, req.body.password, function (error, user) {
        if (error || !user) {
          res.send('Wrong email or password.');
        }  else {
          req.session.userId = user._id;
          res.send('you are now logged in');
        }
      });
    } else {
      res.send('Email and password are required.');
    }
  });
  
  // GET /logout
router.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
            res.send('Wrong email or password.');
        } else {
        res.redirect('/login');
        }
      });
    }
  });
  

module.exports = router;
  
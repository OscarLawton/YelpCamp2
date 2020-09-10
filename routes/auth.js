var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

// Landing Page
router.get('/', function(req, res){
    res.render("landing");
})

//===================
// Register Routes
//===================

// deliver sign up page
router.get('/register', (req, res) => {
    res.render('register');
});

// register user in database
router.post('/register', (req, res) => {
    var newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password).then((user) => {
        passport.authenticate('local')(req, res, function(){
            res.redirect('/campgrounds');
        })
    }).catch((err) => {
        res.render('error', {err});
    })
});

//==============
// Login Routes
//==============

// serve login form
router.get('/login', (req, res) => {
    res.render('login');
});

// login logic
router.post('/login', passport.authenticate('local',{
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), (req, res) => {

});

// logout logic
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;

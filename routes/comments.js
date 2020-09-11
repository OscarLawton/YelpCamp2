var express = require('express');
// mergeParams is needed to send the _id of the campground by the params
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');


//=================
// Comment Routes
//=================
// Serve new-comment form
router.get('/new', isLoggedIn, (req, res) => {
    Campground.findById(req.params.id).then((campground) => {
        res.render('comments/new', {campground})
    }).catch((err) => {
        res.send("there was an error:    ", err)
    })
});

router.post('/', isLoggedIn, (req, res) => {
    Campground.findById(req.params.id).then((campground) => {
        Comment.create(req.body.comment).then((comment) => {
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.save();
            campground.comments.push(comment);
            campground.save();
            res.redirect('/campgrounds/' + campground._id);
        }).catch((err) => {
            console.log("there was an error: ", err);
            res.redirect("/campgrounds");
        })
    }).catch((err) => {
        console.log("there was an error: ", err);
        res.redirect('/campgrounds')
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
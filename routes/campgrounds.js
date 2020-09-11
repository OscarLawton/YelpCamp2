var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

// All Campgounds
router.get('/', (req, res) => {
    Campground.find({}).then(
        (allTheCampgrounds) => res.render("campgrounds/index", {campgrounds: allTheCampgrounds})
    ).catch(
        (err) => console.log("There was an error", err)
    )     
});

// Display make new campgrounds page
router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new.ejs");
});

// Create Campground
router.post('/', isLoggedIn, (req, res) => {
   
    // get data from form add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    Campground.create(newCampground).then((campground) => {
        campground.user.id = req.user._id;
        campground.user.username = req.user.username;
        campground.save();
        console.log(newCampground)
    }).catch((err) => console.log("error and fuck it all: ", err));
    // redirect back to campgrounds page
    res.redirect('/campgrounds');
});

// Show Campground
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec().then((campground) => {
        res.render("campgrounds/show",{campground: campground})
    }
    ).catch(
        (err) => res.send("something went wrong!!!") 
    )
    
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
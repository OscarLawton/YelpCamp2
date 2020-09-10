var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

// All Campgounds
router.get('/', (req, res) => {
    var user = req.user;
    Campground.find({}).then(
        (allTheCampgrounds) => res.render("campgrounds/index", {campgrounds: allTheCampgrounds})
    ).catch(
        (err) => console.log("There was an error", err)
    )     
});

// Create Campground
router.post('/', (req, res) => {
   
    // get data from form add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    Campground.create(newCampground).then((newCampground) => console.log(newCampground)).catch((err) => console.log("error and fuck it all"));
    // redirect back to campgrounds page
    res.redirect('/campgrounds');
});

// Display make new campgrounds page
router.get("/new", (req, res) => {
    res.render("campgrounds/new.ejs");
})


// Show Campground
router.get("/:id", (req, res) => {
    
    Campground.findById(req.params.id).populate("comments").exec().then((campground) => {
        console.log("***********");
        console.log(campground);
        console.log("**************");
        res.render("campgrounds/show",{campground: campground})
    }
    ).catch(
        (err) => res.send("something went wrong!!!") 
    )
    
});

module.exports = router;
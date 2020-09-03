var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mong = require("mongoose");
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require('./seeds');


seedDB();
mong.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to DB!')).catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');


/* Campground.create(
    {
        name: "Salmon Creek", 
        image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fweknowyourdreams.com%2Fimages%2Fcamping%2Fcamping-08.jpg&f=1&nofb=1"
    }
).then((campground) => console.log("You just created a campground!!!", campground)).catch((err) => console.log()); 

*/


/* var campgrounds = [
    {name: "Salmon Creek", image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fweknowyourdreams.com%2Fimages%2Fcamping%2Fcamping-08.jpg&f=1&nofb=1"},
    {name: "Granite", image: "https://andrewmurrayauthor.files.wordpress.com/2015/08/wupperman-campground-near-lake-city-colorado-photo-by-mary-carkin-lake-city-switchbacks.jpg"},
    {name: "Salmon Creek", image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fweknowyourdreams.com%2Fimages%2Fcamping%2Fcamping-08.jpg&f=1&nofb=1"},
    {name: "Granite", image: "https://andrewmurrayauthor.files.wordpress.com/2015/08/wupperman-campground-near-lake-city-colorado-photo-by-mary-carkin-lake-city-switchbacks.jpg"},
    {name: "Salmon Creek", image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fweknowyourdreams.com%2Fimages%2Fcamping%2Fcamping-08.jpg&f=1&nofb=1"},
    {name: "Granite", image: "https://andrewmurrayauthor.files.wordpress.com/2015/08/wupperman-campground-near-lake-city-colorado-photo-by-mary-carkin-lake-city-switchbacks.jpg"},
    {name: "Salmon Creek", image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fweknowyourdreams.com%2Fimages%2Fcamping%2Fcamping-08.jpg&f=1&nofb=1"},
    {name: "Granite", image: "https://andrewmurrayauthor.files.wordpress.com/2015/08/wupperman-campground-near-lake-city-colorado-photo-by-mary-carkin-lake-city-switchbacks.jpg"}

]
 */

// Landing Page
app.get('/', function(req, res){
    res.render("landing");
})

//<%- include("partials/header") %>
//<%- include("partials/footer") %>

// All Campgounds
app.get('/campgrounds', (req, res) => {
    Campground.find({}).then(
        (allTheCampgrounds) => res.render("campgrounds/index", {campgrounds: allTheCampgrounds})
    ).catch(
        (err) => console.log("There was an error", err)
    )     
});

// Create Campground
app.post('/campgrounds', (req, res) => {
   
    // get data from form add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    Campground.create(newCampground).then((newCampground) => console.log(newCampground)).catch((err) => console.log("error and fuck it all"));
    // redirect back to campgrounds page
    res.redirect('/campgrounds');
});

// Display make new campgrounds page
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new.ejs");
})


// Show Campground
app.get("/campgrounds/:id", (req, res) => {
    
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

app.get('/campgrounds/:id/comments/new', (req, res) => {
    Campground.findById(req.params.id).then((campground) => {
        res.render('comments/new', {campground})
    }).catch((err) => {
        res.send("there was an error:    ", err)
    })
});

app.post('/campgrounds/:id/comments', (req, res) => {
    Campground.findById(req.params.id).then((campground) => {
        Comment.create(req.body.comment).then((comment) => {
            console.log(comment);
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

app.listen(3000, function(){
    console.log("The YelpCamp Server Has Started!");
})


var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mong = require("mongoose");


mong.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

// Schema Setup

var campgroundSchema = new mong.Schema({
    name: String,
    image: String
});

var Campground = mong.model("Campground", campgroundSchema);
/* 
Campground.create(
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
app.get('/', function(req, res){
    res.render("landing");
})

//<%- include("partials/header") %>
//<%- include("partials/footer") %>
app.get('/campgrounds', (req, res) => {
    console.log("you hit the campgrounds page")
    Campground.find({}).then(
        (allTheCampgrounds) => res.render("index", {campgrounds: allTheCampgrounds})
    ).catch(
        (err) => console.log("There was an error", err)
    )
    
});

app.post('/campgrounds', (req, res) => {
   
    // get data from form add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    Campground.create(newCampground).then((newCampground) => console.log(newCampground)).catch((err) => console.log("error and fuck it all"));
    // redirect back to campgrounds page
    res.redirect('/campgrounds');
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
});

app.get("/campgrounds/:id", (req, res) => {
    
    Campground.findById(req.params.id).then(
        (campground) => res.render("show",{campground: campground})
    ).catch(
        (err) => res.send("something went wrong!!!") 
    )
    
});

app.listen(3000, function(){
    console.log("The YelpCamp Server Has Started!");
})


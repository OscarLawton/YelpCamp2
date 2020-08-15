var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

var campgrounds = [
    {name: "Salmon Creek", image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fweknowyourdreams.com%2Fimages%2Fcamping%2Fcamping-08.jpg&f=1&nofb=1"},
    {name: "Granite", image: "https://andrewmurrayauthor.files.wordpress.com/2015/08/wupperman-campground-near-lake-city-colorado-photo-by-mary-carkin-lake-city-switchbacks.jpg"},
    {name: "Salmon Creek", image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fweknowyourdreams.com%2Fimages%2Fcamping%2Fcamping-08.jpg&f=1&nofb=1"},
    {name: "Granite", image: "https://andrewmurrayauthor.files.wordpress.com/2015/08/wupperman-campground-near-lake-city-colorado-photo-by-mary-carkin-lake-city-switchbacks.jpg"},
    {name: "Salmon Creek", image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fweknowyourdreams.com%2Fimages%2Fcamping%2Fcamping-08.jpg&f=1&nofb=1"},
    {name: "Granite", image: "https://andrewmurrayauthor.files.wordpress.com/2015/08/wupperman-campground-near-lake-city-colorado-photo-by-mary-carkin-lake-city-switchbacks.jpg"},
    {name: "Salmon Creek", image:"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fweknowyourdreams.com%2Fimages%2Fcamping%2Fcamping-08.jpg&f=1&nofb=1"},
    {name: "Granite", image: "https://andrewmurrayauthor.files.wordpress.com/2015/08/wupperman-campground-near-lake-city-colorado-photo-by-mary-carkin-lake-city-switchbacks.jpg"}

]

app.get('/', function(req, res){
    res.render("landing");
})

//<%- include("partials/header") %>
//<%- include("partials/footer") %>
app.get('/campgrounds', (req, res) => {
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', (req, res) => {
   
    // get data from form add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect('/campgrounds');
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
});

app.listen(3000, function(){
    console.log("The YelpCamp Server Has Started!");
})


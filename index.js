var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mong = require("mongoose");
var passport = require('passport');
var LocalStrategy = require('passport-local');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var User = require('./models/user');
var seedDB = require('./seeds');

// Routes
var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    authRoutes = require('./routes/auth');

//seedDB();
mong.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to DB!')).catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"))

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

// Passport Configuration
app.use(require('express-session')({
    secret: 'Lucky is a great cat!',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});
//===============
// Routes
//===============
app.use(authRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(3000, function(){
    console.log("The YelpCamp Server Has Started!");
})


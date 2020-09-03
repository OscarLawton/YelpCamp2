var mongoose = require('mongoose');
var Campground = require('./models/campground');
const Comment = require('./models/comment');

var data = [
    {
        name: "Cloud's Rest", 
        image:'https://californiathroughmylens.com/wp-content/uploads/2017/07/clouds-rest-19-640x427.jpg',
        description: "This place was truly amazing"
    },
    {
        name: "Half Dome",
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg',
        description: 'I think this is used in Mac OS desktop background'
    }
]

function seedDB(){
    // remove all campgrounds
    Campground.remove({}).then(()=>{
        console.log('removed');
            // add campgrounds
    data.forEach((seedCG) => {
        Campground.create(seedCG).then((campground) =>{
            console.log('added a campground');
            Comment.create(
                {
                    text: "This place is aweomse but I need matches",
                    author: "greg lansky"
                }
            ).then((comment) => {
                campground.comments.push(comment)
                campground.save();
                console.log("comment saved")
            }).catch((err) => {

                console.log(err);
            })
        }).catch((err) => {
            consol.log(err);
        });
    });
   
    }).catch((e) => {
        console.log(e);
    })


    // add comments
}

module.exports = seedDB;
var mongoose = require('mongoose');
var Campground = require('./models/campground');
const Comment = require('./models/comment');

var data = [
    {
        name: "Cloud's Rest", 
        image:'https://californiathroughmylens.com/wp-content/uploads/2017/07/clouds-rest-19-640x427.jpg',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Half Dome",
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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
                    author: "Bob Sopowski"
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
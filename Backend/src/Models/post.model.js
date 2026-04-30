const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    caption:{
        type : String,
        default : ""
    },
    imgUrl:{
        type : String,
        required : [ true, "image id required to create a post" ]
    },
/**
in same db instaclone we created another collection named posts
InstaaUser collection me user ka data aur post collection me post ka data stor hoga 
posts collection me ham user id store krennge. User id Instaausers collection se aarhi hogi 
so you have to mention that collection by refernce ref:""
 */
    user:{
        ref : "InstaUsers",
        type : mongoose.Schema.Types.ObjectId,
        required : [ true, "user id is required to create a post" ]
    }

})
// in same db instaclone we created another collection named posts
// InstaaUser collection me user ka data aur post collection me post ka data stor hoga 
// posts collection me ham user id store krennge. User id Instaausers collection se aarhi hogi 
// so you have to mention that collection by refernce ref:""

const PostModel = mongoose.model( "posts", PostSchema )

module.exports = PostModel
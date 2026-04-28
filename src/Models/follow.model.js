const mongoose = require('mongoose')



const FollowSchema = new mongoose.Schema({
    Follower:{
        type : String,
    },
    Followee:{
        type: String,
    }
},{
    timestamps: true //means ye batata hai document kab create hua tha aur kab record hua tha 
})

const FollowModel = mongoose.model('Follows', FollowSchema)

module.exports = FollowModel
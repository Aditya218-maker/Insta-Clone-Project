const mongoose = require('mongoose')



const FollowSchema = new mongoose.Schema({
    follower:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "instausers",
        required: [true, "Follower is required"]
    },
    followee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "instausers",
        required: [true, "Followee is rrequired"]
    }
},{
    timestamps: true //means ye batata hai document kab create hua tha aur kab record hua tha 
})

const FollowModel = mongoose.model('Follows', FollowSchema)
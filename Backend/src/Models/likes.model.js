const mongoose = require('mongoose')


const LikeSchema = new mongoose.Schema({
    //kis post ko like krrhe hai
    Post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "post id is reuired for creating a like"]
    },
    //konsa user like krrha hai
    User:{
        type: String,
        required: [true, "username is required for creating a like"]
    }
}, {
    timestamps: true
})

LikeSchema.index({Post: 1, User: 1}, {unique: true})

const LikeModel = mongoose.model("likes", LikeSchema)

module.exports = LikeModel
const mongoose = require('mongoose')



const FollowSchema = new mongoose.Schema({
    Follower:{
        type : String,
    },
    Followee:{
        type: String,
    },
    //Follow request by default pending rahegi, aur sirf accepted ya rejected ban sakti hai later.
    status : {
        type: String,
        default: "pending",
        enum:{ // enum means status ki kya kya value ho sakti hai - yha pending, accepted ya rejected hi ho skti hai 
            values :["pending", "accepted", "rejected"],
            message: "Status can only be pending, accepted or rejected"
        }
        //task is to implement a feature to keep the follow request pending for every user initially
        // and then user can accept or reject it by seeing it 
    }
},{
    timestamps: true //means ye batata hai document kab create hua tha aur kab record hua tha 
})

//Ye ensure karta hai: same follower same user ko ek hi baar follow request bhej sakta hai
FollowSchema.index({ Follower:1, Followee:1}, {unique:true})
// means: same user same person ko dobara follow nahi kar sakta
/*validation ek hi jagah nahi hoti — multiple layers me hoti hai taaki data safe rahe.

1. Frontend layer

User galat input hi na bheje

Example:

password.length < 6
2. Express validator layer

API pe input check

body("email").isEmail()
3. Controller / service layer

Business logic check

Example:

if (Follower === Followee)

khud ko follow na kare.

4. Database / schema layer

Final protection

FollowSchema.index({ Follower:1, Followee:1 }, { unique:true })

Same follow duplicate save nahi hoga.

Simple meaning
Frontend → API → Controller → Database

Har layer pe checking hoti hai.

Why needed?

Agar frontend bypass ho jaye,
to backend still safe rahe.
*/

const FollowModel = mongoose.model('Follows', FollowSchema)

module.exports = FollowModel
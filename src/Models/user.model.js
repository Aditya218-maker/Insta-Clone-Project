const mongoose = require("mongoose")

/*
Schema matlab:
Data ka structure / format 
Jaise:
*username → string hoga
*email → string hoga
*password → required hoga

//const UserModel = mongoose.model("InstaUsers", UserSchema)

Model kya karta hai:
*database me collection banata hai
*usme data insert / read / update / delete karne deta hai

await mongoose.connect(process.env.MONGO_URI)
=> Ye MongoDB se connection banata hai


Mongoose kyu use karte hain?
👉 Kyunki:
*direct MongoDB use karna thoda complex hota hai
*Mongoose simple bana deta hai
*validation (required, unique) easily mil jata hai

*/



const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: [true, "User already exists with this name"],
        required: [true, "User name is required"]
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"]
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    bio: String,
    profileImage:{
        type: String,
        //give a default ig profile pic => we'll be using Cloud storage provider for that which is imagekit.io (can change as we can use any thing as our cloud storage provider)
        // go and download a default profile pic from google => go to imagekit=> media library => click +NEW => upload downloaded file there => a url copy icon will appear there copy it and paste it here 
        default: "https://ik.imagekit.io/iais2duys/defaultIGpp.avif"
    }
})

const UserModel = mongoose.model("InstaUsers", UserSchema)

module.exports = UserModel
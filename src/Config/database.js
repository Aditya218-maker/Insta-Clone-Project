/**
 * const mongoose = require("mongoose") kya karta hai?
Ye line bolti hai:
“Mujhe Mongoose library use karni hai”

Mongoose kya hota hai?
👉 Mongoose ek tool (library) hai jo:
*Node.js ko MongoDB database se connect karta hai
*Data ko easy aur structured way me handle karne deta hai

Jaise Express API banane ke liye use hota hai waise hi Mongoose database handle karne ke liye use hota hai



 */




const mongoose = require("mongoose")

async function ConnectToDB() {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected To DataBase");
    
}

module.exports = ConnectToDB
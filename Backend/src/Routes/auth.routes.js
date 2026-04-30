const express = require("express");

const AuthController = require('../Controllers/auth.controller')

/*
* require("express") → tum Express naam ka package (library) apne project 
me la rahe ho

Kyunki API banane ke liye Express ki zarurat hoti hai
wrna .post, .get methods kaam nahi krenge

API ek bridge hai jo frontend (UI) aur backend (server/database) ko connect karta hai

APIs banate kyu hain?
👉 Kyunki:
*frontend ko data chahiye hota hai
*database direct access nahi dete
*API ke through safe tarike se data dete hain

ex:
app.get("/users", (req, res) => {
  res.send("User list")
})

👉 Jab koi /users hit karega → data milega
👉 Ye ek API hai

Agar API nahi banaye toh?
👉 Problems:
frontend data nahi le paayega
app kaam hi nahi karegi
sab kuch direct database se karna unsafe hoga


📁 auth.route.js
👉 Ye tumhari API wali file hai

Yaha tum:
routes banate ho (/register)
logic likhte ho (user check, save etc.)

👉 Simple words me:
“Yaha APIs banti hain

Ek important cheez 
Tumne auth.route.js banaya hai,
lekin usko app.js me use bhi karna padega 👇

app.js me add karo:
const authRouter = require("./routes/auth.route")
app.use("/auth", authRouter)

*/

// const UserModel = require("../Models/user.model");

const authRouter = express.Router();

//express.Router() Express ka hi method hai
/*

Ye ek mini-app / mini router hota hai
👉 Iska use hota hai: alag file me APIs banane ke liye

Agar router na use kare => Sab kuch app.js me:

app.post("/register", ...)
app.post("/login", ...)
app.get("/profile", ...)

*/
// const crypto = require("crypto");

// const jwt = require("jsonwebtoken");

authRouter.post("/register", AuthController.RegisterController )

authRouter.post("/login", AuthController.LoginController)

module.exports = authRouter;

/**
 📁 app.js
👉 Ye tumhara main server file hai
Yaha tum:
server banate ho (express())
middleware lagate ho (express.json())

👉 Simple words me:
“Yaha app (server) start hota hai
 */

const express = require('express')

const cookieParser = require("cookie-parser")

const authRouter = require("./Routes/auth.routes")

/**
 * require("express")
👉 Express ko project me laata hai

const app = express()
👉 Ek app (server) banata hai

app.get / app.post
👉 APIs banane ke kaam aata hai
 */

const app = express()

app.use(express.json());

app.use(cookieParser())

app.use("/api/auth", authRouter)

module.exports = app

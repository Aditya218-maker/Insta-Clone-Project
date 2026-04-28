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

const cookieParser = require('cookie-parser')

// require Routes
const authRouter = require('./Routes/auth.routes')

const PostRouter = require('./Routes/post.routes')

const UserRouter = require('./Routes/user.routes')

/**
 * require("express")
👉 Express ko project me laata hai

const app = express()
👉 Ek app (server) banata hai

app.get / app.post
👉 APIs banane ke kaam aata hai
 */

const app = express()

app.use(express.json()) // ye middleware raw format data ko padh skta h form-data format data ko nhi 

// we need a different middleware so that express server can read form-data : install multer
// npm i multer

app.use(cookieParser())

// using Routes
app.use('/api/auth', authRouter)

app.use('/api/posts', PostRouter)

app.use('/api/users', UserRouter)

module.exports = app

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

const cors = require("cors")

const app = express()

app.use(express.json()) 

app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))


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

// we need a different middleware so that express server can read form-data : install multer
// npm i multer


// using Routes
app.use('/api/auth', authRouter)

app.use('/api/posts', PostRouter)

app.use('/api/users', UserRouter)

module.exports = app

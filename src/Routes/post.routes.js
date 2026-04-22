const express = require("express")
 
const PostRouter = express.Router()
const PostController = require('../Controllers/post.controller')

const multer = require("multer")

const upload = multer ({ storage : multer.memoryStorage() }) // to use it jis bhi api me you expect a file us api me likho upload.single("image") 
// "image" naam likho mtlb frontend(postman) me jo naam likha wo likhna 

/**
 * Multer uses two types of storage Disk and memory Storage
 * Disk Storage : file ssds ya hard disk me store hogi
 * Memory Storage : stores files in memory as Buffer objects, yaani temprorarily store hogi
 
 * We'll use Memory Storage. Why?
* Suppose a user posst an image and yhat image is stored in server 
Now the user has 2000 followers . Server has to show that image to those 2000 followers
Imagine the size of the file to be 100kb. So tottal storage cost will be 20 lacs kb or 200 mb data will be spend by the server 
* That means  server has to use 200 mb bandwidth to serve the img to 2000 users  (Bandwidth means server kitna data share kr rha h ya mangwa rha h)
* And we'll have to pay money for that 

// Now if we Use cloud Storage provider which do the same thing of transfering img to different users
// wel have to pay much less
// Some good Cloud Storrage provider are : S3 by AWS, Image kit, cloudinaryk

// So jaise hi user img server ko dega server use cloud storage provider k paas bhjdega yaani server temporarily store krta hai
// This is where memory storage comes. It stores file temporarily in multer


// To send img to cloud storage we'll use image kit 
// Read the documentation of imagekit => go to the website imagekit.io => Go to Docs => go to Nodejs => read teh documentation written how can you use imagekit in doc


// To install : npm install @imagekit/nodejs
// Then go To File uploads : Read it even if you dont ubderstand

// Go to Post Cntroller and require image kit



 */


/*
API : /api/posts => protected means only users having token can access this api
req.body = { caption, imageprofile }
*/

PostRouter.post("/", upload.single("image"), PostController.CreatePostController)


/**
 * Get all posts API:  /api/posts/      => protected
 */

PostRouter.get("/", PostController.GetPostController)

/**
 * return detail about specific post with the id. Also check whether posts belongs to the user who requested
 * /api/posts/details/:postid
 */

PostRouter.get("/details/:postId", PostController.GetPostDetailsController)


module.exports = PostRouter
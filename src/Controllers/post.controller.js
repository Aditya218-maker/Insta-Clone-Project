const PostModel = require('../Models/post.model')

const ImageKit = require("@imagekit/nodejs")

const { toFile } = require("@imagekit/nodejs")

const jwt = require("jsonwebtoken")

/**
 * .env file isliye banate hain taaki secret values (jaise API key, private key) code ke andar na likhni pade.
 * Node.js .env file se values process.env me load karta hai, jisse keys secure aur alag manage hoti hain.
 */

//new creates a new instance (object) from a class or constructor function.
//new ImageKit(...) means:
// ➡ "Create a brand-new ImageKit object using the ImageKit class."
/**
 * privateKey sirf naam nahi hai — ye ImageKit ki secret authentication key hoti hai. Ye batati hai ki request asli tumhari app se aa rahi hai, isliye isse password ki tarah private rakhte hain.
 * process.env Node.js me ek object hota hai jisme app ke environment variables store hote hain.
 * MAGEKIT_PRIVATE_KEY us object ke andar ek variable ka naam hai jisme tumhari ImageKit secret key rakhi hoti hai.
 */

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

// login in imagekit => Scroll Down and go to developer options => Go to private key copy it and paste in env file

//Jab user file bhejta hai tab ye function run hota hai.
async function CreatePostController(req, res) {
    console.log(req.body, req.file);

    // const token = req.cookies.token
    // //agar kisi user k pass token nahi h toh : ya toh uska token expire ho chuka hai(login nahi kiya) ya fir usne abhi tak register nahi kiay hai

    // if (!token) {
    //     return res.status(401).json({
    //         message: "Token not provided, Unauthorized access"
    //     })
    // }

    // let decoded = null //const blocked scope hota hai isliye decoded ko bahar hi declare krdo taaki baad me b use kr sko

    // try{
    //     decoded = jwt.verify(token, process.env.JWT_SECRET)
    //     // is line se ham token ka data toh pdh hi rhe hote hai saath me verify b krrhe hote hai ki token sahi h ya nhi
    //     // agra token shi h toh data nikal k decoded ko dedegi warna token galat h toh ye verify method ek error throw kregi jise ham catch me handle krenge
    //     // agar try aur catch ka use nhi krenge aur token galat hua toh ye method 500 error bhejega aur ham 401 error chahte hai
    // } catch(err){
    //     return res.status(401).json({
    //         message: " user not authorized"
    //     })
    // }

    //agr token milta hai toh jhame token se data nikalna padega
    //decoded me wo data ayega jo hamne token create krte waqt use kiya tha auth.controller me 
    // Token create krte waqt ham user ki id pass krrhe the
    // const token = jwt.sign(
    //     {
    //       id: user._id
    //     }
    // ab jwt.verify krte waqt yhi id data decode me le aate hai agar ap console.log(decoded) kroge you can see the user id 
    //   example =>   console.log(decoded); } :    output => { id: '69e6433fd44ed71abf845659', iat: 1776698184, exp: 1776784584 }



    //when you want to send file such as image you dont choose raw but choose form-data in Postman
    //write key name image and select file and write the value
    /*
    o/p in terminal
      [Object: null prototype] { caption: 'HaLa MaDrId' } {
      fieldname: 'image',
      originalname: 'WhatsApp Image 2025-04-04 at 12.35.23.jpeg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
    buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 06 06 06 06 07 06 07 08 08 07 0a 0b 0a 0b 0a 0f 0e 0c 0c 0e 0f 16 10 11 10 ... 84459 more bytes>,
    
    koi bhi image system k ssd me store hoti hai in combination of 0s and 1s.
    wo jo image ka data  jis format me h ssd me buffer whi dikhata hai 
    This buffer is our actual file data/content jis formast me file ssd me stor hoti hai 
    
    */

    //User jo image upload kare, us image ko ImageKit cloud server par store karna chahte the, 
    //taaki baad me uska URL use kar saken.

    //ye code image ko server se imagekit tak pahucha rhi h
    // Tum API ko image lene ke liye nahi, user se aayi image ko receive karne ke liye request handle kar rahe ho.
    /**
     req.file = {
      fieldname,
      originalname,
      mimetype,
      size,
      buffer
    }
      req.file → poori file ki details
      req.file.buffer → sirf image ka actual data 
     */

    const file = await imagekit.files.upload({

        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "First-folder"
        // imagekit me file idhr udhr na chale jaaye isliye folder bana lo aur media lib me jaa ke dekho
    })
    //toFile() thoda time leta hai file banane me, isliye await bolta hai: "Pehle file banne do, phir aage chalo."
    // res.send(file) //data returned by imagekit

    /**
     * req.file.buffer me uploaded image ka binary/raw data hota hai. Jaise image andar numbers me hoti hai:<Buffer 89 50 4e 47 ...>  Matlab photo abhi binary form me hai.
     * Buffer Node.js ka object hai jo file ka asli data memory me rakhta hai.
     * toFile(...) : Ye buffer ko actual uploadable File object me convert karta hai.
     * Matlab: raw data → file object
     * file: ImageKit upload function ko ek propb herty chahiye jiska naam file hota hai. Ye actual content hai jo upload hoga.
     * toFile(buffer, "file") : Yahaan "file" us file ka temporary naam hai.
     * fileName: Ye server par save hone wala naam hai. Matlab upload hone ke baad naam:Test
     
     * toFile(Buffer.from(req.file.buffer), "file") :   andar se bahar chalta hai
    
    Easy flow:
    req.file.buffer
    ⬇
    raw image data
    Buffer.from(...)
    ⬇
    buffer object
    toFile(...)
    ⬇
    file object
    imagekit.files.upload(...)
    ⬇
    cloud pe upload
     */

    /**
     Raw Image/file ka asli data bytes me hota hai: 255, 216, 255, 224, 0, 16
     Ye sirf numbers hain.
    
    Buffer object=>  Node.js ise aise dikhata hai: <Buffer ff d8 ff e0 00 10>
    
    Buffer.from() kisi data ko Node.js Buffer object me convert ya copy karta hai taaki file ki tarah use kar saken
    directly raw data har jagah use nahi kar sakte, kyunki bahut libraries (jaise ImageKit) ko Buffer ya File object chahiye hota hai.
    */

    // Now we have caption , img  of [post and with the help of decoded we know who created that post
    // Now we can create a post 
    const post = await PostModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })
    res.status(201).json({
        message: "Post created Successfully",
        post
    })

}

// Post api ki help se user post create kr skti hai 
// post api caption aur imagefile maangti hai 
// ab multiple user same api pe req bhejenge lekin server ko kaise paat chalega ki kon konsa request krrha hai 
// usi k liye hamare paas Token rehta hai

async function GetPostController(req, res) {
/**
 * Cookie ek chhota data hota hai jo browser me store hota hai.
 * Browser kuch aisa save karta hai: token = "eyJhbGciOiJIUzI1NiIsInR5cCI..."
 * Ye browser automatically har request ke saath server ko bhej sakta hai.
 * 
 * Token server banata hai jab user login karta hai.
 * 
 * Server cookie me token save karta hai: res.cookie("token", token)
 * "token" = cookie ka naam; token = JWT value
 * 
 * Server browser ko cookie bhejta hai : res.cookie("token", token)
 * cookie browser/client side me save hoti hai
 * User next request bhejta hai. Browser automatically cookie bhejta hai
 * Tab server ko milta hai: req.cookies.token
 * 
 * Server token decode karta hai: decoded = jwt.verify(token, process.env.JWT_SECRET)
 */



    // const token = req.cookies.token //taaki ham token ka data pata kar sake ki data kis user ka hai jisse pata chalega request kis user ne kia hai
    // //so we will use a method jwt.verify which needs two params token and jwt secret
    // let decoded;
    // try{
    //     decoded = jwt.verify(token, process.env.JWT_SECRET)
    // } 
    // catch(err){
    //     return res.status(401).json({
    //         message: "Token invalid "
    //     })
    // }

    const userId = req.user.id //jo bhi user ne req bhji hogi us user ki id aa jayegi

    //find and return all posts created by the user having this userid
    const posts = await PostModel.find({
        user: userId
    })
    // aur response bhj do
    res.status(200).json({
        message: "Posts fetched",
        posts
    })
}

async function GetPostDetailsController(req, res){
//     const token = req.cookies.token

//     //agr token nahi mila toh 
//     if(!token){
//         res.status.json({
//             message: "Unauthorized access"
//         })
//     }
// //agr token milgya toh verify kar
//     let decoded;
//     try{
//         decoded = jwt.verify(token, process.env.JWT_SECRET)
//     }
//     catch{
//         return res.stauts.json({
//             message : " Invalid token"
//         })
//     }
    const userId = req.user.id

    //ek particular post ki id bhi cahiye api me daalne k liye bhi
    const postId = req.params.postId

    const post = await PostModel.findById(postId)

    //agar psot hi nahi milti
    if(!post){
        return res.status(404).json({
            message: "Post not found"
        })
    }

    //check kr jo user request bhej rha hai usi ne post create kri thi ya nahi?
    //* * lekin JS me do object id normal id ki tarh compare nahi hoti...
    // const isValiduser = post.user === userId     => GALAT TAREEKA


    //unke liye alag methods use krna padta hai jaise .equals method()
    // ya fir object id ko .toString laga k string me convert krlo aur fir compare karlo
    // aur userid kyuki decoded me save thi toh wo already string me hi hoti hai 
    const isValiduser = post.user.toString() === userId    //=> SAHI TAREEKA
    

    if(!isValiduser){
        return res.status(403).json({
            message: "Invalid User"
        })
    }

    return res.status(200).json({
        messgae: "Posts fetched successfully",
        post
    })

}
// abhi tak teeno controller me hamne token se token se data nikalwaya h baar baar => lekin scalable code me we should avoid repetition
// to avoid this we use a middleware 
// bade projects me boht saare routers hote hai 
// man lo user server ko re bhjta hai aur server post router ko req forward karta hai 
// postrouter k paas 3 apis hain post api, get posts api, get ost details api

/*
//CONCEPTS:

1. Ek main server hota hai
Ye Express app hoti hai jo request receive karti hai.

const express = require("express");
const app = express();
app.use("/posts", postRouter);

Yahaan:
app = main server
server request receive karta hai
phir request ko appropriate router ko bhej deta hai

2. Router ek mini-module hota hai
Har feature ka apna router hota hai:

postRouter
userRouter
authRouter
commentRouter

Ye logically alag-alag routes handle karte hain.

3. router module me hi APIs define karte hain
Router file me hum likhte hain:
router.get(...)
router.post(...)
router.put(...)
router.delete(...)
*/

// ab baar ye identification code likhne k bajaye ham iske ek alag folder me likhenge : auth.middleware.js me
// identification code wo wla h jo if(!token) se leke try aur catch block  aur decoded wli line wla usko yha se hata ke middlewarre file me daalde



module.exports = {
    CreatePostController,
    GetPostController,
    GetPostDetailsController
}


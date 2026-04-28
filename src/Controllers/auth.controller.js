/**
 * Routes file me bas API create krte hai uske functions(Controllers) ham yaha likhte hai
 * Just paste the function from auth.route.js here remove the callback and give ita a name
 */

const UserModel = require('../Models/user.model');

// we can use crypto but its a low level package. In future if we want advance security we want bcrypt
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

async function RegisterController (req, res) {
  /*
    
UserModel kya hai?

👉 Ye tumne banaya tha yaha:
const UserModel = mongoose.model("InstaUsers", UserSchema)

👉 Iska matlab:
UserModel = tumhara database ka “User table/collection”

👉 Iske through tum:
data save karte ho
data dhoondte ho
update/delete karte ho


.findOne() kya hota hai?

👉 Ye ek Mongoose ka method hai
👉 Kaam:
database me ek matching user ko dhoondna


. => Dot ka matlab hota hai:
object ke andar ka function ya property use karna



Simple example:

const obj = {
  name: "Aman",
  sayHello: function() {
    console.log("Hello")
  }
}
obj.sayHello()

👉 Yaha:
obj = object
.sayHello() = uska function call

🔥 Same tumhare case me:

UserModel.findOne()

👉 Yaha:
UserModel = object (model)
.findOne() = uska function
    
*/

  /*
    basic approach:

     const UserExistsbyEmail = await UserModel.findOne({ email })

     if(UserExistsbyEmail){
        return res.status(409).json({
            message: "user already exists with this email"
        })
     }

     const UserExistsbyName = await UserModel.findOne({ username })

     if(UserExistsbyName){
        return res.status(409).json({
            message: "User already exists with this username"
        })
     }

    Flow :

    Server -------queries on MONGODB database for email------> DATABASE
       ^                                                  (databse finds any user exists on the basis of email)
       |                                                    (if exists then 👇)
       |                                                        |
       |                                                        |
       <-------------result -------------------------------------

    if doesnt esists then server moves ahead and again sends a query on the basis of username

    But isme bar bar databse ko call krna padega jisse DB pe load padega lekin ye ek hi cqall me ho jaega aur efficient hoga 
    
    */

  const { email, username, password, bio, profileImage } = req.body

  /* 
Iska matlab:   req.body ke andar jo data aaya hai, usko alag-alag variables me nikaal lo

Jab frontend request bhejta hai:
{
  "email": "test@gmail.com",
  "username": "aman",
  "password": "12345",
  "bio": "hello",
  "profileImage": "img.jpg"
}
👉 Ye sab data aata hai: req.body me


// ******* bas postman me profileImage json me nhi likhte. Uske liye alag se file hoti hai


Ab destructuring kya kar rahi hai?

const { email, username, password, bio, profileImage } = req.body

👉 Ye automatically bana deta hai:
* const email = req.body.email
* const username = req.body.username
* const password = req.body.password
* const bio = req.body.bio
* const profileImage = req.body.profileImage


Kyu use karte hain?

👉 Taaki code:
* chhota ho
* clean ho
* baar-baar req.body.xxx na likhna pade:  Agar destructuring na kare:
                                        const email = req.body.email
                                        const username = req.body.username
*/

  const UserExists = await UserModel.findOne({
    $or: [{ username }, { email }]

    // iska matlab ye hua ki database me query karo $or k basis pe ki agar DB me username ya email k basis pe user exist krta h toh result return krdena
    // ye $or oprator ek array maangta hsi jisme conditions hote hai
    // yha pe conditions hai : {username}, {email}
    // ki ya toh username ya email k basis pe result return krdo
  })

  if (UserExists) {
    return res.status(409).json({
      // agar hame check krna ho toh ki username ya email k basis pe result return hua h toh
      // + lagake ye condition likho

      message:
        'User already exists with this ' +
        (UserExists.email == email ? 'email' : 'username')
    })
  }

  // const hash = crypto.createHash("sha256").update(password).digest("hex");
  // Now we dont need this line after using bcrypt. Just write this

  const hash = await bcrypt.hash(password, 10) // => this 10 param is called salt means kitni baar hashing karni hai (10 baar)

  /**
 1. crypto.createHash('sha256') 👉 SHA-256 algorithm start karta hai (hashing ke liye)

 2. .update(password) 👉 password ko usme daalta hai

 3. .digest('hex') 👉 final hash ko string (hex format) me convert karta hai

Kyu use karte hain?:-
👉 Security ke liye:
password direct DB me store nahi karte ❌
hash store karte hain ✅

Login time kya hota hai?:-
* User password daalta hai
* usko phir se hash karte hain
* DB ke hash se match karte hain

*/

  const user = await UserModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash
  }) //yha: Tum database ko bata rahe ho ki kya save karna hai

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

  /**
     * token me hamare paas user ka data rehta hai
     * user ka konsa data rhega? => jo bhi ye do condition satisfy krde 1. user data 2. unique data
     * jo bhi data ye do condition satify krde usko ham use kr skte hai toke banane me 
     * and that is "id"
     
     * jwt.sign() 👉 Ye function token banata hai
     * process.env.JWT_SECRET
     👉 Ye secret key hai
     👉 Iska kaam:  token ko secure banana and verify karna (fake na ho)
     */

  res.cookie('token', token)

  /*res.cookie("token", token)
 ❓ Ye kya karta hai?
👉 Ye browser me cookie set karta hai

👉 Matlab:
server user ke browser me token store kar raha hai
 */

  /*
password kabhi response me nahi bhejte — ye strict rule hai 🔐

❓ Kyu nahi bhejte password?
1. 🔥 Security risk
👉 Agar tum password response me bhej doge:
koi hacker intercept kar sakta hai
frontend me leak ho sakta hai
logs me store ho sakta hai

👉 matlab account hack hone ka full chance

2. ❌ Frontend ko zarurat hi nahi hoti

👉 frontend ko kya chahiye?
username ✅
email ✅
token ✅

👉 password ka koi kaam hi nahi hai waha
 */

  res.status(201).json({
    message: 'User Registered Successfully',
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage
    }
  })
}

async function LoginController (req, res) {
  const { username, email, password } = req.body

  /**
   * hamara user ya toh username aur passsword ya fir email aur password k through login krrha hoga
   */

  // at least one field required
  if ((!username && !email) || !password) {
    return res.status(400).json({
      message: 'Username or email and password are required'
    })
  }

  const user = await UserModel.findOne({
    $or: [
      /*
      or opertaor need s array of conditions 
      ab jaise user ne username ya email me se ke value nhi di toh by deafult usme undefined chala
      jayega aur wo wli condition false ho jayega aur dusri condition k basis pe user find krega
*/
      {
        username: username //user username derha tph username k basis pe find one karo
      },
      {
        email: email
      }
    ]
  })
  if (!user) {
    return res.status(404).json({
      message: 'User not found'
    })
  }

  // const hash = crypto.createHash('sha256').update(password).digest('hex')
  // const isPasswordValid = hash == user.password

  // Now we dont want this long need after using bcrypt we can do this in one line

  const isPasswordValid = await bcrypt.compare(password, user.password)
  /* this line alone do two things 1. login k tym jo password aya h use hash me ocnvert karo
                                   2. Compare karo current passowrd se 
*/

  if (!isPasswordValid) {
    return res.status(401).json({
      message: 'Wrong password'
    })
  }

  const token = jwt.sign(
    {
      id: user._id,
      username : user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )
  res.cookie('token', token)

  res.status(200).json({
    message: 'User logged in successfully',
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage
    }
  })
}

module.exports = {
  RegisterController,
  LoginController
}

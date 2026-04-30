const jwt = require('jsonwebtoken')

// we'll use this function as a middleware . Middleware wle func me ek next param ka use krte hai
// This function only identifies ehich user has send requests
// pehle re post api k paas ane k baad seedha controller k paas jati thi ab post api se identify user ko pehele req jayegi
// jab request identify user k pass jayegi ntab usi tym pe ham request pe ek nayi property add krenge req.user nam ki
// aur us req.user me decoded ka data daalde aur next() function ki help se aage bhjde req ko controller pe 
// isi function ko middle ware bolte hain

async function IdentifyUser(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token not provided, Unauthorized access"
        })
    }

    let decoded = null 

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: " user not authorized"
        })
    }
    req.user = decoded
    next()
    //bs ab controller me jaha jaha decoded likha hai wha req.user likhde
    // aur routes file me api aur controller k beech me add krde
}

module.exports = IdentifyUser  
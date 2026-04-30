const FollowModel = require('../Models/follow.model')
const UserModel = require('../Models/user.model')


async function FollowUserController(req, res){ //Ye Express controller hai jo request handle karega

    const FollowerUserName = req.user.username 
    //req.user middleware se aaya hoga. Token verify hone ke baad server ne user attach kiya hoga
     
    const FolloweeUserName = req.params.username

    //what if someone tries to follow himself
    if(FolloweeUserName == FollowerUserName){
        return res.status(400).json({
            message : "You can't follow yourself"
        })
    }

    //What if somoene tries to follow same person again and again
    const isAlreadyFollowing = await FollowModel.findOne({
        Follower: FollowerUserName,
        Followee: FolloweeUserName
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message: `You are already following this User`
        })
    }

    //What if that user doesnt exist which anyone wants to follow
    const isFolloweeExist = await UserModel.findOne({
        username: FolloweeUserName
    })
    if(!isFolloweeExist){
        return res.status(404).json({
            messgae: "This User doesn't exist"
        })
    }

    // Now follower wants to follow followee
    const FollowRecord = await FollowModel.create({
        Follower: FollowerUserName,
        Followee: FolloweeUserName
    })

    res.status(201).json({
        message : `You are now following ${FolloweeUserName}`,
        FollowRecord
    })

}


async function UnFollowUserController(req, res){
    const FollowerUserName = req.user.username
    const FolloweeUserName = req.params.username //req.params isliye use hua kyunki follow karne wala username URL se aa raha hai.

    const IsUserFollowing = await FollowModel.findOne({
        Follower: FollowerUserName,
        Followee: FolloweeUserName
    })
    if(!IsUserFollowing){
        return res.status(w00).json({
            message: `You are not following this User`
        })
    }
    await FollowModel.findByIdAndDelete(IsUserFollowing._id)
}

async function GetPendingRequestsController(req, res) {
    const username = req.user.username
    // current logged in user nikaalo. Middleware ne user identify kar diya hota hai.
    /**
username = "rahul"
Matlab: Rahul dekh raha hai kisne usko request bheji.
     */
    const requests = await FollowModel.find({
        Followee: username,
        status: "pending"
    })
/**
 * database me search
 * Ye query bolegi:
Find karo jahan:
Followee = "rahul"
status = "pending"
 */
    res.status(200).json({
        message: "Pending requests fetched",
        requests
    })
}

async function RespondFollowRequestController(req, res) {
    const requestId = req.params.requestId
    //request ki id lo jo URL se aayegi
    const action = req.body.action
    /**
user ka action lo
const action = req.body.action

Frontend bhejega:
{
   "action": "accepted"
}
ya
{
   "action": "rejected"
}
     */

    if (!["accepted", "rejected"].includes(action)) {
        return res.status(400).json({
            message: "Action must be accepted or rejected"
        })
    }

    const request = await FollowModel.findByIdAndUpdate(
        requestId,
        {
            status: action
        },
        {
            new: true
        }
    )
    /**
validation
Check karega: sirf ye allowed hai:
✅ accepted
✅ rejected
     */

    res.status(200).json({
        message: `Request ${action}`,
        request
    })
}

module.exports = {
    FollowUserController,
    UnFollowUserController,
    GetPendingRequestsController,
    RespondFollowRequestController,

}
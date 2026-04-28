const FollowModel = require('../Models/follow.model')


async function FollowUserController(req, res){ //Ye Express controller hai jo request handle karega

    const FollowerUserName = req.user.username 
    //req.user middleware se aaya hoga. Token verify hone ke baad server ne user attach kiya hoga
     
    const FolloweeUserName = req.params.username

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

module.exports = {
    FollowUserController
}
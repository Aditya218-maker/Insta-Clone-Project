const express = require('express')

const UserController = require('../Controllers/user.controller')

const IdentifyUser = require('../middlewares/auth.middleware')

const UserRouter = express.Router()

/**
 * @route Post : /api/users/follow/:userid
 * @description Follow a user
 * @acess Private
 */
 UserRouter.post("/follow/:username", IdentifyUser, UserController.FollowUserController)
//remove it because ab dedicated follow route use hoga.

/**
 * @route POST : /api/users/unfollow/:userid
 * @description Unfollow a user
 * @access Private
 */
UserRouter.post("/unfollow/:username", IdentifyUser, UserController.UnFollowUserController)

UserRouter.get("/follow/pending", IdentifyUser, UserController.GetPendingRequestsController)

UserRouter.patch("/follow/respond/:requestId", IdentifyUser, UserController.RespondFollowRequestController)

module.exports = UserRouter

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

module.exports = UserRouter

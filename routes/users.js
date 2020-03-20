const express = require('express');
const userRouter = express.Router();
const User = require("../controller/UserController");

// @route   GET /
// @desc    Get All User
// @access  Public
userRouter.get('/',
    async (req, res) => User.getAllUsers(req, res)
);


module.exports = userRouter;

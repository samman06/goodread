const express = require('express');
const userRouter = express.Router();
const User = require("../controller/UserController");

// @route   GET /
// @desc    Get All User
// @access  Public
userRouter.get('/',
    async (req, res) => User.getAllUsers(req, res)
);

// @route   GET /users/signup
// @desc    signUp user
// @access  Public
userRouter.post('/signup',
    async (req, res) => User.signUp(req, res)
);



module.exports = userRouter;

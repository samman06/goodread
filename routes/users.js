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

// @route   GET /users/login
// @desc    login user
// @access  Public
userRouter.post('/login',
    async (req, res) => User.login(req, res)
);


module.exports = userRouter;

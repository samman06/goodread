const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
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

// @route   GET /users/current
// @desc    get the current user
// @access  private
userRouter.get(
    '/current',
    passport.authenticate('jwt', {session: false}),
    (req, res) => User.getCurrentUser(req, res)
);



module.exports = userRouter;

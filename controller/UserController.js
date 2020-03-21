const bcrypt = require('bcryptjs');
const UsersModel = require('../models/user');
const validation = require("../validation/inputsValidation");
const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');

class UserController {

    async getAllUsers(req, res) {
        try {
            const users = await UsersModel.find();
            return res.json({users});
        } catch (e) {
            res.send('error in getting data');
        }
    }

    async signUp(req, res) {
        const {errors, isValid} = validation.validateRegisterInputs(req.body);
        if (!isValid) return res.json({errors});
        try {
            let user = await UsersModel.findOne({email: req.body.email})
            if (user) return res.json({email: 'Email already exists'});
            const {firstName, lastName, email, password} = req.body;
            const newUser = new UsersModel({firstName, lastName, email, password});
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newUser.password, salt);
            newUser.password = hashPassword;
            user = await newUser.save();
            return res.json({user});
        } catch (err) {
            console.log(err)
        }
    }

    async login(req, res) {
        const {email, password} = req.body;
        const {errors, isValid} = validation.validateLoginInputs(req.body);
        if (!isValid) return res.json({errors});
        try {
            const user = await UsersModel.findOne({email: email});
            if (!user) return res.json({errors: {email: 'email not found'}});
            const isMached = await bcrypt.compare(password, user.password);
            if (isMached) {
                const {_id, firstName, lastName, email, photo, isAdmin} = user;
                const payload = {_id, firstName, lastName, email, photo, isAdmin};
                let token = await jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600})
                if (token) return res.json({token: "Bearer " + token, user: {_id, firstName, lastName}});
            } else {
                return res.json({errors: {password: 'password incorrect'}});
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getCurrentUser(req, res) {
        const {_id, firstName, lastName, userName, email, photo, isAdmin} = req.user;
        const currentUser = {_id, firstName, lastName, userName, email, photo, isAdmin,};
        res.json(currentUser);
    }

}

const User = new UserController();
module.exports = User;

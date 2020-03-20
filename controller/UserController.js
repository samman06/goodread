const bcrypt = require('bcryptjs');
const UsersModel = require('../models/user');

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

}

const User = new UserController();
module.exports = User;

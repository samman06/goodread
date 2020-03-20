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

}

const User = new UserController();
module.exports = User;

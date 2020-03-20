const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');
const UserModel = require('../models/user');

class Admin {
    async login({body}, res) {
        const {email, password} = body;
        try {
            const user = await UserModel.findOne({email: email});
            if (!user) return res.status(404).json({errors:{email: 'email not found'}});
            if (user.isAdmin) {
                const isMached = await bcrypt.compare(password, user.password);
                if (isMached) {
                    const {_id, firstName, lastName, userName, email, photo, isAdmin} = user;
                    const payload = {_id, firstName, lastName, userName, email, photo, isAdmin};
                    return jwt.sign(payload, keys.secretOrKey, {expiresIn: 360000}, (err, token) => {
                        if (!err) return res.json({token: "Bearer " + token,user});
                        return res.json({err: err});
                    });
                }
                return res.json({errors:{password: 'password incorrect'}});
            }
            return res.json({msg: "un authorized"});
        } catch (e) {
            console.log(e);
        }
    }
}

const AdminController = new Admin();
module.exports = AdminController;

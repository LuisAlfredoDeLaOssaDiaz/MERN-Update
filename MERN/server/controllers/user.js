const { msg } = require("../msg/msg")
const User = require('../models/user.js');

async function getMe(req, res) {
    const {user_id} = req.user

    
    const response = await User.findById(user_id);
    
    if (!response) {
        msg(res,400, "No se encontro usuario")
    } else {
        msg(res,200,response)
    }
}

module.exports={
    getMe
}

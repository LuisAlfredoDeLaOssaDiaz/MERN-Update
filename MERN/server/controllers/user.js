const { msg } = require("../msg/msg")
const bcrypt = require("bcryptjs");
const User = require('../models/user.js');
const image = require('../utils/image');

async function getMe(req, res) {
    const {user_id} = req.user

    
    const response = await User.findById(user_id);
    
    if (!response) {
        msg(res,400, "No se encontro usuario")
    } else {
        msg(res,200,response)
    }
}
 
async function getUsers(req, res) {
    const {active} = req.query
    let response = null;

    if (active === undefined) {
        response = await User.find({});
    } else { 
        if (active !== undefined) {
            response = await User.find({active});
        }
    }
    if (!response[0]) {
        response = "No hay data en la DB";
    }

    msg(res,200,response)
}

function createUser(req, res) {
    const {password} = req.body
    const user = new User({...req.body, active: false})

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt);

    user.password = hashPassword;
    // console.log(req.files.avatar);
    if (req.files.avatar) {
        const imagePath = image.getFilePath(req.files.avatar)
        console.log(imagePath);
        user.avatar = imagePath;
    }
     

    user.save((err, userStored)=> {
        if (err) {
            return msg(res, 500, "Error al guardar usuario")
        } else if(req.files.avatar) {
            return msg(res,201,`${userStored}`)
        }
    })
}

async function updateUser(req, res) {
    const { id } = req.params;
    const userData = req.body;
    
    //Password
    if (userData.password) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password, salt)
        userData.password = hashPassword;
    } else {
        delete userData.password;
    }

    //Avatar
    if (req.files.avatar) {
        const imagePath = image.getFilePath(req.files.avatar)
        userData.avatar = imagePath;
    }

    User.findByIdAndUpdate({_id: id}, userData, (err) => {
        if (err) {
            return msg(res, 400, "Error al actualizar.")
        } else {
            return msg(res, 200, "Usuario actualizado.")
        } 
    })
}

async function deleteUser(req, res) {
    const {id} = req.params;

    User.findByIdAndDelete(id, (error)  => {
        if (error) {
            msg(res,400,"Error al eliminar.")
        } else {
            msg(res,200,"Usuario eliminado.")
        }
    })
}

module.exports={
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}

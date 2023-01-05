const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt.js')
const { msg } = require('../msg/msg.js');

function register(req, res) {
    const {firstname, lastname, email, password, active} = req.body;
    
    if (!email) { 
        res.status(400).send({msg: "Email obligatorio"})
    }
    if (!password) { 
        res.status(400).send({msg: "Password obligatorio"})
    }
    
    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        password,
        role: "user",
        active: active
    });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    user.password = hashPassword;

    user.save((error, userStorage) => {
        if (error) {
            return msg(res, 400, "Error al crear usuario");
        }
        else {
            return msg(res, 200, [user, userStorage]);
        }
    })
}

function login(req, res) {
    const {email, password} = req.body
    if(!email) {
        return res.status(400).send({msg: "Email obligatorio."})
    }
    if(!password) {
        return res.status(400).send({msg: "Password obligatorio."})
    }
    
    const emailLowerCase = email.toLowerCase();  // CONVERTIR TODO A MINISCULAS
    
    User.findOne({email: emailLowerCase}, (error, userStore) => {
        try {
            bcrypt.compare(password, userStore.password, (bcryptError, check) => {
                if (bcryptError) {
                    return msg(res, 500, "server error.")
                } else if(!check) {
                    return msg(res, 400, "Contraseña incorrecta.")
                    
                } else if (!userStore.active) {
                    return msg(res, 401, "Usuario no Autorizado.");
                    
                } else {
                    return msg(res,200,{
                        access: jwt.createAccessToken(userStore),
                        refresh: jwt.createRefreshToken(userStore)
                    })
                }
            })
            
        } catch (error) {
            console.log(error);
            return msg(res, 400, "Error del servidor.")
        }
        // if(error) {
        // } else {
        // }
    });
}

function refreshAccessToken(req, res) {
    const {token} = req.body;

    (!token) ? msg(res, 400, "Token Requerido.") : null ;

    const {user_id} = jwt.decoded(token)

    User.findOne({_id: user_id}, (error, userStorage) => {
        if (error) {
            msg(res, 500, "Error del servidor.");
        } else {
            const vJWT = {
                accessToken: jwt.createAccessToken(userStorage)
            }

            msg(res, 200, vJWT);
        }
    })
}

module.exports = {
    register,
    login,
    refreshAccessToken
}
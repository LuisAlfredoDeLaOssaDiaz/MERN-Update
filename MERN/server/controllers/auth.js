const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt.js')
const { msg } = require('../msg/msg.js');

function register(req, res) {
    const {firstname, lastname, email, password} = req.body;

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
        active: false
    });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    user.password = hashPassword;

    user.save((error, userStorage) => {
        if (error) {
            res.status(400).send({msg: "Error al crear usuario"});
        }
        else {
            res.status(200).send(userStorage);
        }
    })
}

function login(req, res) {
    const {email, password} = req.body
    if(!email) res.status(400).send({msg: "Email obligatorio."})
    if(!password) res.status(400).send({msg: "Password obligatorio."})

    const emailLowerCase = email.toLowerCase();

    User.findOne({email: emailLowerCase}, (error, userStore) => {
        if(error) {
            msg(res, 400, "Error del servidor.")
        } else {

            bcrypt.compare(password, userStore.password, (bcryptError, check) => {
                if (bcryptError) {
                    msg(res, 500, "server error.")
                } else if(!check) {
                    msg(res, 400, "Contraseña incorrecta.")
                    
                } else if (!userStore.active) {
                    msg(res, 401, "Usuario no Autorizado.");
                    
                } else {
                    res.status(200).send({
                        access: jwt.createAccessToken(userStore),
                        refresh: jwt.createRefreshToken(userStore)
                    })
                }
            })

        }
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
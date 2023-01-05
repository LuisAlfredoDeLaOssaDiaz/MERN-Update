const jwt = require('../utils/jwt');
const { msg } = require('../msg/msg');

function asureAuth(req,res,next) {
    if (!req.headers.authorization) {
        msg(res,403,"La petizion no tiene la cabezera de autenticacion.");
    }

    const token = req.headers.authorization.replace("Bearer ", "");
    
    try {
        const payload = jwt.decoded(token)

        const { exp } = payload;
        const currentData = new Date().getTime();

        if (exp <= currentData) {
            return msg(res,400, "El token ha expirado")
        }
        req.user = payload;
        next();
    } catch (error) {
        return msg(res,400,"Token invalido.")
    }

}

module.exports = asureAuth

const { msg } = require("../msg/msg")

async function getMe(req, res) {
    msg(res, 200, "OK")
}

module.exports={
    getMe
}

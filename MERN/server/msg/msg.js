function msg(res, status, message) {
    return res.status(status).send({msg: message})
}

module.exports = {
    msg
}
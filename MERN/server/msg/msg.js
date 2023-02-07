function msg(res, status, message) {
    res.status(status).send({msg: message})
}

module.exports = {
    msg
}
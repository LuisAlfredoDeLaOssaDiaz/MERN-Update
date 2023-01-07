const Newsletter = require("../models/newsletter");
const { msg } = require("../msg/msg");

function suscribeEmail(req, res) {
    const {email} = req.body;

    if (!email) {
        return msg(res,400,"Email obligatorio")
    }
    
    const newsletter = new Newsletter({
        email: email.toLowerCase()
    });

    newsletter.save((err, newsletterStored) => {
        if (err) {
            msg(res,400, "error: Email registrado.")
        } else {
            msg(res,200, "Usuario guardado exitosamente.")
        }
    })
}

async function getNewsLetter(req, res) {
    const {page = 1, limit = 10} = req.query
    const {email} = req.body;

    let response = null;

    const options = {
        page : parseInt(page),
        limit: parseInt(limit)
    };

    if (!email) {
        response = await Newsletter.paginate({}, options)
    } else {
        response = await Newsletter.paginate({email}, options)
    }
    if(!response) {
        msg(res, 400, "Emails not found.")
    } else {
        msg(res, 200, response)
    }
    
}


async function deleteNewsletter(req, res) {
    const {id} = req.params;

    Newsletter.findByIdAndDelete(id, (err) => {
        if (err) {
            return msg(res, 400, "Error al eliminar.")
        } else {
            return msg(res, 200, "Newsletter eliminado.")
        }
    })
}

module.exports = {
    suscribeEmail,
    getNewsLetter,
    deleteNewsletter,
}

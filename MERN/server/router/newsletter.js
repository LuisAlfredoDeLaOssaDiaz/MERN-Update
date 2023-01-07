const express = require("express")
const NewsletterController = require("../controllers/newsletter")
const asureAuth = require("../middlewares/autenticated")
const api = express.Router()

api.post("/newsletter", NewsletterController.suscribeEmail)
api.get("/newsletter", asureAuth, NewsletterController.getNewsLetter)
api.delete("/newsletter/:id", asureAuth, NewsletterController.deleteNewsletter)

module.exports = api;
const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate")

const NewslettersSchem = mongoose.Schema({
    email: {type: String, unique: true}
})

NewslettersSchem.plugin(mongoosePaginate)

module.exports = mongoose.model("Newsletter",NewslettersSchem);
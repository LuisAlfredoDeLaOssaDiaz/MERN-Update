const mongoose = require("mongoose")

const MenuSchema  = mongoose.Schema({
    title: {type : String},
    path: {type : String},
    order: {type : Number},
    active: {type : Boolean}
})

module.exports = mongoose.model("Menu", MenuSchema);
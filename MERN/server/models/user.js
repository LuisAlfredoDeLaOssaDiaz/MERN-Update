const mongoose = require("mongoose");

const UserSchema = mongoose.Schema ({
    fistname: {type: String, required: false},
    lastname: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, require: true},
    role: {type: String, require: false},
    active: {type: Boolean, required: false},
    avatar: {type: String}
});

module.exports = mongoose.model("User", UserSchema);
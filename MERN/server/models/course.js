const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const CourseSchema  = mongoose.Schema({
    title: {type : String},
    miniature: {type : String},
    description: {type : String},
    url: {type : String},
    price: Number,
    score: Number
})

CourseSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Course", CourseSchema);

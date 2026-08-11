const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    user: String,
    type: String,
    image: String,
    imageId: String,
})

module.exports = mongoose.model("Image", imageSchema);
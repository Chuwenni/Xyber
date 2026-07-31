const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    user: String,
    image: String,
    imageId: String,
})

module.exports = mongoose.model("Image", imageSchema);
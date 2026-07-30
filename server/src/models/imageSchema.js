const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    user: String,
    image: String,
    image_id: String,
})

module.exports = mongoose.model("Image", imageSchema);
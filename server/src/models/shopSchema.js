const mongoose = require("mongoose")

const shopSchema = mongoose.Schema({
    user: String,
    shopName: {
        type: String,
        required: [true, "Shop Name required"],
        unique: true
    },
    shopDescription: {
        type: String,
    },
    follower: Number,
    sales: Number,
    rating: Number
})

const shop = mongoose.model('Shop', shopSchema)

module.exports = shop
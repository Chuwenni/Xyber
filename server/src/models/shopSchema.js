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
    follower: {
       type: Number,
       default: 0
    },
    sales: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    }
})

const shop = mongoose.model('Shop', shopSchema)

module.exports = shop
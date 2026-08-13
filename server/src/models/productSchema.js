const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    owner: {
        type: String
    },
    name: {
        type: String,
        unique: true,
        maxlength: [20, "Name Can't be More than 20 Characters"]
    },
    description: {
        type: String,
        maxlength: [200, "Description Exceeds the Limit"]
    },
    category: {
        type: String
    },
    stocks: {
        type: Number
    },
    rating: {
        type: Number,
        default: 0
    },
    price: {
        type: Number
    },
    image: {
        type: String
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
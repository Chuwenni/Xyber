const Shop = require("../models/shopSchema")
const cloud = require("../config/cloudConfig")
const Image = require("../models/imageSchema");
const User = require("../models/userSchema");

const getShop = async (req, res) => {
    try {
        const user = req.user;

        if (user.role == "customer") {
            return res.status(403).json({ message: "Seller Only Page! \tCreate a Shop to be a Seller", type: "warning" })
        }

        const userShop = await Shop.findOne({ user: user.email }).lean();
        const shopImage = await Image.findOne({ user: user.email, type: "shop" })

        if (!userShop) {
            return res.status(404).json({ message: "No Shop Found in your Account make sure to create one", type: "warning" })
        }
        
        const shop = { ...userShop, image: shopImage ? shopImage.image : null}
        
        return res.json({ shopInfo: shop});
    } catch (error) {
        console.log(error)
    }
}

const createShop = async (req, res) => {
    try {
        const user = req.user;
        const userShop = await Shop.findOne({ user: user.email })
        
        if (userShop) {
            return res.status(400).json({ message: "You already have a Shop!", type: "warning" })
        }

        const uploadedImage = await cloud.uploader.upload(req.file.path, {
            folder: "shopImages"
        })

        if (!uploadedImage) {
            return res.status(400).json({ message: "Can't Upload Image!", type: "warning" })
        }

        const shopImage = await Image.create({
            user: user.email,
            type: 'shop',
            image: uploadedImage.secure_url,
            imageId: uploadedImage.public_id
        })

        const shop = await Shop.create({
            user: user.email,
            shopName: req.body.name,
            shopDescription: req.body.desc
        })

        if (!shop || !shopImage) {
            return res.status(400).json({ message: "Can't Create The Shop!", type: "warning" })
        }
        
        const updatedUserDB = User.findOneAndUpdate(
            {email: user.email},
            {$set: {role : "seller"}}
        )
    } catch (error) {
        console.log(error)
    }
}

module.exports = { getShop, createShop };
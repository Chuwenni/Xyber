const cloud = require("../config/cloudConfig")
const Shop = require("../models/shopSchema")
const Image = require("../models/imageSchema");
const User = require("../models/userSchema");
const Product = require("../models/productSchema")
const mongoose = require("mongoose")

const getShop = async (req, res) => {
    try {
        const user = await User.findOne({email: req.user.email})

        if (user.role == "customer") {
            return res.status(403).json({ message: "Seller Only Page! \tCreate a Shop to be a Seller", type: "warning", shopInfo: null })
        }

        const userShop = await Shop.findOne({ owner: user.email }).lean();
        const shopImage = await Image.findOne({ user: user.email, type: "shop" })

        if (!userShop) {
            return res.status(404).json({ message: "No Shop Found in your Account make sure to create one", type: "warning" })
        }

        const shop = { ...userShop, image: shopImage ? shopImage.image : null }

        return res.json({ shopInfo: shop });
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
            owner: user.email,
            shopName: req.body.name,
            shopDescription: req.body.desc
        })

        if (!shop || !shopImage) {
            return res.status(400).json({ message: "Can't Create The Shop!", type: "warning" })
        }

        const updatedUserDB = await User.findOneAndUpdate(
            { email: user.email },
            { $set: { role: "seller" } }
        )

        req.user = updatedUserDB;

        return res.status(201).json({message: "Shop " + req.body.name + " Created!", type: "success"})
    } catch (error) {
        return res.status(500).json({message: error.message, type: "error"})
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, description, category, stocks, price } = req.body
        const user = req.user

        
        const uploadedImage = await cloud.uploader.upload(req.file.path, {
            folder: "products"
        })

        if (!uploadedImage) {
            return res.status(400).json({ message: "Error on Uploading Image", type: "error" })
        }

        const newProduct = await Product.create({
            owner: user.email,
            name: name,
            description: description,
            category: category,
            stocks: stocks,
            price: price,
            image: uploadedImage.secure_url
        })

        if (!newProduct) {
            return res.status(400).json({ message: "Error Creating the Product", type: "error" })
        }
        const userShop = await Shop.findOne({ owner: user.email })

        const allUserProducts = await Product.find({
            owner: user.email
        })
        .sort({ _id: 1 })
        .skip(userShop.products)

        userShop.products += allUserProducts.length;

        await userShop.save();
        
        return res.status(201).json({ message: "Product Created!", type: "success" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message, type: "error" })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().limit(20);

        if (!products) {
            return res.status(400).json({ message: "Cannot Get Products", type: "error" })
        }

        return res.json({ products })
    } catch (error) {

    }
}

const getProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                message: "Invalid product ID",
                type: "error"
            });
        }

        const product = await Product.findById(productId).lean();

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                type: "error"
            });
        }

        return res.status(200).json({ product });
    } catch (error) {
        return res.status(500).json({
            message: "Unable to load product",
            type: "error"
        });
    }
}

const getShopById = async (req, res) => {
    try {
        const { shopId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(shopId)) {
            return res.status(400).json({
                message: "Invalid shop ID",
                type: "error"
            });
        }

        const shop = await Shop.findById(shopId).lean();

        if (!shop) {
            return res.status(404).json({
                message: "Shop not found",
                type: "error"
            });
        }

        const [shopImage, products] = await Promise.all([
            Image.findOne({ user: shop.owner, type: "shop" }).lean(),
            Product.find({ owner: shop.owner }).lean()
        ]);

        return res.status(200).json({
            shop: {
                ...shop,
                image: shopImage?.image || null
            },
            products
        });
    } catch (error) {
        return res.status(500).json({
            message: "Unable to load shop",
            type: "error"
        });
    }
}

const getShopProducts = async (req, res) => {
    const user = req.user

    const shopProducts = await Product.find({owner: user.email})

    if(!shopProducts){
        return res.status(404).json({message: "No Products Found with User: " + user.email, type: "error"})
    }

    return res.status(200).json({shopProducts})
}

const getAllShops = async (req,res) => {
    const allShops = await Shop.find().limit(10).lean()

    if(!allShops){ 
        return res.status(404).json({message: "No Shops found!", type: "error"})
    }

    const shops = await Promise.all(
        allShops.map(async (shop) => {
            const shopsImages = await Image.findOne({ user: shop.owner, type: "shop" });
            return { ...shop, image: shopsImages };
        })
    );
    console.log(shops)
    return res.status(200).json({shops: shops})
}

module.exports = { getShop, createShop, createProduct, getAllProducts, getProduct, getShopById, getShopProducts, getAllShops };
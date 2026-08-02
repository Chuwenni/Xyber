const Shop = require("../models/shopSchema")

const getShop = async (req,res) =>{
    const user = req.user;

    if(user.role == "customer"){
        return res.status(403).json({message: "You Don't Have Permission In this Page!", type: "warning"})
    }

    const userShop = await Shop.findOne({user: user.email})

    if(!userShop){
        return res.status(404).json({message: "No Shop Found in your Account make sure to create one", type: "warning"})
    }

    return res.json({shopInfo: userShop});
}

module.exports = getShop;
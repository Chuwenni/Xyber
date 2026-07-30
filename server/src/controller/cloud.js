const cloud = require("../config/cloudConfig")
const Image = require("../models/imageSchema")

const uploadImage = async (req, res) => {
    try{

        const uploadedImage = await cloud.uploader.upload(req.file.path, {
            folder: "images"
        })

        const imageDB = await Image.create({
            user: req.user.email,
            image: uploadedImage.secure_url,
            imageId: uploadedImage.public_id
        })

        if(!imageDB){
            return res.status(400).json({message: "Failed to Change Images", type: "error"})
        }

        res.status(201).json({message: "Profile Changed successfuly!", type: "success"})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

const getImage = async (req, res) => {
    try{
        console.log(req.user)
        const image = await Image.findOne({user: req.user.email})

        if(!image){
            return res.status(404).json({message: "No Profile Picture Found in your  Account", type: "error"})
        }

        const user = {...req.user, profile: image}

        return res.json({message: " ", type: "success", user: {...user, isLogin: true}})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

module.exports = {uploadImage, getImage}
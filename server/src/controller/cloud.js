const cloud = require("../config/cloudConfig")
const Image = require("../models/imageSchema")
const User = require("../models/userSchema")
const uploadImage = async (req, res) => {
    try{
        const userImage = await Image.findOne({user: req.user.email, type: "profile"})
        const userDB = await User.findOneAndUpdate(
            { username: req.user.username}, 
            { $set: { username: req.body.username}}
        )
        
        if(!userImage){
            const uploadedImage = await cloud.uploader.upload(req.file.path, {
                folder: "images"
            })
            
            const imageDB = await Image.create({
                user: req.user.email,
                type: "profile",
                image: uploadedImage.secure_url,
                imageId: uploadedImage.public_id
            })

            if(!imageDB){
                return res.status(400).json({message: "Failed to Change Images", type: "error"})
            }
    
            return res.status(201).json({message: "Profile Changed successfuly!", type: "success"})
        }

        await cloud.uploader.destroy(userImage.imageId)
        
        const uploadedImage = await cloud.uploader.upload(req.file.path, {
            folder: "images"
        })

        userImage.image = uploadedImage.secure_url
        userImage.imageId = uploadedImage.public_id

        userImage.save()

        return res.status(200).json({message: "Profile Picture Changed!", type: "success"})

    }catch(error){
        console.log(error)
        return res.status(500).json({message: error.message})
    }
}

const getImage = async (req, res) => {
    try{
        const image = await Image.findOne({user: req.user.email, type: "profile"})

        const user = {...req.user, profile: image ? image.image : null}

        return res.json({message: " ", type: "success", user: {...user, isLogin: true}})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

module.exports = {uploadImage, getImage}
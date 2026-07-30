const express = require("express")
const router = express.Router();
const upload = require("../middleware/upload")
const {uploadImage, getImage} = require("../controller/cloud")
const verifyJWT = require("../middleware/accessVerify")

router.post("/imageUpload", upload.single("image"), verifyJWT, uploadImage)
router.get("/getImage", verifyJWT, getImage)
module.exports= router;
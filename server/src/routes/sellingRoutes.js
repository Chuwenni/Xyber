const express = require("express")
const router = express.Router()
const upload = require("../middleware/upload")
const verifyJWT = require("../middleware/accessVerify")
const {getShop, createShop} = require("../controller/SellingController")


router.get("/getMyShop", verifyJWT, getShop)
router.post("/newShop", upload.single("image"), verifyJWT, createShop)

module.exports = router;
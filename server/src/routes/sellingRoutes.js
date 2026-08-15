const express = require("express")
const router = express.Router()
const upload = require("../middleware/upload")
const verifyJWT = require("../middleware/accessVerify")
const { getShop, createShop, createProduct, getAllProducts, getShopProducts, getAllShops } = require("../controller/SellingController")


router.get("/getMyShop", verifyJWT, getShop)
router.post("/newShop", upload.single("image"), verifyJWT, createShop)
router.get("/getProducts", getAllProducts)
router.post("/newProduct", upload.single("image"), verifyJWT, createProduct)
router.get("/getShopProducts", verifyJWT, getShopProducts)
router.get("/getAllShops", verifyJWT, getAllShops)
module.exports = router;
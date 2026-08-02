const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/accessVerify")
const getShop = require("../controller/SellingController")


router.get("/getMyShop", verifyJWT, getshop)
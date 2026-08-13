const express = require('express')
const { Login, Register, Logout} = require('../controller/authentication')
const router = express.Router();

router.post("/login", Login)
router.post("/register", Register)
router.delete("/logout", Logout)
module.exports= router
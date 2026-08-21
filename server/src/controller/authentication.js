const User = require("../models/userSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const genTokens = (payload, remember) => {
    const expire = remember ? "365d" : "10m"
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: expire })
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "1d"})
    return {accessToken, refreshToken}
}

const Login = async (req,res) => {
    try{
        const {email, password, remember} = req.body;
        if(!password || !email){
            return res.json({message: "Please fill out all forms", type: "error"})
        }

        const userDB = await User.findOne({email: email})

        if(!userDB) return res.json({message: "User not Found", type: "error"})

        const payload = {
            email: userDB.email, username: userDB.username, id: userDB._id, role: userDB.role
        }
        
        const isMatch = await bcrypt.compare(password, userDB.password);

        if(!isMatch){
            return res.json({message: "Email or Password is incorrect", type: "warning"})
        }
        const {accessToken, refreshToken} = genTokens(payload, remember);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none' });
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'none' });

        return res.json({message: "Login Successful", type: "success"});

    }catch(error){
        console.error(error)
    }
}

const Register = async (req, res) => {
    try{
        const {username, email, password} = req.body;

        if(!password || !username || !email){
            return res.json({message: "Please fill out all forms", type: "error"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashpwd = await bcrypt.hash(password, salt);
        const user = new User({
            username, 
            email, 
            password:hashpwd
        })
        const newUser = await user.save();

        if(newUser._id.length != 0){
            return res.json({message: "Register Successful!", type: "success"})
        }

        return res.json({message: "Registered UnSuccessful! try again later.", type: "warning"})

    }catch(err){
        if(err.code === 11000){
            const field = Object.keys(err.keyValue)[0];
            const value = err.keyValue[field];
            return res.status(400).json({ 
                message: `${field} '${value}' already exists.`,
                type: "error"
            });

        }
    }
}

const Logout = async (req,res) => {
    res.clearCookie("accessToken",{ httpOnly: true, secure: true, sameSite: 'none' })

    return res.status(200).json({message: "Logout Successful!", type: "success"})
}

module.exports= {
    Login, Register, Logout
}
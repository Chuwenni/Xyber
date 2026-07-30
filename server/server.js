require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const PORT = process.env.PORT;
const cookieparser =require("cookie-parser")
const corsConfig = require("./src/config/corsConfig")
const Connect = require("./src/config/database")
const cloud = require("./src/config/cloudConfig")
Connect();

console.log(cloud.config());

app.use((req,res,next)=>{
    console.log("REQUEST:", req.method, req.url);
    console.log("ORIGIN:", req.headers.origin);
    next();
});

app.use(cors(corsConfig))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());


app.use(require("./src/routes/authentication"))
app.use(require("./src/routes/credentials"))
app.use(require("./src/routes/cloud"))

app.get("/", (req,res) => {
    res.send('working')
})


app.listen(PORT, () => console.log("Server is running on port " + PORT));
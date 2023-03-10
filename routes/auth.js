import router from "express";
import User from "../models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
const router = express.Router();

// Register
router.post("/register",async(req,res)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch (error) {
        console.log(error)
    }
});

// LOGIN
router.post("/login",async(req,res,next)=>{
    try {
        const user = await User.findOne({username:req.body.username});
            !user && res.status(401).res.json("Wrong credentials!");


        const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(OriginalPassword !== req.body.password) return res.status(401).json("Wrong credentials");

        const accessToken = jwt.sign({id:user._id,isAdmin,},process.env.JWT_SEC,{expiresIn:"3d "});

        const {password, ...others} = user._doc;

        return res.status(200).res.json({...others,accessToken})
    } catch (error) {
        res.status(500).json(error)
    }
    next()
})

export default router;
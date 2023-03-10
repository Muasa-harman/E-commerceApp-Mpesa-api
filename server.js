import express from "express";
require("dotenv").config();
import mongoose from "mongoose";
import authRoute from "../routes/auth";
const app = express();
// const userRoute = require("./routes/users");

// middleware
app.use(express.json());
app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);


// connect DB
const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error)
    }
};
mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB disconnected")
});
connect()

app.listen(process.env.PORT,(req,res)=>{
    console.log("express server")
})
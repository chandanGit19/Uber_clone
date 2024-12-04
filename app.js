import express from "express";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors"
import cookieParser from "cookie-parser";
 const app = express();


 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.use(cors());
app.use(cookieParser());

 app.get("/",(req,res)=>{
    res.json({
        success:true,
        message:"working in home routes"
    })
 })

 app.use("/user",userRoutes);












 export default app ;
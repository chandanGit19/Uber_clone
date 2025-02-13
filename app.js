import express from "express";
import userRoutes from "./routes/userRoutes.js";
import captionRoute from "./routes/captionRoutes.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import mapRouter from "./routes/mapRouter.js";
import rideRoute from "./routes/rideRoutes.js";
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
 app.use("/caption",captionRoute)
 app.use("/map",mapRouter);
 app.use("/ride",rideRoute)












 export default app ;
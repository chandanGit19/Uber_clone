import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const authUser =async(req,res,next)=>{
    try {
        const token =req.cookies.token || req.header["authorization"].replace("bearer ","");

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Please log to se rides"
            })
        }

        const decode = await jwt.verify(token,process.env.JWT_SECRET);

        const user = await userModel.findById({_id:decode._id})

        req.user = user;

        next()

    } catch (error) {
        console.log("erorr in middleware")
        
    }
}
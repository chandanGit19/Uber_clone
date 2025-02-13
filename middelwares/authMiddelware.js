import userModel from "../models/userModel.js";
import blackListToken from "../models/blacklistedToken.js";
// import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import captionModel from "../models/captionModel.js";


export const authUser =async(req,res,next)=>{
    try {
        const token =req.cookies.token || req.headers["authorization"]?.replace("bearer ","");

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Please log to se rides"
            })
        }

        const isBlacklisted = await blackListToken.findOne({token});

        if(isBlacklisted){

            return res.status(403).json({
                success:false,
                message:"Invalid user"
            })
        }

        const decode = await jwt.verify(token,process.env.JWT_SECRET);

        const user = await userModel.findById({_id:decode._id});

        if(!user){
            return res.status(302).json({
                success:false,
                message:"user don't exist "
            })
        }

        req.user = user;

        next()

    } catch (error) {
        console.log("erorr in middleware")
        
    }
}

 export const isAuthCaption = async(req,res,next)=>{
    try {
        const token = req.cookies.token || req.header("authorization")?.replace("bearer ","");

        if(!token){
            return res.status(302).json({
                success:false,
                message:"Invalid User"
            })
        }

        const isBlacklisted = await blackListToken.findOne({token});

        // console.log("in the" ,isBlacklisted ,token)

        if(isBlacklisted){
            return res.status(302).json({
                success:false,
                message:"invalid user"
            })
        }

        // console.log("hoe here")

        const decode = await jwt.verify(token,process.env.JWT_SECRET);

        const user = await captionModel.findById({_id:decode._id});

        if(!user){
            return res.status(302).json({
                success:false,
                message:"user don't exist "
            })
        }

        req.user = user

        next()
        
    } catch (error) {
        console.log("erorr in middeleware isAuthCaption")
        console.log(error)
    }
 }
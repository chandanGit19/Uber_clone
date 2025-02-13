import blackListToken from "../models/blacklistedToken.js";
import captionModel from "../models/captionModel.js";
import { validationResult } from "express-validator";


export const captionLogin = async(req,res)=>{

    try{

        const error = validationResult(req);

        if(!error.isEmpty()){
            return res.status(403).json({
                error:error.array()
            })
        }

        const {fullname ,email ,password ,vehicle} =req.body;

        const {color ,plate ,capacity,vehicleType} =vehicle;
        const {firstname ,lastname} = fullname;

        console.log(firstname,lastname,email,password,color,plate,capacity,vehicleType)

    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        return res.status(402).json({
            success:false,
            message:"All fields are require here"
        })
    }

    const isUser = await captionModel.findOne({email});

    if(isUser){
        return res.status(402).json({
            success:false,
            message:"User already exist"
        })
    }

    const hashPassword = await captionModel.hashPassword(password)

    const user = new captionModel({
        fullname:{
            firstname,
            lastname
        },
        email,
        password:hashPassword,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }

    })

    await user.save();

    const token = await user.generateAuthToken();

    res.cookie("token",token).status(200).json({
        success:true,
        user
    })

}catch(error){
    console.log("error in registering caption");
    console.log(error)
}

}


export const loginCaption = async (req,res)=>{
    try {
        const error = validationResult(req);
        if(!error.isEmpty()){
     return res.status(401).json({
        success:false,
        error:error.array()
     })
        }

        const {email , password} = req.body;

        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })
        };

        

        const isUser =await captionModel.findOne({email}).select("+password");

        // console.log(isUser)

        if(!isUser){
            return res.status(301).json({
                success:false,
                message:"Invalid Email or Password"
            })
        }
        
        const isPassword  = await isUser.comparePassword(password);

        // console.log("working 1")

        if(!isPassword){
            return res.status(301).json({
                success:false,
                message:"Invalid Email or Password"
            })
        }

        const token = await isUser.generateAuthToken();

        res.cookie("token",token).status(200).json({
            success:true,
            user:isUser,
            token
        })


    } catch (error) {
        console.log("error in login caption");
        console.log(error)
    }
}

export const getProfile = async(req,res)=>{
    try {
        
        const user = await captionModel.findById(req.user._id)

        if(!user){
            return res.status(302).json({
                success:false,
                message:"user don't found"
            })
        }
        console.log(user);

        res.status(200).json({
            success:true,
            user
        })

    } catch (error) {
        console.log("error in getProfile");
        console.log(error)
    }
}


export const logoutCaption = async(req,res)=>{
    try {
        
        const token = req.cookies.token || req.header("authorization").replace("bearer ","");

        const isBlacklisted = await blackListToken.create({token});

        res.clearCookie("token").status(201).json({
            success:false,
            message:"logout successfull"
        })


    } catch (error) {
        console.log("error in logout caption");
        console.log(error)
    }
}
import blackListToken from "../models/blacklistedToken.js";
import userModel from "../models/userModel.js";
import {  validationResult } from "express-validator";



export const resgisterUser =async(req,res,next)=>{

  try {
    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()
        });
    }


    const {fullname ,email ,password} = req.body;

    const exUser = await userModel.findOne({email});

    if(exUser){
        return res.status(400).json({
            success:false,
            message:"Email Already exist"
        })
    }
    

    const hashPassword = await userModel.hashPassword(password)

    // console.log(hashPassword) ;

    if(!fullname.firstname || !email || !password){
        return res.status(403).json({
            success:false,
            message:"all fields are required"
        })
    }

    

    const {firstname ,lastname} = fullname;

    // console.log(firstname,lastname)

    const user =  new userModel({
        fullname:{
            firstname,
            lastname
        },
        email,
        password:hashPassword,
    })

      await user.save();


    const token =user.generateAuthToken()

    // console.log("details")

    // console.log(user);
    // console.log(token)

   res.cookie("token",token).status(201).json({
    success:true,
    user,
    token
   })
  } catch (error) {
    console.log("error in registering user")
    console.log(error)
    
  }
}


export const loginUser =async(req,res)=>{

    // console.log("here")
 try {
    const error =validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()
        })
    }

    const {email ,password} = req.body;

    // console.log(email,password)

    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"all fields are requires"
        })

    }

    const exUser = await userModel.findOne({email}).select('+password')

    if(!exUser){
        return res.status(400).json({
            success:false,
            message:"invalid User or password"
        })
    }

    const isMatch = await exUser.comparePassword(password);

    if(!isMatch){
        return res.status(400).json({
            success:false,
            message:"invalid User or password"
        })
    }

    const token = await exUser.generateAuthToken();

    res.cookie("token",token).status(200).json({
        success:true,
        exUser,
        token
    })

 } catch (error) {
    console.log("error in login");
    console.log(error)
 }

}

export const getProfile =async(req,res)=>{
    try {
        const user = await userModel.findById(req.user._id);

        if(!user){
            return res.status(403).json({
                success:false,
                message:"Invalid user this is "
            })
        }

        res.status(200).json({
            success:true,
            user
        })

    } catch (error) {
        console.log("error in getProfile")
        console.log(error)
    }
}


export const logout = async(req,res)=>{
    try {
        
        const token = req.cookies.token || req.header("authorization").replace("bearer ","");

         await blackListToken.create({
            token
        })

        res.clearCookie('token').status(200).json({
            success:true,
            message:"logout sucessfull"
        })

    } catch (error) {
        console.log("error in logout ");
        console.log(error)
        
    }
        
}

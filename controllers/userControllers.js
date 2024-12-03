import userModel from "../models/userModel.js";
import { validationResult } from "express-validator";



export const resgisterUser =async(req,res,next)=>{

    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()
        });
    }

    const {fullname ,email ,password} = req.body;

    const hashPassword = await userModel.hashPassword(password)

    if(!firstname || !email || !password){
        return res.status(403).json({
            success:false,
            message:"all fields are required"
        })
    }

    const user =  new userModel({
        fullname:{
            firstname,
            lastname
        },
        email,
        password:hashPassword,
    })

    const newUser =await user.save();

   const token =newUser.generateAuthToken()

   res.status(201).json({
    success:true,
    newUser,
    token
   })



}
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
   fullname:{
    firstname:{
        type:String,
        required:true,
        minlenght:[3,"First name must be grater then 3 charecter long"]
    },
    lastname:{
        type:String,
        // required:true,
        minlenght:[3,"last name must have more character then 3"]
    }
   },

    email:{
    type:String,
    required:true,
    unique:true,
    minlenght:[5,"email must me greater then 5 characters"]
    },

    password:{
    type:String,
    required:true,
    select:false
    },

    socketId:{
    type:String,

    },
})


userSchema.method.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"2d"});
    return token;
}

userSchema.method.comparePassword =async function(password){
return await bcrypt.compare(password,this.password)
}

userSchema.static.hashPassword = async function(password){
    return await bcrypt.hash(password,10)
}

const userModel = mongoose.model("user",userSchema);

export default userModel;
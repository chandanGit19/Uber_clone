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


userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"2d"});
    return token;
}

userSchema.methods.comparePassword =async function(password){
return await bcrypt.compare(password,this.password)
}

// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//       next();
//     }
  
//     this.password = await bcrypt.hash(this.password, 10);
//   });

userSchema.statics.hashPassword = async function(password){
    // console.log('herer')
    return await bcrypt.hash(password,10)
}

const userModel = mongoose.model("User",userSchema);

export default userModel;

import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const captionSchema = await mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"firstname must be greater then 3 characters"]
        },
        lastname:{
            type:String,
            minlength:[3,"firstname must be greater then 3 characters"]
        }
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minlenght:[5,"email must have more then 5 characters"]
    },

    password:{
        type:String,
        required:true,
        select:false
    },

    soketId:{
        type:String,
    },

    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive"
    },

    vehicle:{
        color:{
            type:String,
            required:true,
        },
        plate:{
            type:String,
            required:true,
            minlenght:[5,"plate number must contains atleast 5 words"]
        },
        capacity:{
            type:Number,
            required:true,
            minlenght:[1,"capacity must at least 1"]
        },
        vehicleType:{
            type:String,
            required:true,
            enum:["car","motorcycle","auto"]
        }
    },

    location:{
        lat:{
            type:Number
        },
        lng:{
            type:Number
        }
    }

})

captionSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"24h"})
}

captionSchema.methods.comparePassword = async function(password){
 return await bcrypt.compare(password,this.password)
}

captionSchema.statics.hashPassword = async function(password){

    return await bcrypt.hash(password,10)

}

const captionModel = mongoose.model("Caption",captionSchema);

export default captionModel;
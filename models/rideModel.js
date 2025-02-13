import mongoose from "mongoose";

const rideShema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    caption:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Caption"
    },
    pickUp:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    fare:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["pending","accepted","ongoing","completed","cancelled"],
        default:"pending"
    },
    distance:{
        type:Number,
        required:true
    },
    paymentId:{
        type:String,
    },
    orderId:{
        type:String,
    },
    signature:{
        type:String
    }

})


const rideModel = mongoose.model("Ride",rideShema)

export default rideModel
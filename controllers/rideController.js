import rideModel from "../models/rideModel.js"
import { getFair } from "../services/rideService.js";


export const createRide = async(req,res)=>{
    try {
        const {pickUp ,destination, vehicleType} = req.body;

        const fare = await getFair(pickUp,destination);

        const newRide = new rideModel({
          user:req.user._id,
          pickUp,
          destination,
          fare:fare[vehicleType],
          
        })

    } catch (error) {
        
    }
}
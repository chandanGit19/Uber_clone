import { getAddresshCoordinate, getDisTim } from "../services/mapsService.js";
import { validationResult } from "express-validator";



export const getLocaiton = async(req,res)=>{

    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }

    console.log("here in maps")

    try {
        const {address}  =req.query;

    const cordinates =await getAddresshCoordinate(address,res);

    res.status(200).json(cordinates)
    } catch (error) {
       console.log("getLocation error") ;
    }
}


export const getDistance =async(req,res)=>{
    const error =validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()
        })
    }

    try {
        const {origin,destination} =req.query;

        if(!origin || ! destination){
            return res.status(400).json({
                succees:false,
                message:"please enter all the fields"
            })
        }

        console.log(origin,destination)

        const cordinates =await getAddresshCoordinate(origin,res);
        const cordinates2 =await getAddresshCoordinate(destination,res);

     
        console.log("cordeinates");
        console.log(cordinates);
        console.log("cordinate 3")
        console.log(cordinates2)

        if(!cordinates || !cordinates2){
            return res.status(400).json({
                succees:false,
                message:"Spelling mistake"
            })
        }

        const distanceTime =await getDisTim(cordinates,cordinates2);

        // const data=distanceTime.distanceTime.data[0].properties.segments[0];

        res.status(200).json({
          distanceTime  
        })
    } catch (error) {
        // console.log(error);
        console.log("error in the getting distance")
    }

}
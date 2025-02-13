import { getDisTim } from "./mapsService.js";



export const getFair = async(pickUp,destination)=>{

if(!pickUp || !destination){
    throw new Error("all fields are require");
}

const distanceTime = await  getDisTim(pickUp,destination);




}
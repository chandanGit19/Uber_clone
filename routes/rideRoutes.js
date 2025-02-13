import express from "express"
const rideRoute = express.Router();
import { body } from "express-validator";
import { authUser } from "../middelwares/authMiddelware.js";





rideRoute.post("/create",[
    body("userId").isString().isLength({min:24,max:26}).withMessage("Invalid user Id"),
    body("pickUp").isString().isLength({min:24,max:26}).withMessage("Invalid user Id"),
    body("destination").isString().isLength({min:24,max:26}).withMessage("Invalid user Id"),
],authUser)




export default rideRoute;
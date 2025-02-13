import express from "express";
import { authUser } from "../middelwares/authMiddelware.js";
const mapRouter = express.Router();
import { query } from "express-validator";
import { getDistance, getLocaiton } from "../controllers/mapController.js";


mapRouter.get("/get-Coordinates",[
    query("address").isString().isLength({min:3}).withMessage("please enter more detail address")
], authUser,getLocaiton)

mapRouter.get("/getDisTime",[
    query("origin").isString().isLength({min:2}).withMessage("please provide avalid location"),
    query("destination").isString().isLength({min:2}).withMessage("please enter a valid destination")
],authUser,getDistance)




export default mapRouter;
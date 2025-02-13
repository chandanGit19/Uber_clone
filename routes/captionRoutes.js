import express from "express";
const captionRoute = express.Router();
import {body} from "express-validator"
import { captionLogin, getProfile, loginCaption, logoutCaption,  } from "../controllers/captionController.js";
import { isAuthCaption } from "../middelwares/authMiddelware.js";

captionRoute.post("/register",[
    body("email").isEmail().withMessage("Enter a valid email"),
    body("fullname.firstname").isLength({min:3}).withMessage("Enter valid name atleast 4 character"),
    body("password").isLength({min:6}).withMessage("password must be atleast 6 letter"),
    body("vehicle.color").isLength({min:2}).withMessage("color must be valid"),
    body("vehicle.plate").isLength({min:4}).withMessage("please enter a valid nuber plate"),
    body("vehicle.capacity").isInt({min:1}).withMessage("capacity must be greater then 1"),
    body("vehicle.vehicleType").isIn(["car","motorcycle","auto"]).withMessage("Invalid vehical")
],
captionLogin
)

captionRoute.post("/login",[
    body("email").isEmail().withMessage("Enter a valid Email"),
    body("password").isLength({min:3}).withMessage("Enter a password")
],
loginCaption);

captionRoute.get("/profile",isAuthCaption,getProfile);

captionRoute.get("/logout",isAuthCaption,logoutCaption)














export default captionRoute;
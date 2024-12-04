import express from "express";
const userRoutes = express.Router();
import {body} from "express-validator"
import { getProfile, loginUser, resgisterUser } from "../controllers/userControllers.js";
import { authUser } from "../middelwares/authMiddelware.js";


userRoutes.post("/register",[
    body("email").isEmail().withMessage("Email continer must contain email"),
    body("fullname.firstname").isLength({min:3}).withMessage("first name must have atlest 4 character"),
    body("password").isLength({min:6}).withMessage("password lenght must be grater then 6 character")
],resgisterUser)

userRoutes.post("/login",[
    body("email").isEmail().withMessage("email is required"),
    body("password").isLength({min:3}).withMessage("password is required")
],
loginUser
)

userRoutes.get("/profile",authUser,getProfile)



export default userRoutes;
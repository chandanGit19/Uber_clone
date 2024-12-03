import express from "express";
const userRoutes = express.Router();
import {body} from "express-validator"
import { resgisterUser } from "../controllers/userControllers";


userRoutes.post("/register",[
    body("email").isEmail().withMessage("Email continer must contain email"),
    body("fullname.firstname").isLength({min:3}).withMessage("first name must have atlest 4 character"),
    body("password").isLength({min:6}).withMessage("password lenght must be grater then 6 character")
],resgisterUser)



export default userRoutes;
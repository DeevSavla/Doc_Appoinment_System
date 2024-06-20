import express from "express";
import {loginController, 
        registerController,
        authController,
        changePasswordController,
        applyDoctorController,
    } from "../controllers/user.controller.js";
import { authmiddleware } from "../middleware/authmiddleware.js";

const userRouter = express.Router()

userRouter.post('/login',loginController)
userRouter.post('/register',registerController)
userRouter.post('/getUserData',authmiddleware,authController)
userRouter.post('/changepassword',changePasswordController)
userRouter.post('/apply-doctor',authmiddleware,applyDoctorController)

export {userRouter}
import express from "express";
import { loginController, registerController,authController } from "../controllers/user.controller.js";
import { authmiddleware } from "../middleware/authmiddleware.js";

const userRouter = express.Router()

userRouter.post('/login',loginController)
userRouter.post('/register',registerController)
userRouter.post('/getUserData',authmiddleware,authController)

export {userRouter}
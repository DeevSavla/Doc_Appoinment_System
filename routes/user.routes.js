import express from "express";
import { loginController, registerController } from "../controllers/user.controller";

const userRouter = express.Router()

userRouter.post('/login',loginController)
userRouter.post('/register',registerController)

export {userRouter}
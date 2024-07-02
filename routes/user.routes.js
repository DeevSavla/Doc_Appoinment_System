import express from "express";
import {loginController, 
        registerController,
        authController,
        changePasswordController,
        applyDoctorController,
        getAllNotificationsController,
        deleteAllNotificationsController,
        getDocController,
        bookAppointmentController,
        bookingAvailabilityController,
    } from "../controllers/user.controller.js";
import { authmiddleware } from "../middleware/authmiddleware.js";

const userRouter = express.Router()

userRouter.post('/login',loginController)
userRouter.post('/register',registerController)
userRouter.post('/getUserData',authmiddleware,authController)
userRouter.post('/changepassword',changePasswordController)
userRouter.post('/apply-doctor',authmiddleware,applyDoctorController)
userRouter.post('/get-all-notifications',authmiddleware,getAllNotificationsController)
userRouter.post('/delete-all-notifications',authmiddleware,deleteAllNotificationsController)
userRouter.post('/getdoctor',authmiddleware,getDocController)
userRouter.post('/book-appointment',authmiddleware,bookAppointmentController)
userRouter.post('booking-availability',authmiddleware,bookingAvailabilityController)

export {userRouter}
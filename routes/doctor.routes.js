import express from 'express'
import { authmiddleware } from '../middleware/authmiddleware.js'
import {getDoctorInfoController,
        updateDoctorProfileController,
        getSingleDoctorController
} from '../controllers/doctor.controller.js'

const doctorRouter = express.Router()

doctorRouter.post('/get-doctor-info',authmiddleware,getDoctorInfoController)
doctorRouter.post('/update-doctor-profile',authmiddleware,updateDoctorProfileController)
doctorRouter.post('/get-single-doctor',authmiddleware,getSingleDoctorController)

export {doctorRouter}
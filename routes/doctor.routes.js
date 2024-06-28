import express from 'express'
import { authmiddleware } from '../middleware/authmiddleware.js'
import {getDoctorInfoController,updateDoctorProfileController} from '../controllers/doctor.controller.js'

const doctorRouter = express.Router()

doctorRouter.post('/get-doctor-info',authmiddleware,getDoctorInfoController)
doctorRouter.post('/update-doctor-profile',authmiddleware,updateDoctorProfileController)

export {doctorRouter}
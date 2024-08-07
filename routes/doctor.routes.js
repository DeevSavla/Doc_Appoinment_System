import express from 'express'
import { authmiddleware } from '../middleware/authmiddleware.js'
import {getDoctorInfoController,
        updateDoctorProfileController,
        getSingleDoctorController,
        getAllAppointmentsController,
        handleStatusController
} from '../controllers/doctor.controller.js'

const doctorRouter = express.Router()

doctorRouter.post('/get-doctor-info',authmiddleware,getDoctorInfoController)
doctorRouter.post('/update-doctor-profile',authmiddleware,updateDoctorProfileController)
doctorRouter.post('/get-single-doctor',authmiddleware,getSingleDoctorController)
doctorRouter.post('/get-all-appointments',authmiddleware,getAllAppointmentsController)
doctorRouter.post('/handle-status',authmiddleware,handleStatusController)

export {doctorRouter}
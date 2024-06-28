import express from 'express'
import { authmiddleware } from '../middleware/authmiddleware.js'
import {getDoctorInfoController} from '../controllers/doctor.controller.js'

const doctorRouter = express.Router()

doctorRouter.get('/get-doctor-info',authmiddleware,getDoctorInfoController)

export {doctorRouter}
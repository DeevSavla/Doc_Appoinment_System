import express from 'express'
import {authmiddleware} from '../middleware/authmiddleware.js'
import {
    getAllUsersController,
    getAllDoctorsController,
    changeAccountStatusController,
    getUsersCountController,
    getDoctorsCountController,
    getPendingDoctorsCountController,
    getAppointmentsCountController
} from '../controllers/admin.controller.js'

const adminRouter = express.Router()

adminRouter.get('/get-all-users',authmiddleware,getAllUsersController)
adminRouter.get('/get-all-doctors',authmiddleware,getAllDoctorsController)
adminRouter.post('/change-account-status',authmiddleware,changeAccountStatusController)

// Statistics endpoints
adminRouter.get('/users-count',authmiddleware,getUsersCountController)
adminRouter.get('/doctors-count',authmiddleware,getDoctorsCountController)
adminRouter.get('/pending-doctors-count',authmiddleware,getPendingDoctorsCountController)
adminRouter.get('/appointments-count',authmiddleware,getAppointmentsCountController)

export {adminRouter}
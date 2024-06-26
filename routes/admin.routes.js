import express from 'express'
import {authmiddleware} from '../middleware/authmiddleware.js'
import {getAllUsersController,getAllDoctorsController,changeAccountStatusController} from '../controllers/admin.controller.js'

const adminRouter = express.Router()

adminRouter.get('/get-all-users',authmiddleware,getAllUsersController)
adminRouter.get('/get-all-doctors',authmiddleware,getAllDoctorsController)
adminRouter.post('/changeAccountStatus',authmiddleware,changeAccountStatusController)

export {adminRouter}
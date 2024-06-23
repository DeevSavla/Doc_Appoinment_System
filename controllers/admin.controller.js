import {Doctor} from '../models/doctor.model.js'
import {User} from '../models/user.model.js'
import { ApiError } from '../utility/ApiError.js'
import { ApiResponse } from '../utility/ApiResponse.js'
import { asyncHandler } from '../utility/AsyncHandler.js'

const getAllDoctorsController = asyncHandler(async (req,res)=>{
    const doctors = await Doctor.find({})
    

})

const getAllUsersController = asyncHandler(async (req,res)=>{

})

export {
    getAllUsersController,
    getAllDoctorsController,
}

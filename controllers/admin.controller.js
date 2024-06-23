import {Doctor} from '../models/doctor.model.js'
import {User} from '../models/user.model.js'
import { ApiError } from '../utility/ApiError.js'
import { ApiResponse } from '../utility/ApiResponse.js'
import { asyncHandler } from '../utility/AsyncHandler.js'

const getAllDoctorsController = asyncHandler(async (req,res)=>{
    const doctors = await Doctor.find({})
    
    if(doctors) {
        res.status(201).send(
            new ApiResponse(200,doctors,'All Doctors Fetched.')
        )
    } else {
        throw new ApiError(400,'No Doctors Found.')
    }

})

const getAllUsersController = asyncHandler(async (req,res)=>{
    const users = await User.find({})
    
    if(users) {
        res.status(201).send(
            new ApiResponse(200,users,'All Users Fetched.')
        )
    } else {
        throw new ApiError(400,'No Users Found.')
    }
})

export {
    getAllUsersController,
    getAllDoctorsController,
}

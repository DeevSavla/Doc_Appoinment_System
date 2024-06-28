import { asyncHandler } from '../utility/AsyncHandler.js'
import { ApiError } from '../utility/ApiError.js'
import { ApiResponse } from '../utility/ApiResponse.js'
import { User } from '../models/user.model.js'
import { Doctor } from '../models/doctor.model.js'

const getDoctorInfoController = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findOne({ userId: req.body.userId })

    if (!doctor) {
        throw new ApiError(404, 'Doctor Not Found.')
    }

    res.status(200).send(
        new ApiResponse(200, doctor, 'Doctor Found.')
    )
})

const updateDoctorProfileController = asyncHandler(async (req, res) => {
    const doctor = await Doctor.findOneAndUpdate({ userId: req.body.userId }, req.body)

    if (!doctor) {
        throw new ApiError(404, 'No Doctor Found.')
    }

    res.status(201).send(
        new ApiResponse(201, doctor, 'Doctor Data Update Successfull.')
    )
})

export {
    getDoctorInfoController,
    updateDoctorProfileController,
}
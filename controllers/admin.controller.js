import { Doctor } from '../models/doctor.model.js'
import { User } from '../models/user.model.js'
import { ApiError } from '../utility/ApiError.js'
import { ApiResponse } from '../utility/ApiResponse.js'
import { asyncHandler } from '../utility/AsyncHandler.js'

const getAllDoctorsController = asyncHandler(async (req, res) => {
    const doctors = await Doctor.find({})

    if (doctors) {
        res.status(201).send(
            new ApiResponse(200, doctors, 'All Doctors Fetched.')
        )
    } else {
        throw new ApiError(400, 'No Doctors Found.')
    }

})

const getAllUsersController = asyncHandler(async (req, res) => {
    const users = await User.find({})

    if (users) {
        res.status(201).send(
            new ApiResponse(200, users, 'All Users Fetched.')
        )
    } else {
        throw new ApiError(400, 'No Users Found.')
    }
})

const changeAccountStatusController = asyncHandler(async (req, res) => {
    try {
        const { doctorId, status } = req.body
        if ([doctorId, status].some(field => field.trim() === "")) {
            throw new ApiError(402, 'Data is missing')
        }

        const doctor = await Doctor.findByIdAndUpdate(doctorId, { status })
        const user = await User.findOne({ _id: doctor.userId })
        notifications = user.notifications
        notifications.push({
            type: 'doctor-approve-message',
            message: `Your Doctor Account Request has been ${status}.`,
            onClickPath: '/notification',
        })
        if (doctor.status === 'Approved') {
            user.isDoctor = true
        }
        await user.save()
        res.status(201).send(
            new ApiResponse(201, doctor, 'Account Status Updated')
        )
    } catch (error) {
        throw new ApiError(400, 'Some error occured.')
    }

})

export {
    getAllUsersController,
    getAllDoctorsController,
    changeAccountStatusController,
}

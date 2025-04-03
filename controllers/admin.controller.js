import { Doctor } from '../models/doctor.model.js'
import { User } from '../models/user.model.js'
import { Appointment } from '../models/appointment.model.js'
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
        const notifications = user.notifications
        notifications.push({
            doctorId : doctor._id,
            type: 'doctor-approve-message',
            message: `Your Doctor Account Request has been ${status}.`,
            onClickPath: '/notification',
        })
        user.isDoctor = status === "Approved" ? true:false
        await user.save()
        console.log(user)
        res.status(201).send(
            new ApiResponse(201, doctor, 'Account Status Updated')
        )
    } catch (error) {
        console.log(error)
        throw new ApiError(400, 'Some error occured.')
    }

})

const getUsersCountController = asyncHandler(async (req, res) => {
    const count = await User.countDocuments({});
    res.status(200).send({
        success: true,
        count
    });
});

const getDoctorsCountController = asyncHandler(async (req, res) => {
    const count = await Doctor.countDocuments({});
    res.status(200).send({
        success: true,
        count
    });
});

const getPendingDoctorsCountController = asyncHandler(async (req, res) => {
    const count = await Doctor.countDocuments({ status: 'Pending' });
    res.status(200).send({
        success: true,
        count
    });
});

const getAppointmentsCountController = asyncHandler(async (req, res) => {
    const count = await Appointment.countDocuments({});
    res.status(200).send({
        success: true,
        count
    });
});

export {
    getAllUsersController,
    getAllDoctorsController,
    changeAccountStatusController,
    getUsersCountController,
    getDoctorsCountController,
    getPendingDoctorsCountController,
    getAppointmentsCountController
}

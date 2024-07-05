import { asyncHandler } from '../utility/AsyncHandler.js'
import { ApiError } from '../utility/ApiError.js'
import { ApiResponse } from '../utility/ApiResponse.js'
import { Doctor } from '../models/doctor.model.js'
import {Appointment} from '../models/appointment.model.js'

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

const getSingleDoctorController = asyncHandler(async (req,res)=>{
    const doctor = await Doctor.findOne({_id:req.body.doctorId});

    if(!doctor) {
        throw new ApiError(404,'No such doctor exists')
    }

    res.status(200).send(
        new ApiResponse(200,doctor,'Fetched the Doctor.')
    )
})

const getAllAppointmentsController = asyncHandler(async (req,res)=>{
    
    const doctor = await Doctor.findOne({userId:req.body.doctorId})

    const appointments = await Appointment.find({doctorId:doctor._id})

    if(!appointments){
        throw new ApiError(404,'No Appointments Found.')
    }

    res.status(201).send(
        new ApiResponse(201,appointments,'Fetched all appointments.')
    )
})

export {
    getDoctorInfoController,
    updateDoctorProfileController,
    getSingleDoctorController,
    getAllAppointmentsController
}
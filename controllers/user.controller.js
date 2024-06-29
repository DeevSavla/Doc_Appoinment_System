import { User } from '../models/user.model.js'
import {Doctor} from '../models/doctor.model.js'
import bcrypt from 'bcryptjs'
import { ApiError } from '../utility/ApiError.js'
import { ApiResponse } from '../utility/ApiResponse.js'
import { asyncHandler } from '../utility/AsyncHandler.js'
import jwt from 'jsonwebtoken'

const loginController = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if ([email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, 'All fields are required.')
    }

    const isUser = await User.findOne({ email })

    if (!isUser) {
        throw new ApiError(404, 'No such user exists.')
    }

    const match = await bcrypt.compare(password, isUser.password)

    if (!match) {
        throw new ApiError(403, 'Password Incorrect')
    }

    const loggedInUser = await User.find({ email }).select("-password")

    const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    const sendUser = {
        loggedInUser,
        token,
    }

    return res.status(201).json(
        new ApiResponse(200, sendUser, 'Login Success')
    )
})

const registerController = asyncHandler(async (req, res) => {

    const { username, email } = req.body

    if ([username, email, req.body.password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, 'All fields are required.')
    }

    const existingUser = await User.findOne({ email })
    
    if (existingUser) {
        throw new ApiError(409, 'User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const password = hashedPassword

    const newUser = await User.create({
        username,
        password,
        email,
    })

    const sendUser = await User.findById(newUser._id).select("-password")

    if (!sendUser) {
        throw new ApiError(500, 'Something went wrong while registering user.')
    }

    return res.status(201).json(
        new ApiResponse(200, sendUser, 'User registered successfully.')
    )
})

const authController = asyncHandler(async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId })

        if (!user) {
            throw new ApiError(404, 'User not found.')
        }
        else {
            const authUser = await User.findOne({ _id: req.body.userId }).select("-password")
            res.status(200).send(
                new ApiResponse(200, { data:authUser })
            )
        }
    } catch (error) {
        console.log(error)
        throw new ApiError(403, 'Authorization Error')
    }
})

const changePasswordController = asyncHandler(async (req, res) => {

    const { email, newpassword, confirmpassword } = req.body

    if ([confirmpassword, newpassword, email].some((field) => field?.trim() === '')) {
        throw new ApiError('All fields are required.')
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, 'User Not Found.')
    }
    
    if (confirmpassword !== newpassword) {
        throw new ApiError(402, 'Password do not match.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.newpassword, salt)

    user.password=hashedPassword

    await user.save()

    const addedUser = await User.findOne({email})

    res.status(200).send(
        new ApiResponse(200,addedUser,'Password Changed Successfully.')
    )
})

const applyDoctorController = asyncHandler(async (req,res)=>{
    const newDoctor = await Doctor({...req.body,status:'Pending'})
    await newDoctor.save()
    const admin = await User.findOne({isAdmin:true})
    const notifications = admin.notifications
    notifications.push({
        type:'apply-doctor-request',
        message:`${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor Account.`,
        data :{
            doctorId : newDoctor._id,
            name : newDoctor.firstName + " " + newDoctor.lastName,
            onClickPath : '/admin/doctors'
        }
    })
    await User.findByIdAndUpdate(admin._id,{notifications})

    res.status(200).send(
        new ApiResponse(200,'Doctor Account Applied Successful.')
    )
}
)

const getAllNotificationsController = asyncHandler(async(req,res)=>{

    const admin = await User.findOne({ _id: req.body.userId })

    const {notifications,seennotifications} = admin

    seennotifications.push(...notifications)

    admin.notifications = []

    const updateAdmin = await admin.save()

    updateAdmin.password = undefined

    res.status(200).send(
        new ApiResponse(200,updateAdmin,'All Notifications are read.')
    )
})

const deleteAllNotificationsController = asyncHandler(async(req,res)=>{
    const admin = await User.findOne({ _id: req.body.userId })

    admin.seennotifications=[]

    admin.notifications = []

    const updateAdmin = await admin.save()

    updateAdmin.password = undefined

    res.status(200).send(
        new ApiResponse(200,updateAdmin,'All Notifications are deleted.')
    )
})

const getDocController = asyncHandler(async(req,res)=>{
    const doctor = await Doctor.find({status:'Approved'})

    if(!doctor) {
        throw new ApiError(404,'No Doctor Found.')
    }

    res.status(201).send(
        new ApiResponse(201,doctor,'All Doctors Fetched.')
    )
})

export {
    loginController,
    registerController,
    authController,
    changePasswordController,
    applyDoctorController,
    getAllNotificationsController,
    deleteAllNotificationsController,
    getDocController,
}
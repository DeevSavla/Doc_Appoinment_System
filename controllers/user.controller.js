import { User } from '../models/user.model.js'
import {Doctor} from '../models/doctor.model.js'
import { Appointment } from '../models/appointment.model.js'
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

    const loggedInUser = await User.findById(isUser._id).select("-password")

    const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    const data = {
        username: loggedInUser.username,
        email: loggedInUser.email,
        _id: loggedInUser._id,
        isAdmin: loggedInUser.isAdmin,
        isDoctor: loggedInUser.isDoctor,
        token: token
    }

    return res.status(200).json(
        new ApiResponse(200, data, 'Login Success')
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
    
    const data = {
        username: sendUser.username,
        email: sendUser.email,
        _id: sendUser._id
    }

    return res.status(201).json(
        new ApiResponse(200, data, 'User registered successfully.')
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

// Fetch all notifications
const getAllNotificationsController = asyncHandler(async(req,res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        
        const userData = user.toObject ? user.toObject() : user;
        
        return res.status(200).json(
            new ApiResponse(200, {data: userData}, 'Notifications fetched successfully')
        );
    } catch (error) {
        console.error("Notification fetch error:", error);
        throw new ApiError(500, 'Error fetching notifications');
    }
});

// Mark all notifications as read
const markAllNotificationsReadController = asyncHandler(async(req,res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        
        // Move all notifications to seen
        const { notifications } = user;
        user.seennotifications.push(...notifications);
        user.notifications = [];
        
        await user.save();
        
        const userData = user.toObject ? user.toObject() : user;
        
        return res.status(200).json(
            new ApiResponse(200, {data: userData}, 'All notifications marked as read')
        );
    } catch (error) {
        console.error("Mark as read error:", error);
        throw new ApiError(500, 'Error marking notifications as read');
    }
});

const deleteAllNotificationsController = asyncHandler(async(req,res)=>{
    try {
        const user = await User.findOne({ _id: req.body.userId });
        
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        
        user.seennotifications = [];
        user.notifications = [];
        
        await user.save();
        
        const userData = user.toObject ? user.toObject() : user;
        
        return res.status(200).json(
            new ApiResponse(200, {data: userData}, 'All notifications deleted successfully')
        );
    } catch (error) {
        console.error("Delete notifications error:", error);
        throw new ApiError(500, 'Error deleting notifications');
    }
});

const getDocController = asyncHandler(async(req,res)=>{
    const doctor = await Doctor.find({status:'Approved'})

    if(!doctor) {
        throw new ApiError(404,'No Doctor Found.')
    }

    res.status(201).send(
        new ApiResponse(201,doctor,'All Doctors Fetched.')
    )
})

const bookAppointmentController = asyncHandler(async(req,res)=>{
    req.body.status = 'Pending'
    const newAppointment = new Appointment(req.body)
    await newAppointment.save()

    const user = await User.findOne({_id:req.body.doctorInfo.userId})

    user.notifications.push({
        type:'New-appointment-request',
        message : `An appointment request from ${req.body.userInfo}`,
    })

    await user.save()

    res.status(200).send(
        new ApiResponse(200,'Appointment Book Successfully.')
    )
})

const bookingAvailabilityController = asyncHandler(async (req, res) => {
    
    const { doctorId, date, time } = req.body;
    const doctor = await Doctor.findOne({ _id: doctorId });

    if (!doctor) {
        throw new ApiError(404, 'No Doctor Found.');
    }

    const [startTime, finishTime] = doctor.timings.split("-");

    function isTimeInRange(time, start, finish) {
        return time >= start && time <= finish;
    }

    if (!isTimeInRange(time, startTime, finishTime)) {
        throw new ApiError(400, 'Requested time is outside the available timings.');
    }

    const appointment = await Appointment.findOne({
        doctorId,
        date,
        time
    });

    console.log(appointment);

    if (appointment) {
        throw new ApiError(400, 'Doctor is not available at this time.');
    } else {
        res.status(200).send(new ApiResponse(200, 'Doctor is available at this time.'));
    }
});


export {
    loginController,
    registerController,
    authController,
    changePasswordController,
    applyDoctorController,
    getAllNotificationsController,
    markAllNotificationsReadController,
    deleteAllNotificationsController,
    getDocController,
    bookAppointmentController,
    bookingAvailabilityController,
}
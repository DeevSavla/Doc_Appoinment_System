import { User } from '../models/user.model.js'
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

    const loggedInUser = await User.find({email}).select("-password")

    const token = jwt.sign({id:isUser._id},process.env.JWT_SECRET,{expiresIn:'1d'})

    const sendUser={
        loggedInUser,
        token,
    }

    return res.status(201).json(
        new ApiResponse(200,sendUser,'Login Success')
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


export {
    loginController,
    registerController,
}
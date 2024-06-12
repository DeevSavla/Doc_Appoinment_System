import {ApiError} from '../utility/ApiError.js'
import { asyncHandler } from '../utility/AsyncHandler.js'
import jwt from 'jsonwebtoken'

export const authmiddleware = asyncHandler(async (req,res,next) =>{
    try {
        const token = req.headers['authorization'].split(" ")[1]
    
        jwt.verify(token,process.env.JWT_SECRET,(error,decode)=>{
            if(error)
                {
                    throw new ApiError(402,'Authorisation Failed.')
                }
            else {
                req.body.userId = decode.id
                next()
            }
        })
    } catch (error) {
        console.log(error)
        throw new ApiError(402,'Authorisation Failed.')
    }
})
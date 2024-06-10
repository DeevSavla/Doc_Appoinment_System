import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,'Username is required.'],
        },
        email:{
            type:String,
            required:[true,'Email is required.'],
        },
        password:{
            type:String,
            required:[true,'Password is required.'],
        }
    },
    {
        timestamps:true
    }
)

export const userModel = mongoose.model('users',userSchema)


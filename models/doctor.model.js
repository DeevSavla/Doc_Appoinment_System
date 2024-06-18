import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
        },
        firstName:{
            type:String,
            required:[true,"First Name is required."]
        },
        lastName:{
            type:String,
            required:[true,"Last Name is required."]
        },
        phone:{
            type:String,
            required:[true,"Phone No. is required."]
        },
        email:{
            type:String,
            required:[true,"Email is required."]
        },
        website:{
            type:String,
        },
        address:{
            type:String,
            required:[true,'Address is required.']
        },
        specialization:{
            type:String,
            required:[true,'Specialization is required.']
        },
        experience:{
            type:String,
            required:[true,'Experience is required.']
        },
        fees:{
            type:Number,
            required:[true,'Fee is required.']
        },
        timings:{
            type:Object,
            required:[true,'Timing is required.']
        }
    },
    {
        timestamps:true
    }
)

export const Doctor = mongoose.model('doctors',doctorSchema)
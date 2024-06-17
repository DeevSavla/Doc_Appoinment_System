import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            lowercase:true,
            required:[true,'Username is required.'],
        },
        email:{
            type:String,
            required:[true,'Email is required.'],
        },
        password:{
            type:String,
            required:[true,'Password is required.'],
        },
        isAdmin :{
            type : Boolean,
            default:false,
        },
        isDoctor :{
            type :Boolean,
            default:false,
        },
        notifications:{
            type:Array,
            default:[],
        },
        seennotifications:{
            type:Array,
            default:[],
        }
    },
    {
        timestamps:true
    }
)

export const User = mongoose.model('users',userSchema)


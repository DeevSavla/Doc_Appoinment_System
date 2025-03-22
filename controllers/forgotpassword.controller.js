import { User } from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import nodemailer from 'nodemailer'

config()

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
    },
});

const forgotPasswordController = async (req,res) => {
    const {enail} = req.body 
    try {
        
    } catch (error) {
        
    }
}
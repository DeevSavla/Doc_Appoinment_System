import express from 'express';
import {config} from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './config/database.js';
import { userRouter } from './routes/user.routes.js';
import {adminRouter} from './routes/admin.routes.js'
import { doctorRouter } from './routes/doctor.routes.js';
import { chatbotRouter } from './routes/chatbot.routes.js';

config()

connectDB()

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use(cors({
  origin: ['http://localhost:5173','http://localhost:3000','https://doc-appoinment-system.vercel.app'], 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/user',userRouter)
app.use('/admin',adminRouter)
app.use('/doctor',doctorRouter)
app.use('/chatbot',chatbotRouter)

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`Server running in ${process.env.PORT}`)
})
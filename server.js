import express from 'express';
import {config} from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './config/database.js';
import { userRouter } from './routes/user.routes.js';
import {adminRouter} from './routes/admin.routes.js'

config()

connectDB()

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/v1/user',userRouter)
app.use('/api/v1/admin',adminRouter)

const port = process.env.PORT || 8080

app.listen(port,()=>{
    console.log(`Server running in ${process.env.PORT}`)
})